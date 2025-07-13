import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: RouteComponent,
	beforeLoad: ({ context, location }) => {
		if (!context.auth?.id) {
			throw redirect({
				to: "/auth/login",
			});
		}
		throw redirect({
			to: "/app",
		});
	},
});

function RouteComponent() {
	return <div>Hello "/"!</div>;
}
