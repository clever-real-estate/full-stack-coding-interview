import { useState, useEffect } from 'react';
import PhotoCard from '../components/PhotoCard';
import Logo from '../assets/logo.svg';
import { apiFetchPhotos, apiSaveFavouritePhoto } from '../utils/utils';

const Home = () => {
    const [favorites, setFavorites] = useState<string[]>([]);
    const [photos, setPhotos] = useState<any[]>([]);

    const toggleFavorite = (id: string) => {
        apiSaveFavouritePhoto(id);

        setFavorites((prev) =>
            prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
        );
    };

    useEffect(() => {
        apiFetchPhotos()
            .then((photos) => {
                setPhotos(photos);
                const favs = photos
                    .filter((item: any) => item.isFavourite)
                    .map((item: any) => item._id);

                setFavorites(favs);
            })
            .catch(console.error);
    }, []);

    return (
        <div className="min-h-screen bg-white flex justify-center my-10 px-4">
            <div className="w-full max-w-[500px] mx-auto">
                <img src={Logo} alt="Logo" className="h-[75px] w-[75px] mb-4" />
                <h2 className="text-xl font-bold text-customBlack text-left mb-6">
                    All Photos
                </h2>
                <div className="space-y-4">
                    {photos.slice(0, 10).map((photo) => (
                        <PhotoCard
                            key={photo.id}
                            data={photo}
                            isFavorite={favorites.includes(photo._id)}
                            onToggleFavorite={() => toggleFavorite(photo._id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
