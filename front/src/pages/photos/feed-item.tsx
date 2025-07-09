import { Link } from "react-router-dom";

import { LinksIcon, StarFillIcon, StarLineIcon } from "@/components/icons";
import type { PhotoSchema } from "@/schemas/photo";

import "./feed-item.css";

interface FeedItemProps {
	photo: PhotoSchema;
}

export default function FeedItem({ photo }: FeedItemProps) {
	return (
		<div className="flex gap-3 p-2 xxs:p-3 md:p-4 border border-primary/8 bg-primary/1 rounded-md">
			{photo.liked ? <StarFillIcon /> : <StarLineIcon />}

			<img
				className="feed-item-image h-full max-w-[75px] rounded-md"
				src={`${photo.image_url}?auto=compress&cs=tinysrgb&h=350&w=350&fit=crop`}
				alt={photo.alt}
			/>

			<div className="flex flex-col flex-grow-1 justify-between text-xs xxs:text-sm">
				<div className="flex flex-col">
					<div className="flex items-start justify-between w-full">
						<span className="font-bold">{photo.photographer_name}</span>
						<Link
							to={photo.photographer_url}
							target="_blank"
							className="flex items-center gap-1"
						>
							<LinksIcon />
							<span className="text-primary">Portfolio</span>
						</Link>
					</div>
					<span className="text-gray-500">{photo.alt}</span>
				</div>
				<span
					className="flex items-center gap-2 mt-1"
					style={{ color: photo.avg_color }}
				>
					{photo.avg_color}
					<span
						className="h-3 w-3"
						style={{ backgroundColor: photo.avg_color }}
					/>
				</span>
			</div>
		</div>
	);
}
