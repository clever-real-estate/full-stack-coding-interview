import React from "react"
const PhotoModal = ({ photo, onClose }) => {
  if (!photo) return null

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-5xl font-light hover:text-gray-300 z-10"
        aria-label="Close"
      >
        &times;
      </button>

      <div
        className="flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={photo.image_url.replace("h=350", "h=2000")}
          alt={photo.alt_text}
          className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg shadow-2xl"
        />

        {photo.alt_text && (
          <p className="text-white text-center mt-4 text-sm md:text-base max-w-xl">
            {photo.alt_text}
          </p>
        )}
      </div>
    </div>
  )
}

export default PhotoModal
