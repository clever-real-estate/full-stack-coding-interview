import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateLink } from "@/hooks/useCreateLinks";
import { type LinkInput, LinkInputSchema } from "@/schemas/link-schema";

export default function Auth() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LinkInput>({ resolver: zodResolver(LinkInputSchema) });

    const { mutate, isPending } = useCreateLink();

    const onSubmit: SubmitHandler<LinkInput> = (data) => mutate(data);

    return (
        <div className="bg-white rounded-lg w-full p-6 md:p-8">
            <h2 className="text-lg font-bold text-gray-600 mb-5">Novo Link</h2>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-5 md:gap-6"
            >
                <div className="flex flex-col gap-4">
                    <Input
                        {...register("originalUrl")}
                        placeholder="www.exemplo.com.br"
                        label="Link Original"
                        error={errors.originalUrl}
                    />
                    <Input
                        {...register("shortUrlPath")}
                        placeholder="brev.ly/"
                        label="Link encurtado"
                        error={errors.shortUrlPath}
                    />
                </div>
                <Button type="submit" isLoading={isPending} disabled={isPending}>
                    Salvar Link
                </Button>
            </form>
        </div >
    );
}
