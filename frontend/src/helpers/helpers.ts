/**
 * Extracts error messages from api based on response structure
 */
export function extractErrorMessage(error: any): string {
  if (!error) return "An unknown error occurred.";

  // Case 1: DRF validation errors: { errors: { field: [msg1, msg2] } }
  if (error.errors && typeof error.errors === "object") {
    const messages: string[] = [];

    for (const key in error.errors) {
      if (Array.isArray(error.errors[key])) {
        // If it's an array, join messages
        messages.push(...error.errors[key]);
      } else if (typeof error.errors[key] === "object" && error.errors[key].message) {
        // If it's an object with a message, use that
        messages.push(error.errors[key].message);
      } else if (typeof error.errors[key] === "string") {
        messages.push(error.errors[key]);
      }
    }
    console.log("Extracted messages:", messages[0]);

    if (messages.length > 0) return messages[0]; // return first message
  }

  // Case 2: Flat error string: { error: "some error message" }
  if (typeof error.error === "string") {
    return error.error;
  }

  if (typeof error?.detail === "string") {
    return error.detail;
  }

  // Case 3: Nested message: { error: { message: "some message" } }
  if (error.error && typeof error.error === "object" && error.error.message) {
    return error.error.message;
  }

  return "Something went wrong. Please try again.";
}
