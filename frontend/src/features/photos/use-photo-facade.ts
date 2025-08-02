import { usePhotosQuery } from "./use-photos-query";

import * as api from "./api";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useAuth } from "@/features/auth/store";
import { useQueryClient } from "@tanstack/react-query";
import type { Photo } from "./types";

export const usePhotoFacade = (options: { favorite: boolean } = { favorite: false }) => {
	const navigate = useNavigate();

	const search = useSearch({ from: "/app" }) as {
		favorite?: string | boolean;
		photo?: string;
	};
	const isFavorite = search.favorite === "true" || search.favorite === true || options.favorite;
	const photoId = search.photo ? Number(search.photo) : undefined;

	const photosQuery = usePhotosQuery({ favorite: isFavorite });
	const photos = photosQuery?.data || [];

	const client = useQueryClient();
	const { user } = useAuth();

	const updateLike = (photoId: number, isLiked: boolean) => {
		client.setQueryData<Photo[]>(["photos", { favorite: isFavorite }], (prev) =>
			prev?.map((p) => (p.id === photoId ? { ...p, is_liked: isLiked } : p))
		);
	};

	const selectedPhoto = photoId ? photos.find((p) => p.id === photoId) || null : null;

	const toggleFavorites = () => {
		navigate({
			to: "/app",
			search: (prev) => ({ ...prev, favorite: prev?.favorite ? undefined : true }),
			replace: true,
		});
	};

	const selectPhoto = (id: number) => {
		if (!id) return;
		const found = photos?.find((p) => p.id === id);
		if (!found) return;
		navigate({ to: "/app", search: (prev) => ({ ...prev, photo: found.id }), resetScroll: false });
	};

	const unselectPhoto = () => {
		navigate({ to: "/app", search: (prev) => ({ ...prev, photo: undefined }), resetScroll: false });
	};

	const toggleLike = async (photo: Photo) => {
		if (!photo.id || !user) return;
		updateLike(photo.id, !photo.is_liked);

		try {
			if (photo.is_liked) {
				await api.unlikePhoto(photo.id, user?.id);
				return;
			}
			await api.likePhoto(photo.id, user?.id);
		} catch (err) {
			updateLike(photo.id, photo.is_liked);
		}
	};

	const navigatePhoto = (direction: "next" | "prev") => {
		if (!selectedPhoto || !photos.length) return;
		const currentIndex = photos.findIndex((p) => p.id === selectedPhoto.id);
		if (currentIndex === -1) return;
		let newIndex;
		if (direction === "next") {
			newIndex = (currentIndex + 1) % photos.length;
		} else {
			newIndex = (currentIndex - 1 + photos.length) % photos.length;
		}
		const nextPhoto = photos[newIndex];
		if (nextPhoto) selectPhoto(nextPhoto.id);
	};

	return {
		photos: photos ?? [],
		isLoading: photosQuery.isLoading,
		error: photosQuery.error,
		selectPhoto,
		unselectPhoto,
		isFavorite,
		toggleLike,
		toggleFavorites,

		selectedPhoto,
		navigatePhoto,
	};
};
