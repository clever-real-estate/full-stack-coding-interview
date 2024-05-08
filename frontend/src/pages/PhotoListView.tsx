import { PhotoList } from "../components/PhotoList";
import { useGetPhotosQuery } from "../redux/photosApi";

export const PhotoListView = () => {
  const { data: photos, error, isLoading } = useGetPhotosQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred!</div>;
  if (!photos) return null;

  return <PhotoList photos={photos} />;
};

export default PhotoListView;
