// use-photos-query.ts
import { apiFetch } from "@/services/api";
import { useQuery, type UseQueryOptions, type UseQueryResult } from "@tanstack/react-query";
import type { Photo } from "./types";

export function usePhotosQuery(
	{ favorite = false }: { favorite?: boolean } = {},
	options?: UseQueryOptions<Photo[], Error>
): UseQueryResult<Photo[], Error> {
	const params = new URLSearchParams();
	if (favorite) params.append("favorites", "true");
	const url = params.size > 0 ? `/photos?${params}` : "/photos";
	return useQuery<Photo[], Error>({
		queryKey: ["photos", { favorite }],
		queryFn: () => apiFetch(url),
		...options,
	});
}
