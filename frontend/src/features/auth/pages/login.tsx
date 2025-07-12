import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "@tanstack/react-router";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/features/auth/store";

interface LoginForm {
	username: string;
	password: string;
}

export default function PartnerLogin() {
	const form = useForm<LoginForm>({ defaultValues: { username: "", password: "" } });
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const login = useAuth((s) => s.login);

	async function onSubmit(values: LoginForm) {
		setLoading(true);
		setError(null);
		try {
			const res = await fetch("http://127.0.0.1:5000/users/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(values),
			});
			if (!res.ok) throw new Error("Credenciais inválidas");
			// Supondo que a resposta é { id, name, imageUrl, email }
			const data = await res.json();
			login({ ...data });
			router.navigate({ to: "/app" });
		} catch (e: any) {
			setError(e.message || "Erro ao fazer login");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="flex min-h-screen items-center justify-center bg-muted">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle>Login do Parceiro Lojista</CardTitle>
				</CardHeader>
				<CardContent>
					{error && (
						<Alert variant="destructive" className="mb-4">
							<AlertDescription>{error}</AlertDescription>
						</Alert>
					)}
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							<FormField
								control={form.control}
								name="username"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Username</FormLabel>
										<FormControl>
											<Input placeholder="Enter your username" {...field} required />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input type="password" placeholder="Enter your password" {...field} required />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type="submit" className="w-full" disabled={loading}>
								Entrar
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
