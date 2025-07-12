import { useMutation } from "@tanstack/react-query";
import { login } from "./api";
import type { LoginForm } from "./use-login-facade";

export function useLoginMutation() {
	return useMutation({
		mutationFn: ({ username, password }: LoginForm) => login(username, password),
	});
}
