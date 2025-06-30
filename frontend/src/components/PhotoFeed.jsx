import React, { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import api from "../services/api"
import StarIcon from "./StarIcon"
import ColorSwatch from "./ColorSwatch"
import PhotoModal from "./PhotoModal"

const PhotoFeed = () => {
  const { user, logout } = useAuth()
  const [photos, setPhotos] = useState([])
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const currentUserId = user ? user.id : null

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await api.get("/photos")
        setPhotos(response.data)
      } catch (error) {
        console.error("Failed to fetch photos", error)
      }
    }
    fetchPhotos()
  }, [])

  const handleLike = async (photoId) => {
    try {
      const response = await api.post(`/photos/${photoId}/likes`)
      const updatedPhoto = response.data

      setPhotos((prevPhotos) =>
        prevPhotos.map((photo) => (photo.id === photoId ? updatedPhoto : photo))
      )
    } catch (error) {
      console.error("Failed to like photo", error)
    }
  }

  const handleUnlike = async (photoId, likeId) => {
    try {
      const response = await api.delete(`/photos/${photoId}/likes/${likeId}`)
      const updatedPhoto = response.data

      setPhotos((prevPhotos) =>
        prevPhotos.map((photo) => (photo.id === photoId ? updatedPhoto : photo))
      )
    } catch (error) {
      console.error("Failed to unlike photo", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 bg-blue-500 rounded-full text-white flex items-center justify-center text-3xl font-bold flex-shrink-0">
              CI
            </div>
            <h1 className="text-4xl font-bold">All photos</h1>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md text-sm font-semibold hover:bg-gray-100 flex-shrink-0"
          >
            Logout
          </button>
        </div>

        <div className="space-y-4">
          {photos &&
            Array.isArray(photos) &&
            photos.map((photo) => {
              const userLike = photo.likes.find(
                (like) => like.user_id === currentUserId
              )
              return (
                <div
                  key={photo.pexels_id}
                  className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg bg-white"
                >
                  <div
                    onClick={() =>
                      userLike
                        ? handleUnlike(photo.id, userLike.id)
                        : handleLike(photo.id)
                    }
                  >
                    <StarIcon filled={!!userLike} />
                  </div>
                  <img
                    src={photo.image_url}
                    alt={photo.alt_text}
                    className="w-[75px] h-[75px] flex-shrink-0 object-cover rounded-md cursor-pointer"
                    onClick={() => setSelectedPhoto(photo)}
                  />
                  <div className="flex-grow flex justify-between items-start min-w-0">
                    <div className="flex-grow min-w-0">
                      <p className="font-bold text-lg text-gray-900 truncate">
                        {photo.photographer}
                      </p>
                      <p className="text-gray-600 mt-1 text-sm">
                        {photo.alt_text}
                      </p>
                      <ColorSwatch color={photo.avg_color || "#FFFFFF"} />
                    </div>
                    <a
                      href={photo.photographer_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-500 flex-shrink-0 flex items-center gap-1.5 text-sm ml-4"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                      </svg>
                      Portfolio
                    </a>
                  </div>
                </div>
              )
            })}
        </div>
      </div>

      <PhotoModal
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
    </div>
  )
}

export default PhotoFeed
