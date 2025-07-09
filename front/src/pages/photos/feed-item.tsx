import { LinksIcon } from "@/components/icons";
import ColorDisplay from "@/components/ui/color-display";
import IconLink from "@/components/ui/icon-link";
import LikeButton from "@/components/ui/like-button";
import type { PhotoSchema } from "@/schemas/photo";

interface FeedItemProps {
	photo: PhotoSchema;
	onLike: () => void;
}

export default function FeedItem({ photo, onLike }: FeedItemProps) {
	return (
		<div className="flex gap-3 p-2 xxs:p-3 md:p-4 border border-primary/8 bg-primary/1 rounded-md">
			<LikeButton liked={photo.liked} onClick={onLike} />

			<img
				className="h-full max-w-[75px] rounded-md"
				src={`${photo.image_url}?auto=compress&cs=tinysrgb&h=350&w=350&fit=crop`}
				alt={photo.alt}
			/>

			<div className="flex flex-col flex-grow-1 justify-between text-xs xxs:text-sm">
				<div>
					<div className="flex items-start justify-between w-full">
						<span className="font-bold">{photo.photographer_name}</span>
						<IconLink
							anchor="Portfolio"
							href={photo.photographer_url}
							icon={<LinksIcon />}
						/>
					</div>

					<span className="text-gray-500">{photo.alt}</span>
				</div>

				<ColorDisplay color={photo.avg_color} className="mt-1" />
			</div>
		</div>
	);
}
