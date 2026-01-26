import {db} from "../libs/db.js";

export const getAllSubmissions = async (req, res) => {
    try {
        const userId = req.user.id;
        const submissions = await db.submission.findMany({
            where: {
                userId
            }
        });

        if(!submissions) return res.status(404).json({
            message: "No submissions found",
            success: true
        })
        return res.status(200).json({
            message: "All submissions fetched successfully",
            success: true,
            submissions
        });
    } catch (error) {
        console.error("Error getting all submissions", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

export const getSubmissionsForProblem = async (req, res) => {
    try {
        const {problemId} = req.params;
        const userId = req.user.id;

        const submissions = await db.submission.findMany({
            where: {
                userId,
                problemId
            }
        });
        if(!submissions) return res.status(404).json({
            message: "No submission found",
            success: true
        });
        return res.status(200).json({
            message: "Submissions fetched successfully",
            success: true,
            submissions
        })
    } catch (error) {
        console.error("Error getting submissions for required problem", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

export const getSubmissionsCountForProblem = async (req, res) => {
    try {
        const problemId = req.params.problemId;
        const submissionsCount = await db.submission.count({
            where: {
                problemId
            }
        });
        return res.status(200).json({
            message: "Submissions count fetched successfully",
            success: true,
            count: submissionsCount
        });
    } catch (error) {
        console.error("Error fetching the submissions count for the problem", error);
        return res.status(500).json({
            message: "Internal sever error",
            succss: false
        });
    }
}