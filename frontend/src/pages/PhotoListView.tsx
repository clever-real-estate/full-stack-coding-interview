import { PhotoList } from "../components/PhotoList";
import { useGetPhotosQuery, useLikePhotoMutation } from "../redux/photosApi";

export const PhotoListView = () => {
  const { data: photos, error, isLoading } = useGetPhotosQuery();
  const [likePhoto] = useLikePhotoMutation();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred!</div>;
  if (!photos) return null;

  return <PhotoList photos={photos} onLike={likePhoto} />;
};

export default PhotoListView;
