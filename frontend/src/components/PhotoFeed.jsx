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
        <div className="flex justify-between items-start mb-10">
          <div className="flex flex-col items-start gap-2">
            <div className="h-16 w-16 flex items-center justify-center flex-shrink-0">
              <img src="/logo.svg" alt="Logo" className="h-16 w-16" />
            </div>
            <h1 className="text-xl font-bold">All photos</h1>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md text-sm font-semibold flex-shrink-0 fill-left-to-right fill-danger"
          >
            <span>Logout</span>
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
                    className="w-8 h-8 flex items-center justify-center flex-shrink-0"
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
                      className="text-blue-600 hover:text-blue-500 flex-shrink-0 flex items-center gap-1.5 text-xs ml-4"
                    >
                      <img src="/links.svg" alt="External link" className="h-3 w-3" />
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
