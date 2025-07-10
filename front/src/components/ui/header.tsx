import Logo from "@/assets/logo.svg";
import { useLogout } from "@/hooks/useLogout";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface HeaderProps {
	title: string;
	imageSrc?: string;
	imageAlt?: string;
	itemsPosition?: "start" | "center" | "end";
	showLogout?: boolean;
}

export default function Header({
	title,
	imageSrc = Logo,
	imageAlt = "Logo",
	itemsPosition = "center",
	showLogout = false,
}: HeaderProps) {
	const { logout } = useLogout();

	return (
		<header className={`flex flex-col gap-6 items-${itemsPosition}`}>
			<div
				className={cn(
					"flex justify-between items-end w-full",
					itemsPosition === "center" ? "justify-center" : "justify-between",
				)}
			>
				<img src={imageSrc} alt={imageAlt} width={75} height={75} />

				{showLogout && (
					<Button variant="outline" size="sm" onClick={logout}>
						Logout
					</Button>
				)}
			</div>
			<h2 className="text-2xl font-bold">{title}</h2>
		</header>
	);
}
