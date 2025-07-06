import Header from "@/components/ui/header";
import FormLogin from "./form-login";

export default function Auth() {
    return (
        <div className="flex flex-col gap-9 py-9">
            <Header title="Sign in to your account" />
            <FormLogin />
        </div>
    );
}
