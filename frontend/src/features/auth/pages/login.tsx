import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import logo from "@/logo.svg";
import LoginForm from "../components/login-form";
interface LoginForm {
	username: string;
	password: string;
}

export default function PartnerLogin() {
	return (
		<div>
			<div className="absolute inset-0  opacity-5"></div>

			<div className="w-full max-w-md relative">
				<Card className="shadow-2xl border-0  backdrop-blur-sm">
					<CardHeader className="space-y-1 pb-6 flex flex-col justify-center items-center ">
						<img src={logo} className="size-12" alt="logo" />
						<CardTitle className="text-xl font-semibold text-center">Sign in to your account</CardTitle>
					</CardHeader>

					<CardContent className="space-y-6">
						<LoginForm />

						<div className="text-center pt-4 border-t border-gray-100">
							<Button variant="link" className="text-blue-600 hover:text-blue-800 p-0 h-auto font-medium">
								Forgot password?
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
