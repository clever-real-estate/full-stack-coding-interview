import Header from "@/components/ui/header";
import { useGetPhotos } from "@/hooks/useGetPhotos";
import Feed from "./feed";

export default function Photos() {
	const { data: photos, isLoading } = useGetPhotos();

	return (
		<div className="flex flex-col gap-10 py-9 px-2 xxs:px-3 xs:px-4 max-w-[640px] mx-auto">
			<Header title="All photos" itemsPosition="start" showLogout />

			{isLoading && <div>Loading...</div>}

			{photos && <Feed photos={photos} />}
		</div>
	);
}
