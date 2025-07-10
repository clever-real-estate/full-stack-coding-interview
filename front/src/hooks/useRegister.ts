import { useMutation } from "@tanstack/react-query";

import { AxiosError } from "axios";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { http } from "@/lib/http";
import type { RegisterSchema } from "@/schemas/register";

export function useRegister() {
	const navigate = useNavigate();

	const { mutate, isPending, error } = useMutation({
		mutationFn: (data: RegisterSchema) => http.post("/auth/register", data),
		onSuccess: () => navigate("/login"),
	});

	const errorMessage = useMemo(() => {
		if (!error) return null;

		if (error instanceof AxiosError) {
			if (error.status === 400) {
				return error.response?.data.detail;
			}
		}
		return "Error registering";
	}, [error]);

	return {
		mutate,
		isPending,
		registerError: errorMessage,
	};
}
