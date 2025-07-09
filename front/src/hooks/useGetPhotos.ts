import { useQuery } from "@tanstack/react-query";

import { http } from "@/lib/http";
import type { PhotoSchema } from "@/schemas/photo";

export function useGetPhotos() {
	return useQuery<PhotoSchema[]>({
		queryKey: ["photos"],
		queryFn: () => http.get<PhotoSchema[]>("/photos").then((res) => res.data),
	});
}
