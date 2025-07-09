import { Tooltip } from "react-tooltip";
import type { Photo } from "../../types";

import StarFill from "../../assets/star-fill.svg?react";
import StarLine from "../../assets/star-line.svg?react";

const PhotoLiked = ({
  photo,
  handlePhotoLike,
}: {
  photo: Photo;
  handlePhotoLike: (photoId: number) => Promise<void>;
}) => {
  return photo.is_liked ? (
    <>
      <Tooltip id={`like-tooltip-${photo.id}`} place="bottom" noArrow>
        Unlike this photo
      </Tooltip>
      <button
        data-tooltip-id={`like-tooltip-${photo.id}`}
        className="flex cursor-pointer items-center justify-center"
        onClick={() => handlePhotoLike(photo.id)}
      >
        <StarFill className="fill-star-filled size-5" />
      </button>
    </>
  ) : (
    <>
      <Tooltip id={`like-tooltip-${photo.id}`} place="bottom" noArrow>
        Like this photo
      </Tooltip>
      <button
        onClick={() => handlePhotoLike(photo.id)}
        data-tooltip-id={`like-tooltip-${photo.id}`}
        className="flex cursor-pointer items-center justify-center"
      >
        <StarLine className="fill-star-empty size-5" />
      </button>
    </>
  );
};

export default PhotoLiked;
