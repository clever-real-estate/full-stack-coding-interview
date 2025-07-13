import { Camera, Settings, SwitchCamera, UserCircle } from "lucide-react";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "@tanstack/react-router";
import { useAuth } from "@/features/auth/store";
import { NavUser } from "./nav-user";
import logo from "@/logo.svg";

// Menu items.
const items = [
	{
		title: "All photos",
		url: "/app",
		icon: SwitchCamera,
	},
	{
		title: "My photos",
		url: "#",
		icon: Camera,
	},
	{
		title: "Photographers",
		url: "#",
		icon: UserCircle,
	},
	{
		title: "Settings",
		url: "#",
		icon: Settings,
	},
];

export function AppSidebar() {
	const user = useAuth((s) => s.user);

	return (
		<Sidebar collapsible="icon" variant="inset">
			<SidebarContent>
				<SidebarHeader>
					<img src={logo} className="size-12" alt="logo" />
				</SidebarHeader>
				<SidebarGroup>
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
