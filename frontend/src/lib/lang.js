export const getJudge0LanguageId = (language) => {
    const languageMap = {
        "JAVA": 62,
        "JAVASCRIPT": 63,
        "PYTHON": 71,
        "C": 50
    }
    return languageMap[language.toUpperCase()];
}

export const getLanguageName = (id) => {
    const languageMap = {
        62: "JAVA",
        63: "JAVASCRIPT",
        71: "PYTHON",
        50: "C",
        74: "TYPESCRIPT"
    }
    return languageMap[id] || "Unknown";
}