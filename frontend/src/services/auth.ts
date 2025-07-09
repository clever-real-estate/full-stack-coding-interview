import api from "./api";

/**
 * Method used to refresh authentication tokens.
 */
export const refreshTokens = async () => {
  return api.post<{ refreshed: boolean }>("/auth/refresh/");
};
