import { Icon } from "@iconify/react";
import { useNavigate } from "react-router";
import { Tooltip } from "react-tooltip";
import { useTitle } from "react-use";
import { toast } from "sonner";
import type { Photo } from "../../types";

import LoadingScreen from "../../components/LoadingScreen";
import NoPhotosFound from "../../components/NoPhotosFound";
import PageHeader from "../../components/PageHeader";
import PhotoCard from "../../components/Photo/PhotoCard";
import { Button } from "../../components/ui/button";
import { getLikedPhotos, toggleLikePhoto } from "../../services/photos";

const PhotosLikedPage = () => {
  const pageTitle = "My Liked Photos";
  // Set page title
  useTitle(pageTitle);
  // Set up state for loading and photos
  const [isLoading, setIsLoading] = useState(true);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const navigate = useNavigate();

  // Fetch photos when the component mounts
  useEffect(() => {
    getLikedPhotos()
      .then((res) => {
        setPhotos(res.results);
      })
      .catch((error) => {
        console.error("Error fetching photos:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  /**
   * Method used to handle liking or disliking a photo.
   */
  const handlePhotoLike = async (photoId: number) => {
    // check if the photo is already liked
    const photo = photos.find((p) => p.id === photoId);
    await toggleLikePhoto(photoId);
    const res = await getLikedPhotos();
    setPhotos(res.results);
    toast.success(`${photo?.is_liked ? "Nope" : "Yeah"}!`, {
      description: `You have ${photo?.is_liked ? "unliked" : "liked"} this photo.`,
    });
  };

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <div className="py-10">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            data-tooltip-id="go-back-to-all-photos"
            onClick={() => navigate(-1)}
            className="size-7"
            variant="outline"
            size="icon"
          >
            <Icon icon="lucide:arrow-left" className="text-muted-text size-4" />
            <span className="sr-only">Go back</span>
          </Button>
          <Tooltip place="bottom" noArrow id="go-back-to-all-photos">
            Go back
          </Tooltip>
          <PageHeader>{pageTitle}</PageHeader>
        </div>
      </div>
      {photos.length == 0 ? (
        <NoPhotosFound />
      ) : (
        <ul className="flex flex-col gap-4">
          {photos.map((photo) => (
            <PhotoCard handlePhotoLike={handlePhotoLike} key={photo.id} photo={photo} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default PhotosLikedPage;
