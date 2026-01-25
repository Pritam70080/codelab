import { db } from "../libs/db.js";
import { getJudge0LanguageId, pollBatchResults, submitBatch } from "../libs/judge0.js";


export const createProblem = async (req, res) => {
    try {
        const { title, description, tags, difficulty, examples, constraints, hint, editorial, testCases, codeSnippets, referenceSolutions } = req.body;
        if (!title || !description || !tags || !difficulty || !examples || !constraints || !testCases || !codeSnippets || !referenceSolutions) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            })
        }
        if (req.user.role !== "ADMIN") {
            return res.status(401).json({
                message: "You are not allowed to create a problem",
                success: false
            })
        }
        for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
            const languageId = getJudge0LanguageId(language);
            if (!languageId) {
                return res.status(400).json({
                    message: `Language: ${language} is not supported`,
                    success: false
                })
            }
            const submissions = testCases.map(({ input, output }) => ({
                source_code: solutionCode,
                language_id: languageId,
                stdin: input,
                expected_output: output
            }));
            const submissionResults = await submitBatch(submissions);
            const tokens = submissionResults.map((res) => res.token);
            const results = await pollBatchResults(tokens);
            for (let i = 0; i < results.length; i++) {
                const result = results[i];
                console.log("Result ----- ", result);
                console.log(`Testcase ${i + 1} and language ${language} ----- result ${JSON.stringify(result.status.description)}`);
                if (result.status.id !== 3) {
                    return res.status(400).json({
                        message: `Testcase ${i + 1} failed for language ${language}`,
                        success: false
                    })
                }
            }
        }
        const newProblem = await db.Problem.create({
            data: {
                title,
                description,
                tags,
                difficulty,
                examples,
                constraints,
                hint,
                editorial,
                testCases,
                codeSnippets,
                referenceSolutions,
                userId: req.user.id
            }
        });
        if (!newProblem) {
            return res.status(400).json({
                message: "Couldn't create the problem",
                success: false
            })
        }
        return res.status(201).json({
            message: "Problem created successfully",
            success: true,
            problem: newProblem
        });
    } catch (error) {
        console.error("Error in creating problem:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

export const getAllProblems = async (req, res) => {
    try {
        const allProblems = await db.Problem.findMany();
        if (!allProblems) {
            return res.status(404).json({
                message: "No problem found",
                success: false
            })
        }
        return res.status(200).json({
            message: "Problems fetched successfully",
            success: true,
            problems: allProblems
        })
    } catch (error) {
        console.error("Error fetching problems", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

export const getProblemById = async (req, res) => {
    try {
        const { id } = req.params;
        const problem = await db.Problem.findUnique({
            where: {
                id
            }
        });
        if (!problem) {
            return res.status(404).json({
                message: "No problem found",
                success: false
            })
        }
        return res.status(200).json({
            message: "Required Problem fetched successfully",
            success: true,
            problem
        })
    } catch (error) {
        console.error("Error fetching problem", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

export const deleteProblem = async (req, res) => {
    try {
        const { id } = req.params;
        const problem = await db.Problem.delete({
            where: {
                id
            }
        })
        if (!problem) {
            return res.status(400).json({
                message: "Problem not found",
                success: false
            })
        }
        return res.status(200).json({
            message: "Problem deleted successfully",
            success: true
        })
    } catch (error) {
        console.error("Error deleting problem", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

export const updateProblem = async (req, res) => {
    try {
        const { title, description, tags, difficulty, examples, constraints, hint, editorial, testCases, codeSnippets, referenceSolutions } = req.body;
        const { id } = req.params;
        const problem = await db.Problem.findUnique({
            where: { id }
        });
        if (!problem) {
            return res.status(404).json({
                success: false,
                message: "Problem not found."
            });
        }
        if (!title || !description || !tags || !difficulty || !examples || !constraints || !testCases || !codeSnippets || !referenceSolutions) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            })
        }
        if (req.user.role !== "ADMIN") {
            return res.status(401).json({
                message: "You are not allowed to update a problem",
                success: false
            })
        }
        for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
            const languageId = getJudge0LanguageId(language);
            if (!languageId) {
                return res.status(400).json({
                    message: `Language: ${language} is not supported`,
                    success: false
                })
            }
            const submissions = testCases.map(({ input, output }) => ({
                source_code: solutionCode,
                language_id: languageId,
                stdin: input,
                expected_output: output
            }));
            const submissionResults = await submitBatch(submissions);
            const tokens = submissionResults.map((res) => res.token);
            const results = await pollBatchResults(tokens);
            for (let i = 0; i < results.length; i++) {
                const result = results[i];
                console.log("Result ----- ", result);
                console.log(`Testcase ${i + 1} and language ${language} ----- result ${JSON.stringify(result.status.description)}`);
                if (result.status.id !== 3) {
                    return res.status(400).json({
                        message: `Testcase ${i + 1} failed for language ${language}`,
                        success: false
                    })
                }
            }
        }
        const updatedProblem = await db.Problem.update({
            where: {
                id
            },
            data: {
                title,
                description,
                tags,
                difficulty,
                examples,
                constraints,
                hint,
                editorial,
                testCases,
                codeSnippets,
                referenceSolutions,
                userId: req.user.id
            }
        });
        if (!updatedProblem) {
            return res.status(400).json({
                message: "Couldn't update the problem",
                success: false
            })
        }
        return res.status(201).json({
            message: "Problem updated successfully",
            success: true,
            problem: updatedProblem
        });
    } catch (error) {
        console.error("Error in updating problem:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

// export const getAllProblemsSolvedByUser = async (req, res) => {

// }