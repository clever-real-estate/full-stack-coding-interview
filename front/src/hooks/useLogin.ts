import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AxiosError } from "axios";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/contexts/AuthContext";
import { http } from "@/lib/http";
import type { LoginSchema } from "@/schemas/auth";

export function useLogin() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { login } = useAuth();

	const { mutate, isPending, error } = useMutation({
		mutationFn: (data: LoginSchema) => http.post("/auth/login", data),
		onSuccess: (response) => {
			const token = response.data.access_token;
			if (token) {
				login(token);
			}
			queryClient.invalidateQueries({ queryKey: ["photos"] });
			navigate("/photos");
		},
	});

	const errorMessage = useMemo(() => {
		if (!error) return null;

		if (error instanceof AxiosError) {
			if (error.status === 401 || error.status === 422) {
				return "Invalid credentials";
			}
		}
		return "Error logging in";
	}, [error]);

	return {
		mutate,
		isPending,
		loginError: errorMessage,
	};
}
