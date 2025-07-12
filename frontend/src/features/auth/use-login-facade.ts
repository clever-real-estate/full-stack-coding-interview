import { useEffect } from "react";
import { useAuth } from "./store";
import { useLoginMutation } from "./use-login-mutation";
import { useRouter } from "@tanstack/react-router";
export interface LoginForm {
	username: string;
	password: string;
}
export const useAuthFacade = () => {
	const mutation = useLoginMutation();
	const setUser = useAuth((s) => s.setUser);
	const user = useAuth((s) => s.user);
	const router = useRouter();

	useEffect(() => {
		if (!user) return;
		router.navigate({ to: "/app" });
	}, [user]);

	const onSubmitLogin = async (data: LoginForm) => {
		await mutation.mutateAsync(data, {
			onSuccess(data) {
				setUser(data.user, data.token);
			},
		});
	};

	return {
		error: mutation.error,
		loading: mutation.isPending,
		onSubmit: onSubmitLogin,
	};
};
