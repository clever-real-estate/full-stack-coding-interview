import { Loading } from "@/components/Loading";
import { logout } from "@/redux/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { PhotoList } from "../components/PhotoList";
import { useGetPhotosQuery, useLikePhotoMutation } from "../redux/photosApi";

export const PhotoListView = () => {
  const dispatch = useAppDispatch();
  const { data: photos, error, isLoading } = useGetPhotosQuery();
  const [likePhoto] = useLikePhotoMutation();

  const handleLogout = () => {
    dispatch(logout());
  };

  if (isLoading) return <Loading />;
  if (error) return <div>Error occurred!</div>;
  if (!photos) return null;

  return (
    <PhotoList photos={photos} onLike={likePhoto} onLogout={handleLogout} />
  );
};

export default PhotoListView;
