import { apiFetch } from "@/services/api";

export interface LoginResponse {
	user: {
		id: string;
		username: string;
		avatar?: string;
		email?: string;
	};
	token: string;
}

export const login = async (username: string, password: string): Promise<LoginResponse> => {
	return apiFetch("/users/login", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ username, password }),
	});
};
