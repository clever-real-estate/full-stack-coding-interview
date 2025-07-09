import type { PhotoSchema } from "@/schemas/photo";

import FeedItem from "./feed-item";

interface FeedProps {
	photos: PhotoSchema[];
}

export default function Feed({ photos = [] }: FeedProps) {
	return (
		<div className="flex flex-col gap-3">
			{photos.map((photo: PhotoSchema) => (
				<FeedItem key={photo.id} photo={photo} />
			))}
		</div>
	);
}
