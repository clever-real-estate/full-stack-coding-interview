import AppLayout from "@/layouts/app-layout";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/app")({
	component: RouteComponent,
	beforeLoad: ({ context, location }) => {
		console.log("CONTEXT", context);
		if (!context.auth?.id) {
			throw redirect({
				to: "/auth/login",
				search: {
					redirect: location.href,
				},
			});
		}
	},
});

function RouteComponent() {
	return (
		<AppLayout>
			<Outlet />
		</AppLayout>
	);
}
