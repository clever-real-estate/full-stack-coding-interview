import { Star } from "lucide-react";
import { LinkIcon, Download } from "lucide-react";
import type { Photo, PhotoSource } from "../../types/photo";
import { useLikePhoto, useUnlikePhoto } from "../../api/photosApi";
import { useState, useRef, useEffect } from "react";

const downloadOptions = [
  { label: "Original", key: "original" },
  { label: "Large 2x", key: "large2x" },
  { label: "Large", key: "large" },
  { label: "Medium", key: "medium" },
  { label: "Small", key: "small" },
  { label: "Portrait", key: "portrait" },
  { label: "Landscape", key: "landscape" },
  { label: "Tiny", key: "tiny" },
];

export const PhotoItem = ({ photo }: { photo: Photo }) => {
  const { mutate: likePhoto } = useLikePhoto();
  const { mutate: unlikePhoto } = useUnlikePhoto();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div
      key={photo.id}
      className="flex items-center gap-4 dark:bg-gray-800 bg-gray-100 p-4 rounded-md text-black dark:text-white"
    >
      <div className="flex flex-col items-center flex-shrink-0 w-8">
        {photo.liked ? (
          <Star
            className="text-yellow-400 fill-yellow-400 w-5 h-5 cursor-pointer"
            onClick={() => unlikePhoto(photo.id)}
          />
        ) : (
          <Star
            className="text-gray-300 w-5 h-5 cursor-pointer"
            onClick={() => likePhoto(photo.id)}
          />
        )}
        <span className="text-xs mt-1 dark:text-white text-gray-700">
          {photo.likes_count}
        </span>
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
          <LinkIcon className="w-3 h-3" />{" "}
          <span className="hidden sm:block">Portfolio</span>
        </a>
        <div className="relative mt-2" ref={menuRef}>
          <a
            className="text-blue-600 text-xs flex items-center gap-1 hover:underline cursor-pointer dark:text-white "
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:block">Download</span>
          </a>
          {menuOpen && (
            <div className="absolute z-10 mt-2 right-0 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded shadow-lg min-w-[140px]">
              {downloadOptions.map((opt) => (
                <a
                  key={opt.key}
                  href={photo.image_urls[opt.key as keyof PhotoSource]}
                  download
                  className="flex items-center gap-2 px-4 py-2 text-sm dark:text-white text-black hover:bg-blue-50 dark:hover:bg-gray-800 cursor-pointer border-b last:border-b-0 border-gray-100 dark:border-gray-800"
                  title={`Download ${opt.label}`}
                  onClick={() => setMenuOpen(false)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="w-4 h-4" /> {opt.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
