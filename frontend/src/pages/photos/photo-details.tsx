import { Icon } from "@iconify/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate, useParams } from "react-router";
import { Tooltip } from "react-tooltip";
import { useTitle } from "react-use";
import { toast } from "sonner";
import type { Photo } from "../../types";

import PageHeader from "../../components/PageHeader";
import PhotoDetailItem from "../../components/Photo/PhotoDetailItem";
import { Button } from "../../components/ui/button";
import { useMediaQuery } from "../../hooks/use-media-query";
import { getPhotoById } from "../../services/photos";

const PhotoDetails = () => {
  const [photoDetails, setPhotoDetails] = useState<Photo | null>(null);
  const params = useParams();
  const navigate = useNavigate();
  const pageTitle = "Photo Details";
  useTitle(pageTitle);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const getOptimalImageSize = () => {
    // get the original size if available
    let originalSize = photoDetails?.src_original;
    if (isMobile) {
      originalSize = photoDetails?.src_large2x;
    }
    return originalSize;
  };

  // Fetch photo details based on params.photoId
  useEffect(() => {
    getPhotoById(params.photoId)
      .then((photo) => {
        setPhotoDetails(photo);
      })
      .catch((e) => {
        console.log(e);
        toast.error("Failed to load details");
        navigate("/account/photos", { replace: true });
      });
  }, [navigate, params.photoId]);

  return (
    <div className="py-10">
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
        <PageHeader>{photoDetails?.photographer?.name}</PageHeader>
      </div>

      <div className="mt-10">
        {photoDetails && (
          <div className="grid grid-cols-12 gap-6">
            <LazyLoadImage
              className="ring-border/50 col-span-full h-full max-h-[350px] w-full rounded-lg object-cover shadow ring-1 md:col-span-6 md:max-h-[450px]"
              src={getOptimalImageSize()}
              alt={photoDetails.alt}
            />
            <dl className="col-span-full flex w-full flex-col divide-y md:col-span-5">
              <PhotoDetailItem label="Photographer" value={photoDetails.photographer?.name} />
              <PhotoDetailItem
                label="Profile"
                value={
                  <div className="flex items-center gap-2">
                    <a
                      className="text-primary underline underline-offset-2"
                      target="_blank"
                      href={photoDetails.photographer?.url}
                    >
                      View Profile
                    </a>
                    <Icon icon="lucide:external-link" className="text-primary ml-1 inline size-4" />
                  </div>
                }
              />
              <PhotoDetailItem label="Height" value={photoDetails.height} />
              <PhotoDetailItem label="Width" value={photoDetails.width} />
              <PhotoDetailItem label="Pexel ID" value={photoDetails.photographer?.pexels_id} />
              <PhotoDetailItem label="Alt Text" value={photoDetails.alt} />
            </dl>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoDetails;
