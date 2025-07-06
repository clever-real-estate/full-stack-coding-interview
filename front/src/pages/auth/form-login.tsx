import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import FormLoginInput from "./form-login-input";

// import { useCreateLink } from "@/hooks/useCreateLinks";
// import { type LinkInput, LinkInputSchema } from "@/schemas/link-schema";

export default function FormLogin() {
    // const {
    // 	register,
    // 	handleSubmit,
    // 	formState: { errors },
    // } = useForm<LinkInput>({ resolver: zodResolver(LinkInputSchema) });

    // const { mutate, isPending } = useCreateLink();

    // const onSubmit: SubmitHandler<LinkInput> = (data) => mutate(data);

    const handleSubmit = (data: any) => {
        console.log(data);
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
        >
            <FormLoginInput
                id="username"
                label="Username"
                placeholder="testing@testing.com"
                type="email"
            />
            <FormLoginInput
                id="password"
                label="Password"
                placeholder="********"
                type="password"
                link={{
                    href: "/photos",
                    anchor: "Forgot password?"
                }}
            />

            <div className="grid gap-3">
                <Button type="submit" size="lg">
                    Sign in
                </Button>
                <Button type="submit" size="lg" variant="outline">
                    Sign up
                </Button>
            </div>
        </form>
    );
}
