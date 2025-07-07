import { Star } from "lucide-react";
import { LinkIcon } from "lucide-react";
import type { Photo } from "../../types/photo";

export const PhotoItem = ({ photo }: { photo: Photo }) => {
  return (
    <div
      key={photo.id}
      className="flex items-center gap-4 dark:bg-gray-800 bg-gray-100 p-4 rounded-md text-black dark:text-white"
    >
      <div className="flex-shrink-0">
        {photo.liked_by_current_user ? (
          <Star className="text-yellow-400 fill-yellow-400 w-5 h-5" />
        ) : (
          <Star className="text-gray-300 w-5 h-5" />
        )}
      </div>
      <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-200 flex items-center justify-center">
        {photo.image_urls.small ? (
          <img
            src={photo.image_urls.small}
            alt={photo.alt}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="w-full h-full bg-gray-200" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-bold text-lg leading-tight dark:text-white text-black">
          {photo.photographer.name}
        </div>
        <div className="text-sm text-gray-700 leading-tight dark:text-white ">
          {photo.alt}
        </div>
        <div className="text-xs text-gray-500 flex items-center gap-2 dark:text-white ">
          {photo.avg_color}
          <span
            className="inline-block w-3 h-3 rounded-sm"
            style={{ backgroundColor: photo.avg_color }}
          />
        </div>
      </div>
      <div className="flex-shrink-0">
        <a
          href={photo.photographer.url}
          className="text-blue-600 text-xs flex items-center gap-1 hover:underline cursor-pointer dark:text-white "
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkIcon className="w-3 h-3" /> Portfolio
        </a>
      </div>
    </div>
  );
};
