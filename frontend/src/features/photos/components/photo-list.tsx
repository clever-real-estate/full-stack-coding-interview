import type { Photo } from "../types";
import { PhotoCard } from "./photo-card";

export default function PhotoList({ photos }: { photos: Photo[] }) {
	return (
		<div
			aria-description="photo-list-grid"
			className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4"
		>
			{photos.map((photo) => (
				<PhotoCard photo={photo} key={photo.id} />
			))}
		</div>
	);
}
