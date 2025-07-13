import { apiFetch } from "@/services/api";

export const likePhoto = (photoId: number, userId: number | string) =>
	apiFetch("/likes", { method: "POST", body: JSON.stringify({ photo_id: photoId, user_id: userId }) });

export const unlikePhoto = (photoId: number, userId: number | string) =>
	apiFetch(`/likes/${userId}/${photoId}`, { method: "DELETE" });
