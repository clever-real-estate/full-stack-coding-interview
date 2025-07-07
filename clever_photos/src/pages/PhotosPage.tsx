import { PhotoList } from "../components/photos/PhotoList";
import { useAuth } from "../hooks/useAuth";

export const PhotosPage = () => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen dark:bg-gray-900 bg-gray-50 flex flex-col items-center py-4 px-3 sm:px-4 md:px-8">
      <div className="flex flex-col items-center w-full max-w-4xl md:max-w-3xl sm:max-w-xl mx-auto">
        <div className="w-full flex justify-end mb-2 sm:mb-4">
          <button
            className="px-3 py-1.5 sm:px-4 sm:py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors cursor-pointer text-sm sm:text-base"
            onClick={() => logout()}
          >
            Logout
          </button>
        </div>
        <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-500 mb-4 sm:mb-6">
          <span className="text-white text-3xl sm:text-4xl font-bold italic">
            CP
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 w-full text-left dark:text-white text-black">
          All photos
        </h1>
        <PhotoList />
      </div>
    </div>
  );
};
