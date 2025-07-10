import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Header from "@/components/ui/header";
import { useAuth } from "@/contexts/AuthContext";
import FormLogin from "./form-login";

export default function Login() {
	const { isAuthenticated } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/photos");
		}
	}, [isAuthenticated, navigate]);

	return (
		<div className="flex flex-col gap-10 py-9 max-w-[320px] mx-auto px-2">
			<Header title="Sign in to your account" itemsPosition="center" />
			<FormLogin />
			<Link
				to="/register"
				className="text-md text-center text-primary hover:underline"
			>
				Create an account
			</Link>
		</div>
	);
}
