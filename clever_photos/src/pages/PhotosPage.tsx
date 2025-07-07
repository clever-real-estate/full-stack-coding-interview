import { usePhotos } from "../api/photosApi";
import { PhotoList } from "../components/photos/PhotoList";

export const PhotosPage = () => {
  const { data: photos, isLoading, isError } = usePhotos();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !photos) {
    return <div>Error loading photos</div>;
  }

  return (
    <div className="min-h-screen dark:bg-gray-900 bg-gray-50 flex flex-col items-center py-10">
      <div className="flex flex-col items-center w-full max-w-4xl">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-blue-500 mb-6">
          <span className="text-white text-4xl font-bold italic">CP</span>
        </div>
        <h1 className="text-2xl font-bold mb-8 w-full text-left dark:text-white text-black">
          All photos
        </h1>
        <PhotoList photos={photos} />
      </div>
    </div>
  );
};
