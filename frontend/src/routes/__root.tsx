import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { type StoreUser } from "@/features/auth/store";
import type { QueryClient } from "@tanstack/react-query";
interface RouterContext {
	auth: StoreUser | undefined;
	queryClient: QueryClient;
}
export const Route = createRootRouteWithContext<RouterContext>()({
	component: () => (
		<>
			<Outlet />
			<TanStackRouterDevtools />
		</>
	),
});
