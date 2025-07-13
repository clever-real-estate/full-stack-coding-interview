import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuthFacade, type LoginForm } from "../use-login-facade";

export default function LoginForm() {
	const { error, loading, onSubmit } = useAuthFacade();
	const form = useForm<LoginForm>({ defaultValues: { username: "", password: "" } });

	return (
		<>
			{error && (
				<Alert variant="destructive" className="border-red-200 bg-red-50">
					<AlertDescription className="text-red-800">{error?.message || "Failed login"}</AlertDescription>
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
						Sign in
					</Button>
				</form>
			</Form>
		</>
	);
}
