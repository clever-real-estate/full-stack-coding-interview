import { Tooltip } from "react-tooltip";
import { useCopyToClipboard } from "react-use";
import { toast } from "sonner";
import type { Photo } from "../../types";

const PhotoDetails = ({
  photo,
  navigateToDetails,
}: {
  photo: Photo;
  navigateToDetails?: () => void;
}) => {
  const [state, copy] = useCopyToClipboard();

  return (
    <div className="flex flex-col gap-1.5 text-sm">
      <button
        onClick={navigateToDetails}
        data-tooltip-id={`view-photo-details-tooltip-${photo.id}`}
        className="flex w-fit cursor-pointer flex-col justify-start gap-1 text-left hover:underline"
      >
        <p className="font-bold">{photo.photographer.name}</p>
      </button>
      <p className="line-clamp-1 font-light md:line-clamp-2">{photo.alt}</p>
      <Tooltip id={`copy-avg-color-tooltip-${photo.id}`} place="bottom" noArrow>
        Copy {photo.avg_color} to clipboard
      </Tooltip>
      <button
        data-tooltip-id={`copy-avg-color-tooltip-${photo.id}`}
        onClick={() => {
          copy(photo.avg_color);
          if (state.error) {
            toast.error("Failed to copy color code");
          }
          toast.success("Color Copied", {
            description: `Copied ${photo.avg_color} to clipboard`,
          });
        }}
        className="w-fit cursor-pointer underline-offset-2 hover:underline"
        style={{ textDecorationColor: photo.avg_color }}
      >
        <div className="flex items-center gap-2" style={{ color: photo.avg_color }}>
          {photo.avg_color}{" "}
          <span style={{ backgroundColor: photo.avg_color }} className="size-3"></span>
        </div>
      </button>
    </div>
  );
};

export default PhotoDetails;
