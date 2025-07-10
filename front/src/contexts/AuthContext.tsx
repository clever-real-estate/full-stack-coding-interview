import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";

interface AuthContextType {
	isAuthenticated: boolean;
	login: (token: string) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem("accessToken");
		setIsAuthenticated(!!token);
	}, []);

	const login = (token: string) => {
		localStorage.setItem("accessToken", token);
		setIsAuthenticated(true);
	};

	const logout = () => {
		localStorage.removeItem("accessToken");
		setIsAuthenticated(false);
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
