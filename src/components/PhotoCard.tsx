import StarFill from '../assets/star-fill.svg';
import StarLine from '../assets/star-line.svg';

import link from '../assets/links.svg';

type Photo = {
    id: number;
    alt: string;
    photographer: string;
    photographer_url: string;
    avg_color: string;
    src: {
        medium: string;
    };
    url: string;
    isFavourite: boolean
};

type Props = {
    data: Photo;
    isFavorite: boolean;
    onToggleFavorite: () => void;
};

const PhotoCard = ({ data, isFavorite, onToggleFavorite }: Props) => {
    return (
        <div className="flex items-start gap-3 p-3 rounded-md shadow-sm">
            <button onClick={onToggleFavorite} aria-label="Toggle favorite">
                <img
                    src={isFavorite ? StarFill : StarLine}
                    alt={isFavorite ? "Favorited" : "Not favorited"}
                    className="w-5 h-5 text-yellow-300"
                />
            </button>
            <img src={data.src.medium} alt={data.alt} className="w-[75px] h-[75px] object-cover rounded-md" />
            <div className="flex flex-col justify-between flex-1 min-w-0 text-sm">
                <p className="font-bold truncate">{data.photographer}</p>
                <p className="line-clamp-2 break-words">{data.alt}</p>
                <div className="flex items-center gap-2">
                    <p className="truncate">{data.avg_color}</p>
                    <div
                        className="w-4 h-4 rounded-sm shrink-0"
                        style={{ backgroundColor: data.avg_color }}
                    ></div>
                </div>
            </div>
            <a href={data.photographer_url} target="_blank" rel="noopener noreferrer" className="text-customBlue text-sm hover:underline ml-2 whitespace-nowrap flex gap-1">
                <img
                    src={link}
                    alt="Link"
                    className="w-5 h-5"
                />
                Portfolio
            </a>
        </div>
    );
};

export default PhotoCard;
