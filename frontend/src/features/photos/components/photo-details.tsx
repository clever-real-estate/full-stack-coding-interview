import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ExternalLink, Heart, Share2 } from "lucide-react";
import { usePhotoFacade } from "../use-photo-facade";
import { useIsMobile } from "@/hooks/use-mobile";

export default function PhotoDetails() {
	const { toggleLike, selectedPhoto, unselectPhoto, navigatePhoto } = usePhotoFacade();
	console.log("SELECTED", selectedPhoto);
	const [isOpen, setIsOpen] = useState(false);
	const [transitioning, setTransitioning] = useState(false);

	useEffect(() => {
		if (selectedPhoto) setIsOpen(true);
	}, [selectedPhoto]);
	const mobile = useIsMobile({ breakPoint: 1000 });

	const onOpenChange = (open: boolean) => {
		if (!open) {
			setIsOpen(false);
			setTimeout(() => unselectPhoto(), 300);
		}
	};
	const handleNavigate = (direction: "next" | "prev") => {
		setTransitioning(true);
		setTimeout(() => {
			navigatePhoto(direction);
			setTransitioning(false);
		}, 200);
	};

	const imageSrc = useMemo(() => {
		if (!selectedPhoto) return undefined;
		if (mobile) return selectedPhoto.src_portrait;
		return selectedPhoto.src_landscape ?? selectedPhoto.src_medium ?? selectedPhoto.src_original;
	}, [selectedPhoto, mobile]);

	const isLiked = selectedPhoto?.is_liked;
	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="min-w-[90vw] w-full h-[90vh] p-0 overflow-hidden">
				{selectedPhoto && (
					<div className="flex flex-col md:flex-row h-full">
						{/* Image Section */}
						<div className="flex-1 relative bg-background flex items-center justify-center min-h-[50vh] md:min-h-full">
							<img
								src={imageSrc}
								alt={selectedPhoto.alt}
								className={`object-contain w-full h-full transition-opacity duration-200 ${transitioning ? "opacity-0" : "opacity-100"}`}
								sizes="(max-width: 768px) 100vw, 70vw"
							/>

							{/* Navigation Arrows */}
							<Button
								variant="secondary"
								size="icon"
								className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2  h-8 w-8 md:h-10 md:w-10"
								onClick={() => handleNavigate("prev")}
								disabled={transitioning}
							>
								<ChevronLeft className="h-3 w-3 md:h-4 md:w-4" />
							</Button>

							<Button
								variant="secondary"
								size="icon"
								className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2  h-8 w-8 md:h-10 md:w-10"
								onClick={() => handleNavigate("next")}
								disabled={transitioning}
							>
								<ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
							</Button>

							{/* Color Badge */}
							<div className="absolute top-2 md:top-4 left-2 md:left-4">
								<div
									className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-white shadow-lg"
									style={{ backgroundColor: selectedPhoto.avg_color }}
									title={`Main color: ${selectedPhoto.avg_color}`}
								/>
							</div>
						</div>

						{/* Info Panel */}
						<div className="w-full md:w-80 bg-background p-4 md:p-6 overflow-y-auto max-h-[40vh] md:max-h-full">
							<DialogHeader className="mb-4 md:mb-6">
								<DialogTitle className="text-base md:text-lg font-semibold leading-relaxed pr-8">
									{selectedPhoto.alt}
								</DialogTitle>
							</DialogHeader>

							<div className="space-y-4 md:space-y-6">
								{/* Action Buttons */}
								<div className="flex gap-2">
									<Button
										size="sm"
										variant={isLiked ? "default" : "outline"}
										onClick={() => toggleLike(selectedPhoto)}
										className="flex-1"
									>
										<Heart className={`h-4 w-4 mr-2 ${isLiked ? "fill-current" : ""}`} />
										{isLiked ? "Liked" : "Like"}
									</Button>

									<Button size="sm" variant="outline" className="px-2 bg-transparent">
										<Share2 className="h-4 w-4" />
									</Button>
								</div>

								{/* Photographer Info */}
								<div className="space-y-3">
									<h3 className="font-medium  text-sm md:text-base">Photographer</h3>
									<a
										href={selectedPhoto.photographer_url}
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
									>
										<div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
											{selectedPhoto.photographer.charAt(0)}
										</div>
										<div className="min-w-0 flex-1">
											<p className="font-medium text-sm md:text-base truncate">{selectedPhoto.photographer}</p>
											<p className="text-xs md:text-sm text-gray-500">View Profile</p>
										</div>
										<ExternalLink className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
									</a>
								</div>

								{/* Photo Details */}
								<div className="space-y-3">
									<h3 className="font-medium  text-sm md:text-base">Photo Details</h3>
									<div className="grid grid-cols-2 gap-2 md:gap-3 text-xs md:text-sm">
										<div>
											<p className="text-gray-500">Dimensions</p>
											<p className="font-medium">
												{selectedPhoto.width} x {selectedPhoto.height}
											</p>
										</div>
										<div>
											<p className="text-gray-500">Photo ID</p>
											<p className="font-medium">#{selectedPhoto.id}</p>
										</div>
									</div>
								</div>

								{/* Color Information */}
								<div className="space-y-3">
									<h3 className="font-medium  text-sm md:text-base">Color Information</h3>
									<div className="flex items-center gap-3">
										<div
											className="w-10 h-10 md:w-12 md:h-12 rounded-lg border border-gray-200 flex-shrink-0"
											style={{ backgroundColor: selectedPhoto.avg_color }}
										/>
										<div className="min-w-0">
											<p className="font-medium text-sm md:text-base">{selectedPhoto.avg_color}</p>
											<p className="text-xs md:text-sm text-gray-500">Dominant Color</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
}
