import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useEffect, useState } from "react";
import type { Photo } from "../types";

export default function PhotoDetails({
	selectedPhoto,
	onUnselect,
}: {
	selectedPhoto?: Photo | null;
	onUnselect: () => void;
}) {
	console.log("SELECTED", selectedPhoto);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		console.log("cai no ueseffec", selectedPhoto);
		if (selectedPhoto) setIsOpen(true);
	}, [selectedPhoto]);

	const onOpenChange = (open: boolean) => {
		if (!open) {
			setIsOpen(false);
			setTimeout(() => onUnselect(), 300);
		}
	};

	const imageSrc = selectedPhoto?.src_large2x || selectedPhoto?.src_medium || selectedPhoto?.src_original;

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="min-w-1/2 h-auto max-w-7xl">
				<DialogTitle>
					{selectedPhoto?.alt},{" "}
					<span className="text-muted-foreground text-sm italic">by {selectedPhoto?.photographer}</span>
				</DialogTitle>
				<DialogDescription />
				<AspectRatio>
					<img src={imageSrc} alt={selectedPhoto?.alt} className={"size-full object-cover rounded-md"} />
				</AspectRatio>
			</DialogContent>
		</Dialog>
	);
}
