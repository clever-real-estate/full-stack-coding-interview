import { useNavigate } from "react-router";
import { Tooltip } from "react-tooltip";
import type { Photo } from "../../types";

import LinkIcon from "../../assets/links.svg";
import PhotoDetails from "./PhotoDetails";
import PhotoImage from "./PhotoImage";
import PhotoLiked from "./PhotoLiked";

const PhotoCard = ({
  photo,
  handlePhotoLike,
}: {
  photo: Photo;
  handlePhotoLike: (photoId: number) => Promise<void>;
}) => {
  const navigate = useNavigate();
  // Navigate to photo details page
  const navigateToDetails = () => {
    navigate(`/account/photos/${photo.id}`, { state: { photo } });
  };
  return (
    <li className="flex items-start gap-3">
      <PhotoLiked handlePhotoLike={handlePhotoLike} photo={photo} />
      <PhotoImage navigateToDetails={navigateToDetails} photo={photo} />
      <PhotoDetails navigateToDetails={navigateToDetails} photo={photo} />
      <Tooltip id={`view-photographer-profile-tooltip-${photo.id}`} noArrow>
        View profile
      </Tooltip>
      <Tooltip id={`view-photo-details-tooltip-${photo.id}`} noArrow>
        View details
      </Tooltip>
      <a
        data-tooltip-id={`view-photographer-profile-tooltip-${photo.id}`}
        className="text-primary ml-auto flex shrink-0 items-center gap-2 text-sm underline-offset-2 hover:underline"
        href={photo.photographer.url}
        target="_blank"
        title={`Link to ${photo.photographer.name}'s portfolio`}
      >
        <img src={LinkIcon} alt="Link to photographer's portfolio" className="size-4" />
        Portfolio
      </a>
    </li>
  );
};

export default PhotoCard;
