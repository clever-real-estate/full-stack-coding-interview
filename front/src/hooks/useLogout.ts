import { useQueryClient } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";

import { useAuth } from "@/contexts/AuthContext";

export function useLogout() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { logout: authLogout } = useAuth();

	const logout = () => {
		authLogout();
		queryClient.clear();
		navigate("/");
	};

	return { logout };
}
