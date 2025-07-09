import Header from "@/components/ui/header";
import FormLogin from "./form-login";

export default function Auth() {
    return (
        <div className="flex flex-col gap-10 py-9 max-w-[320px] mx-auto">
            <Header title="Sign in to your account" />
            <FormLogin />
        </div>
    );
}
