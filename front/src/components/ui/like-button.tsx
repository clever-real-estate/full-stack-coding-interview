import { StarFillIcon, StarLineIcon } from "../icons";

interface LikeButtonProps {
	liked: boolean;
	onClick: () => void;
}

export default function LikeButton({ liked, onClick }: LikeButtonProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			className="h-fit cursor-pointer hover:opacity-50 transition-opacity"
		>
			{liked ? <StarFillIcon /> : <StarLineIcon />}
		</button>
	);
}
