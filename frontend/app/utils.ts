export function formatError(error: any) {
    let errorMessage = "Un expected error occurred. Please try again later.";
    if (error && typeof error === "object") {
        errorMessage = "Error:";
        for (const key in error) {
            if (error.hasOwnProperty(key)) {
                errorMessage += `\n${key}: ${error[key].join(", ")}`;
            }
        }
    }
    return errorMessage
}