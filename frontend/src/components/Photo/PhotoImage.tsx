import { LazyLoadImage } from "react-lazy-load-image-component";
import type { Photo } from "../../types";

const PhotoImage = ({
  photo,
  navigateToDetails,
}: {
  photo: Photo;
  navigateToDetails?: () => void;
}) => {
  return (
    <LazyLoadImage
      tabIndex={0}
      onClick={navigateToDetails}
      data-tooltip-id={`view-photo-details-tooltip-${photo.id}`}
      src={photo.src_large2x}
      alt={photo.alt}
      className="hover:ring-primary/30 size-[75px] shrink-0 cursor-pointer rounded-xl object-cover shadow transition-all hover:ring-[4px] md:size-[90px]"
    />
  );
};

export default PhotoImage;
