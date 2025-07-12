import React, { useState } from "react";
import type { Photo } from "../types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Expand } from "lucide-react";
import { usePhotoFacade } from "../use-photo-facade";

interface PhotoCardProps {
	photo: Photo;
	onLike?: (photo: Photo) => void;
	onDislike?: (photo: Photo) => void;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({ photo, onLike, onDislike }) => {
	const [liked, setLiked] = useState(photo.is_liked);
	const [animate, setAnimate] = useState(false);
	const { selectPhoto, likePhoto, unlikePhoto } = usePhotoFacade();
	const handleLikeToggle = () => {
		setAnimate(true);
		setTimeout(() => setAnimate(false), 500);
		if (liked) {
			setLiked(false);
			unlikePhoto(photo.id);
		} else {
			setLiked(true);
			likePhoto(photo.id);
		}
	};

	return (
		<Card className="flex items-center w-full max-w-sm m-2 drop-shadow-border !border-none ">
			<CardContent className="flex gap-4 items-start w-full">
				<Button
					onClick={handleLikeToggle}
					variant={"ghost"}
					size="icon"
					className="text-xl self-start rounded-full"
					aria-label={liked ? "Dislike this photo" : "Like this photo"}
				>
					<Star
						className={`transition-all duration-300 ${
							liked ? "text-amber-300 fill-amber-300" : "text-gray-400"
						} ${animate ? "scale-125" : "scale-100"}`}
						strokeWidth={liked ? 1.5 : 2}
						size={22}
					/>
				</Button>

				<div
					className="relative group cursor-pointer"
					onClick={() => selectPhoto(photo.id)}
					tabIndex={0}
					role="button"
					aria-label="Expand photo"
				>
					<img
						src={photo.src_medium || photo.src_large || photo.src_original}
						alt={photo.alt}
						className="w-24 h-24 object-cover rounded-md"
						loading="lazy"
					/>
					<div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
						<Expand />
					</div>
				</div>

				<div className="flex flex-col gap-2 justify-between h-full  flex-1 overflow-hidden">
					<div className="flex flex-col">
						<CardTitle className="text-base font-semibold truncate">{photo.photographer}</CardTitle>
						<CardDescription className="text-sm text-muted-foreground truncate">
							{photo.alt || "Untitled"}
						</CardDescription>
					</div>
					<Badge style={{ backgroundColor: photo.avg_color, color: "#fff" }}>{photo.avg_color}</Badge>
				</div>
			</CardContent>
		</Card>
	);
};
