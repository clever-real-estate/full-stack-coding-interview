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
		console.log("FOUND", found);
		navigate({ to: "/app", search: (prev) => ({ ...prev, photo: found.id }) });
	};

	const unselectPhoto = () => {
		navigate({ to: "/app", search: (prev) => ({ ...prev, photo: undefined }) });
	};

	const likePhoto = async (photoId: number) => {
		if (!user) return;
		await api.likePhoto(photoId, user.id);
		updateLike(photoId, true);
	};

	const unlikePhoto = async (photoId: number) => {
		if (!user) return;
		await api.unlikePhoto(photoId, user.id);
		updateLike(photoId, false);
	};

	return {
		photos: photos ?? [],
		isLoading: photosQuery.isLoading,
		error: photosQuery.error,
		selectPhoto,
		unselectPhoto,
		isFavorite,
		likePhoto,
		toggleFavorites,
		unlikePhoto,
		selectedPhoto,
	};
};
