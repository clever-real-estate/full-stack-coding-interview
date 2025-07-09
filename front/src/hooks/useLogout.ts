import { useQueryClient } from "@tanstack/react-query";

import { useAuth } from "@/contexts/AuthContext";

export function useLogout() {
	const queryClient = useQueryClient();
	const { logout: authLogout } = useAuth();

	const logout = () => {
		authLogout();
		queryClient.clear();
	};

	return { logout };
}
