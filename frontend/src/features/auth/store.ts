import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { redirect } from "@tanstack/react-router";
export interface StoreUser {
	id: string;
	username: string;
	avatar?: string;
	email?: string;
}

interface AuthState {
	user: StoreUser | undefined;
	login: (user: { user: StoreUser; token: string }) => void;
	logout: () => void;
	update: (data: Partial<StoreUser>) => void;
}

export const useAuth = create<AuthState>()(
	persist(
		(set, get) => ({
			user: undefined,
			login: (user) => {
				set({ user: { ...user.user } });
				localStorage.setItem("bearer", user.token!);
			},
			logout: () => {
				set({ user: undefined });
				redirect({ to: "/auth/login" });
			},
			update: (data) => set((state) => ({ user: state.user ? { ...state.user, ...data } : undefined })),
		}),
		{
			name: "auth", // name of the item in the storage (must be unique)
			storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
		}
	)
);
