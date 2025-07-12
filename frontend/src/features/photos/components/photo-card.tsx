import React from "react";
import type { Photo } from "../types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Star } from "lucide-react";
import { usePhotoFacade } from "../use-photo-facade";

interface PhotoCardProps {
	photo: Photo;
	onLike?: (photo: Photo) => void;
	onDislike?: (photo: Photo) => void;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({ photo }) => {
	const { selectPhoto, toggleLike } = usePhotoFacade();

	return (
		<Card key={photo.id} className="group overflow-hidden hover:shadow-lg transition-shadow duration-300">
			<CardContent className="p-0">
				<div className="relative aspect-square overflow-hidden">
					<div className="cursor-pointer" role="button" onClick={() => selectPhoto(photo.id)}>
						<img
							src={photo.src_large || photo.src_medium}
							alt={photo.alt}
							className="object-cover transition-transform w-full h-full duration-300 group-hover:scale-105 cursor-pointer"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
					</div>
					<Button
						size="icon"
						variant="secondary"
						className="absolute top-3 right-3 h-8 w-8 bg-white/90 hover:bg-white transition-colors duration-200"
						onClick={() => toggleLike(photo)}
					>
						<Star
							className={`h-4 w-4 transition-colors duration-200 ${
								photo.is_liked ? "fill-amber-500 text-amber-500" : "text-gray-600 hover:text-amber-500"
							}`}
						/>
					</Button>
				</div>

				<div className="p-4 space-y-3">
					<h3 className="font-medium text-sm line-clamp-2  leading-relaxed">{photo.alt}</h3>

					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-2 min-w-0 flex-1">
							<span className="text-xs text-gray-500">by</span>
							<a
								href={photo.photographer_url}
								target="_blank"
								rel="noopener noreferrer"
								className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200 truncate flex items-center gap-1 group/link"
							>
								{photo.photographer}
								<ExternalLink className="h-3 w-3 opacity-0 group-hover/link:opacity-100 transition-opacity duration-200 flex-shrink-0" />
							</a>
						</div>
					</div>

					<div className="flex items-center justify-between pt-2 border-t border-gray-100">
						<Badge style={{ backgroundColor: photo.avg_color }} variant="secondary" className="text-xs">
							{photo.avg_color}
						</Badge>
						<span className="text-xs text-gray-400">
							{photo.width} x {photo.height}
						</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
