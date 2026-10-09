import { db } from "./db.js";

export const canAccessProblem = async (problemId, user) => {
    if (user.role === "ADMIN") return true;

    const memberships = await db.sheetProblem.findMany({
        where: {
            problemId,
            sheet: {
                OR: [
                    { isPaid: true },
                    { isPublished: true, isPaid: false }
                ]
            }
        },
        select: {
            sheet: {
                select: {
                    isPaid: true,
                    purchases: {
                        where: {
                            userId: user.id,
                            status: "COMPLETED"
                        },
                        select: { id: true },
                        take: 1
                    }
                }
            }
        }
    });

    return memberships.length === 0 ||
        memberships.some(({ sheet }) => !sheet.isPaid || sheet.purchases.length > 0);
};
