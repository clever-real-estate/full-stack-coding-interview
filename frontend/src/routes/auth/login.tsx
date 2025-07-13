import PartnerLogin from "@/features/auth/pages/login";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/login")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex h-screen w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm">
				<PartnerLogin />
			</div>
		</div>
	);
}
