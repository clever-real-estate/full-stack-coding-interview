import { cn } from "@/lib/utils";

interface ColorDisplayProps {
	color: string;
	className?: string;
}

export default function ColorDisplay({ color, className }: ColorDisplayProps) {
	return (
		<span
			className={cn("flex items-center gap-2 mt-1", className)}
			style={{ color: color }}
		>
			{color}
			<span className="h-3 w-3" style={{ backgroundColor: color }} />
		</span>
	);
}
