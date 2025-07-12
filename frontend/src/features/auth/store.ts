import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
export interface StoreUser {
	id: string;
	username: string;
	avatar?: string;
	email?: string;
}

interface AuthState {
	user: StoreUser | undefined;
	setUser: (user: StoreUser, token: string) => void;
	logout: () => void;
	update: (data: Partial<StoreUser>) => void;
}

export const useAuth = create<AuthState>()(
	persist(
		(set) => ({
			user: undefined,
			setUser: (user, token) => {
				set({ user });
				localStorage.setItem("bearer", token);
			},
			logout: () => {
				set({ user: undefined });
				localStorage.removeItem("bearer");
				localStorage.removeItem("auth");
			},
			update: (data) => set((state) => ({ user: state.user ? { ...state.user, ...data } : undefined })),
		}),
		{
			name: "auth",
			storage: createJSONStorage(() => localStorage),
		}
	)
);
