import { useLikePhoto } from "@/hooks/useLikePhoto";
import type { PhotoSchema } from "@/schemas/photo";

import FeedItem from "./feed-item";

interface FeedProps {
	photos: PhotoSchema[];
}

export default function Feed({ photos = [] }: FeedProps) {
	const { mutate: likePhoto } = useLikePhoto();

	return (
		<div className="flex flex-col gap-3">
			{photos.map((photo: PhotoSchema) => (
				<FeedItem
					key={photo.id}
					photo={photo}
					onLike={() => likePhoto(photo.id)}
				/>
			))}
		</div>
	);
}
