import PhotosList from "@/features/photos/pages/photos-list";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";
const photoSearchSchema = z
	.object({
		favorite: z.boolean().optional(),
		photo: z.number().optional(),
	})
	.optional();

export const Route = createFileRoute("/app/")({
	validateSearch: zodValidator(photoSearchSchema),
	component: RouteComponent,
});

function RouteComponent() {
	return <PhotosList />;
}
