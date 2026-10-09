import { db } from "../libs/db.js";

const sheetSummarySelect = {
    id: true,
    title: true,
    description: true,
    slug: true,
    isPaid: true,
    price: true,
    currency: true,
    isPublished: true,
    createdAt: true,
    updatedAt: true,
    createdById: true,
    _count: {
        select: {
            problems: true
        }
    }
};

const toSlug = (value) => value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const isValidSlug = (slug) => typeof slug === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);

const isPaidSheetAccessible = async (sheet, userId) => {
    if (!sheet.isPaid) return true;
    const purchase = await db.sheetPurchase.findUnique({
        where: {
            userId_sheetId: {
                userId,
                sheetId: sheet.id
            }
        },
        select: { status: true }
    });
    return purchase?.status === "COMPLETED";
};

const getSheetOrRespond = async (sheetId, req, res, { requirePublished = false, allowLocked = false } = {}) => {
    const sheet = await db.sheet.findUnique({
        where: { id: sheetId },
        include: {
            _count: {
                select: { problems: true }
            }
        }
    });

    if (!sheet || (requirePublished && !sheet.isPublished && req.user.role !== "ADMIN")) {
        res.status(404).json({ message: "Sheet not found", success: false });
        return null;
    }

    const hasAccess = req.user.role === "ADMIN" || await isPaidSheetAccessible(sheet, req.user.id);
    if (!hasAccess && !allowLocked) {
        res.status(403).json({
            message: "Purchase this sheet to access its problems",
            success: false,
            requiresPurchase: true
        });
        return null;
    }

    if (!hasAccess) return { ...sheet, hasAccess, problems: [] };

    const problems = await db.sheetProblem.findMany({
        where: { sheetId },
        orderBy: { order: "asc" },
        include: {
            problem: {
                select: {
                    id: true,
                    title: true,
                    description: true,
                    difficulty: true,
                    tags: true,
                    examples: true,
                    constraints: true,
                    hint: true,
                    editorial: true,
                    codeSnippets: true
                }
            }
        }
    });
    return { ...sheet, hasAccess, problems };
};

const sendPrismaError = (res, error, message) => {
    console.error(message, error);
    if (error.code === "P2002") {
        return res.status(409).json({
            message: "A sheet with that slug already exists",
            success: false
        });
    }
    return res.status(500).json({ message: "Internal server error", success: false });
};

export const createSheet = async (req, res) => {
    try {
        const { title, description = null, slug: requestedSlug, isPaid = false, price = null, currency = "INR", isPublished = false } = req.body;
        if (typeof title !== "string" || !title.trim()) {
            return res.status(400).json({ message: "A sheet title is required", success: false });
        }
        if (typeof isPaid !== "boolean" || typeof isPublished !== "boolean") {
            return res.status(400).json({ message: "isPaid and isPublished must be boolean values", success: false });
        }
        if (description !== null && typeof description !== "string") {
            return res.status(400).json({ message: "Description must be a string", success: false });
        }
        if (isPaid && (!Number.isInteger(price) || price <= 0)) {
            return res.status(400).json({ message: "Paid sheets require a positive integer price", success: false });
        }
        if (typeof currency !== "string" || !/^[A-Za-z]{3}$/.test(currency)) {
            return res.status(400).json({ message: "Currency must be a 3-letter currency code", success: false });
        }

        const slug = requestedSlug === undefined ? toSlug(title) : requestedSlug;
        if (!isValidSlug(slug)) {
            return res.status(400).json({
                message: "Slug must contain lowercase letters, numbers, and single hyphens",
                success: false
            });
        }
        if (!slug) {
            return res.status(400).json({ message: "A valid title or slug is required", success: false });
        }

        const sheet = await db.sheet.create({
            data: {
                title: title.trim(),
                description: description?.trim() || null,
                slug,
                isPaid,
                price: isPaid ? price : null,
                currency: currency.toUpperCase(),
                isPublished,
                createdById: req.user.id
            },
            select: sheetSummarySelect
        });
        return res.status(201).json({ message: "Sheet created successfully", success: true, sheet });
    } catch (error) {
        return sendPrismaError(res, error, "Error creating sheet");
    }
};

export const getAllSheets = async (req, res) => {
    try {
        const where = req.user.role === "ADMIN"
            ? (req.query.mine === "true" ? { createdById: req.user.id } : {})
            : { isPublished: true };
        const sheets = await db.sheet.findMany({
            where,
            orderBy: { createdAt: "desc" },
            select: {
                ...sheetSummarySelect,
                purchases: {
                    where: {
                        userId: req.user.id,
                        status: "COMPLETED"
                    },
                    select: { id: true },
                    take: 1
                },
                problems: {
                    select: {
                        problemId: true,
                        problem: {
                            select: {
                                solvedBy: {
                                    where: { userId: req.user.id },
                                    select: { id: true },
                                    take: 1
                                }
                            }
                        }
                    }
                }
            }
        });

        const result = sheets.map((sheet) => {
            const { problems, purchases, ...sheetDetails } = sheet;
            const completedCount = problems.filter(({ problem }) => problem.solvedBy.length > 0).length;
            const problemCount = problems.length;
            return {
                ...sheetDetails,
                hasAccess: !sheet.isPaid || req.user.role === "ADMIN" || purchases.length > 0,
                progress: {
                    solved: completedCount,
                    total: problemCount,
                    percentage: problemCount ? Math.round((completedCount / problemCount) * 100) : 0
                }
            };
        });

        return res.status(200).json({ message: "Sheets fetched successfully", success: true, sheets: result });
    } catch (error) {
        console.error("Error fetching sheets", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const getSheetById = async (req, res) => {
    try {
        const sheet = await getSheetOrRespond(req.params.sheetId, req, res, {
            requirePublished: true,
            allowLocked: true
        });
        if (!sheet) return;
        return res.status(200).json({
            message: "Sheet fetched successfully",
            success: true,
            sheet: {
                ...sheet,
                problems: sheet.hasAccess ? sheet.problems : []
            }
        });
    } catch (error) {
        console.error("Error fetching sheet", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const updateSheet = async (req, res) => {
    try {
        const { sheetId } = req.params;
        const existingSheet = await db.sheet.findUnique({ where: { id: sheetId } });
        if (!existingSheet) {
            return res.status(404).json({ message: "Sheet not found", success: false });
        }

        const { title, description, slug, isPaid, price, currency, isPublished } = req.body;
        const data = {};

        if (title !== undefined) {
            if (typeof title !== "string" || !title.trim()) {
                return res.status(400).json({ message: "Title must be a non-empty string", success: false });
            }
            data.title = title.trim();
        }
        if (description !== undefined) {
            if (description !== null && typeof description !== "string") {
                return res.status(400).json({ message: "Description must be a string or null", success: false });
            }
            data.description = description?.trim() || null;
        }
        if (slug !== undefined) {
            if (!isValidSlug(slug)) {
                return res.status(400).json({ message: "Slug must contain lowercase letters, numbers, and single hyphens", success: false });
            }
            data.slug = slug;
        }
        if (isPaid !== undefined) {
            if (typeof isPaid !== "boolean") {
                return res.status(400).json({ message: "isPaid must be a boolean value", success: false });
            }
            data.isPaid = isPaid;
            if (!isPaid) data.price = null;
        }
        if (price !== undefined) {
            if (price !== null && (!Number.isInteger(price) || price <= 0)) {
                return res.status(400).json({ message: "Price must be a positive integer", success: false });
            }
            data.price = price;
        }
        if (currency !== undefined) {
            if (typeof currency !== "string" || !/^[A-Za-z]{3}$/.test(currency)) {
                return res.status(400).json({ message: "Currency must be a 3-letter currency code", success: false });
            }
            data.currency = currency.toUpperCase();
        }
        if (isPublished !== undefined) {
            if (typeof isPublished !== "boolean") {
                return res.status(400).json({ message: "isPublished must be a boolean value", success: false });
            }
            data.isPublished = isPublished;
        }
        if (Object.keys(data).length === 0) {
            return res.status(400).json({ message: "At least one sheet field must be provided", success: false });
        }
        if ((data.isPaid ?? existingSheet.isPaid) === false) data.price = null;

        const resultingIsPaid = data.isPaid ?? existingSheet.isPaid;
        const resultingPrice = data.price !== undefined ? data.price : existingSheet.price;
        if (resultingIsPaid && (!Number.isInteger(resultingPrice) || resultingPrice <= 0)) {
            return res.status(400).json({ message: "Paid sheets require a positive integer price", success: false });
        }

        const sheet = await db.sheet.update({
            where: { id: sheetId },
            data,
            select: sheetSummarySelect
        });
        return res.status(200).json({ message: "Sheet updated successfully", success: true, sheet });
    } catch (error) {
        return sendPrismaError(res, error, "Error updating sheet");
    }
};

export const addProblemsToSheet = async (req, res) => {
    try {
        const { sheetId } = req.params;
        const { problemIds } = req.body;
        if (!Array.isArray(problemIds) || problemIds.length === 0 ||
            problemIds.some((id) => typeof id !== "string" || !id.trim()) ||
            new Set(problemIds).size !== problemIds.length) {
            return res.status(400).json({ message: "Provide a non-empty list of unique problem IDs", success: false });
        }

        const sheet = await db.sheet.findUnique({ where: { id: sheetId }, select: { id: true } });
        if (!sheet) return res.status(404).json({ message: "Sheet not found", success: false });

        const foundProblems = await db.problem.findMany({
            where: { id: { in: problemIds } },
            select: { id: true }
        });
        if (foundProblems.length !== problemIds.length) {
            return res.status(404).json({ message: "One or more problems were not found", success: false });
        }

        const result = await db.$transaction(async (tx) => {
            const existingEntries = await tx.sheetProblem.findMany({
                where: { sheetId },
                select: { problemId: true, order: true }
            });
            const existingIds = new Set(existingEntries.map(({ problemId }) => problemId));
            const newProblemIds = problemIds.filter((problemId) => !existingIds.has(problemId));
            const nextOrder = existingEntries.reduce((max, entry) => Math.max(max, entry.order), 0) + 1;

            if (newProblemIds.length) {
                await tx.sheetProblem.createMany({
                    data: newProblemIds.map((problemId, index) => ({
                        sheetId,
                        problemId,
                        order: nextOrder + index
                    }))
                });
            }
            return { count: newProblemIds.length };
        });

        return res.status(201).json({
            message: "Problems added to sheet successfully",
            success: true,
            addedCount: result.count
        });
    } catch (error) {
        console.error("Error adding problems to sheet", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const reorderSheetProblems = async (req, res) => {
    try {
        const { sheetId } = req.params;
        const { problemIds } = req.body;
        if (!Array.isArray(problemIds) || problemIds.some((id) => typeof id !== "string") ||
            new Set(problemIds).size !== problemIds.length) {
            return res.status(400).json({ message: "Provide a unique ordered list of problem IDs", success: false });
        }

        const sheet = await db.sheet.findUnique({
            where: { id: sheetId },
            select: { id: true }
        });
        if (!sheet) return res.status(404).json({ message: "Sheet not found", success: false });

        const existingEntries = await db.sheetProblem.findMany({
            where: { sheetId },
            select: { problemId: true }
        });
        const existingIds = new Set(existingEntries.map(({ problemId }) => problemId));
        if (problemIds.length !== existingIds.size || problemIds.some((id) => !existingIds.has(id))) {
            return res.status(400).json({ message: "The order must include every sheet problem exactly once", success: false });
        }

        await db.$transaction(
            problemIds.map((problemId, index) => db.sheetProblem.update({
                where: { sheetId_problemId: { sheetId, problemId } },
                data: { order: index + 1 }
            }))
        );
        return res.status(200).json({ message: "Sheet problem order updated successfully", success: true });
    } catch (error) {
        console.error("Error reordering sheet problems", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const getSheetProgress = async (req, res) => {
    try {
        const sheet = await db.sheet.findUnique({
            where: { id: req.params.sheetId },
            include: {
                problems: {
                    orderBy: { order: "asc" },
                    include: {
                        problem: {
                            select: {
                                id: true,
                                title: true,
                                difficulty: true,
                                solvedBy: {
                                    where: { userId: req.user.id },
                                    select: { id: true },
                                    take: 1
                                }
                            }
                        }
                    }
                }
            }
        });
        if (!sheet || (!sheet.isPublished && req.user.role !== "ADMIN")) {
            return res.status(404).json({ message: "Sheet not found", success: false });
        }
        if (req.user.role !== "ADMIN" && !(await isPaidSheetAccessible(sheet, req.user.id))) {
            return res.status(403).json({
                message: "Purchase this sheet to access its progress",
                success: false,
                requiresPurchase: true
            });
        }

        const problems = sheet.problems.map(({ order, problem }) => ({
            id: problem.id,
            title: problem.title,
            difficulty: problem.difficulty,
            order,
            solved: problem.solvedBy.length > 0
        }));
        const solved = problems.filter(({ solved: isSolved }) => isSolved).length;
        const total = problems.length;

        return res.status(200).json({
            message: "Sheet progress fetched successfully",
            success: true,
            progress: {
                sheetId: sheet.id,
                solved,
                total,
                percentage: total ? Math.round((solved / total) * 100) : 0,
                problems
            }
        });
    } catch (error) {
        console.error("Error fetching sheet progress", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const getSheetProblem = async (req, res) => {
    try {
        const sheet = await getSheetOrRespond(req.params.sheetId, req, res, { requirePublished: true });
        if (!sheet) return;
        const sheetProblem = sheet.problems.find(({ problemId }) => problemId === req.params.problemId);
        if (!sheetProblem) {
            return res.status(404).json({ message: "Problem not found in this sheet", success: false });
        }
        return res.status(200).json({
            message: "Sheet problem fetched successfully",
            success: true,
            problem: sheetProblem.problem,
            order: sheetProblem.order
        });
    } catch (error) {
        console.error("Error fetching sheet problem", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};