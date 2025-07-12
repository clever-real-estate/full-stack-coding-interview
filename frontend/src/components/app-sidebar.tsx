import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "@tanstack/react-router";
import { useAuth } from "@/features/auth/store";
import { NavUser } from "./nav-user";

// Menu items.
const items = [
	{
		title: "Home",
		url: "/app",
		icon: Home,
	},
	{
		title: "Lojas",
		url: "/app/lojas",
		icon: Inbox,
	},
	{
		title: "Minha loja",
		url: "/app/lojas/dashboard",
		icon: Calendar,
	},
	{
		title: "Search",
		url: "#",
		icon: Search,
	},
	{
		title: "Settings",
		url: "#",
		icon: Settings,
	},
];

export function AppSidebar() {
	const user = useAuth((s) => s.user);
	const logout = useAuth((s) => s.logout);

	return (
		<Sidebar collapsible="icon" variant="inset">
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Achei SJ</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<Link to={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>{user && <NavUser user={user} />}</SidebarFooter>
		</Sidebar>
	);
}
