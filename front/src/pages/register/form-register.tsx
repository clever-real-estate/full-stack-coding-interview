import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useRegister } from "@/hooks/useRegister";
import { type RegisterSchema, registerSchema } from "@/schemas/register";
import LabeledInput from "../../components/ui/labeled-input";

export default function FormRegister() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterSchema>({ resolver: zodResolver(registerSchema) });

	const { mutate, isPending, registerError } = useRegister();

	const onSubmit: SubmitHandler<RegisterSchema> = (data) => mutate(data);

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
			<LabeledInput
				id="username"
				label="Username"
				placeholder="testing"
				type="text"
				error={errors.username?.message}
				{...register("username")}
			/>
			<LabeledInput
				id="password"
				label="Password"
				placeholder="********"
				type="password"
				error={errors.password?.message}
				{...register("password")}
			/>

			<div className="grid gap-3">
				<Button variant="default" type="submit" size="lg" disabled={isPending}>
					Create account
				</Button>
				{registerError && (
					<span className="text-xs text-red-500">{registerError}</span>
				)}
			</div>
		</form>
	);
}
