import { Link } from "react-router-dom";

interface IconLinkProps {
	anchor: string;
	href: string;
	icon: React.ReactNode;
}

export default function IconLink({ anchor, href, icon }: IconLinkProps) {
	return (
		<Link to={href} target="_blank" className="flex items-center gap-1">
			{icon}
			<span className="text-primary">{anchor}</span>
		</Link>
	);
}
