export const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
        case "easy":
            return "success";
        case "medium":
            return "warning";
        case "hard":
            return "error";
        default:
            return "default";
    }
};

export const getStatusColor = (status: string) => {
    switch (status) {
        case "Passed":
            return "success";
        case "Failed":
            return "error";
    }
};
