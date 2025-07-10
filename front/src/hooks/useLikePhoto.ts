import { useMutation, useQueryClient } from "@tanstack/react-query";

import { http } from "@/lib/http";

export function useLikePhoto() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (photoId: string) => http.post(`/photos/${photoId}/like`),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["photos"] });
		},
	});
}
