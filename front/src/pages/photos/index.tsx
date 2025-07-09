import Header from "@/components/ui/header";
import { useGetPhotos } from "@/hooks/useGetPhotos";
import Feed from "./feed";

export default function Photos() {
    const { data: photos, isLoading } = useGetPhotos();

    console.log(photos);

    return (
        <div className="flex flex-col gap-10 py-9 px-2 xxs:px-3 xs:px-4">
            <Header title="All photos" itemsPosition="start" />

            {isLoading && <div>Loading...</div>}

            {photos && <Feed photos={photos} />}
        </div>
    );
}
