import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-router";
import { useTitle } from "react-use";
import { toast } from "sonner";
import type { Photo } from "../../types";

import LoadingScreen from "../../components/LoadingScreen";
import NoPhotosFound from "../../components/NoPhotosFound";
import PageHeader from "../../components/PageHeader";
import PhotoCard from "../../components/Photo/PhotoCard";
import { Button } from "../../components/ui/button";
import useTour from "../../hooks/use-tour";
import { getPhotos, toggleLikePhoto } from "../../services/photos";
import { photosTour } from "../../tours/photos";

gsap.registerPlugin(useGSAP);

const PhotosPage = () => {
  const pageTitle = "All Photos";
  // Set page title
  useTitle(pageTitle);
  const [isLoading, setIsLoading] = useState(true);
  const [photos, setPhotos] = useState<Photo[]>([]);

  const { startTour, isCompleted } = useTour({
    tourKey: "photos-page",
    driver: photosTour, // Your tour configuration
    autoStart: false, // Auto-start for new users
    delay: 500, // Delay before starting
  });

  // Fetch photos when the component mounts
  useEffect(() => {
    getPhotos()
      .then((res) => {
        setPhotos(res.results);
        if (res.results.length > 0 && !isCompleted) {
          startTour(); // Start the tour if photos are available
        }
      })
      .catch((error) => {
        console.error("Error fetching photos:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [isCompleted, startTour]);

  /**
   * method used to handle liking or unliking a photo.
   */
  const handlePhotoLike = async (photoId: number) => {
    // check if the photo is already liked
    const photo = photos.find((p) => p.id === photoId);
    await toggleLikePhoto(photoId);
    const res = await getPhotos();
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
        <PageHeader>{pageTitle}</PageHeader>
        <Button asChild variant="outline" size="sm" className="h-8 text-sm font-normal">
          <Link to="/account/photos/liked">Liked Photos</Link>
        </Button>
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

export default PhotosPage;
