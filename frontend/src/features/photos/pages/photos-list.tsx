import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import PhotoList from "../components/photo-list";
import PhotoDetails from "../components/photo-details";
import { usePhotoFacade } from "../use-photo-facade";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function PhotosList() {
	const { photos, isLoading, error, isFavorite, toggleFavorites } = usePhotoFacade();

	if (isLoading) {
		return (
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{Array.from({ length: 8 }).map((_, i) => (
					<Card key={i}>
						<CardContent>
							<Skeleton className="w-full h-40 mb-4" />
							<Skeleton className="w-1/2 h-4 mb-2" />
							<Skeleton className="w-1/3 h-4 mb-2" />
							<Skeleton className="w-1/4 h-4" />
						</CardContent>
					</Card>
				))}
			</div>
		);
	}

	if (error) {
		return (
			<Alert variant="destructive">
				<AlertTitle>Error loading photos</AlertTitle>
				<AlertDescription>{error.message || "An error occurred while fetching photos."}</AlertDescription>
			</Alert>
		);
	}

	if (!photos || photos.length === 0) {
		return (
			<Alert>
				<AlertTitle>No photos found</AlertTitle>
				<AlertDescription>There are no photos to display.</AlertDescription>
			</Alert>
		);
	}

	return (
		<div className="flex flex-col">
			<div className="flex items-center gap-4 mb-4">
				<h1 className="flex-1 text-xl  font-semibold ">{isFavorite ? "Favorite photos" : "All photos"}</h1>
				<div className="flex items-center gap-2">
					<Label htmlFor="favorite-switch" className="text-sm select-none cursor-pointer">
						Show All
					</Label>
					<Switch checked={isFavorite} onCheckedChange={toggleFavorites} id="favorite-switch" />
					<Label htmlFor="favorite-switch" className="text-sm select-none cursor-pointer">
						Show Favorites
					</Label>
				</div>
			</div>
			<PhotoDetails />
			<PhotoList photos={photos} />
		</div>
	);
}
