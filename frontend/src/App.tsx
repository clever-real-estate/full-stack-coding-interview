import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { ThemeProvider } from "@/components/theme-provider";

import { routeTree } from "./routeTree.gen";
import { useAuth } from "@/features/auth/store";

const queryClient = new QueryClient();
const router = createRouter({
	routeTree,
	context: { queryClient: queryClient, auth: undefined },
	defaultPreload: "intent",
	defaultPreloadStaleTime: 0,
	scrollRestoration: true,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}
const App = () => {
	const { user } = useAuth();
	return (
		<ThemeProvider defaultTheme="dark">
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} context={{ queryClient, auth: user }} />

				<TooltipProvider>
					<Sonner />
				</TooltipProvider>
			</QueryClientProvider>
		</ThemeProvider>
	);
};

export default App;
