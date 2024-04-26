import React, { useState } from 'react'
import Image from "next/image";
import Link from 'next/link';
import { formatError } from '../utils';
import { isTokenExpired } from '../auth';
import { useRouter } from 'next/navigation';


export function Photo({photo}: {photo: any}) {
    const[user_liked, setUseLiked] = useState(photo.user_liked)
    const router = useRouter()

    const likeDislikePhoto = async (photo_id: number) => {
        const user_token = localStorage.getItem('token');
        if (isTokenExpired(user_token)) {
            router.push('/sign-in')
        }

        const response = await fetch(`${process.env.API_URL}/photos/${photo_id}/like/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${user_token}`
            },
        });
    
        if (response.ok) {
            const data = await response.json();
            if(data.liked){
                setUseLiked(true)
            }else {
                setUseLiked(false)
            }
        }else{
            const error = await response.json();
            const errorMessage = formatError(error);
            alert(errorMessage);
        }
    }

    const Star = ({user_liked}:{user_liked: boolean}) => {
        return (
            <div className='flex gap-3'>
                {user_liked ? 
                    <Image
                        className="cursor-pointer"
                        onClick={() => likeDislikePhoto(photo.id)} 
                        src="star-fill.svg" 
                        alt="star user liked" 
                        width={30} 
                        height={30} 
                    /> : 
                    <Image
                        className="cursor-pointer"
                        onClick={() => likeDislikePhoto(photo.id)} 
                        src="star-line.svg" 
                        alt="star user not liked" 
                        width={30} 
                        height={30} 
                    />
                }
            </div>
        )
    }

    const PortfolioWithStar = ({photo, user_liked}:{photo: any, user_liked: boolean}) => {
        return (
            <>
                <div>
                    <Link className="text-blue-500 flex gap-2" href={`${photo.photographer_url}`}>
                        <Image src="links.svg" alt="portfolio link" width={20} height={20} />
                        <span className='text-xl'>Portfolio</span>
                    </Link>
                </div>
                <div className='lg:hidden block'>
                    <Star user_liked={user_liked} />
                </div>
            </>
        )
    }

  return (
    <div className='flex gap-4 my-5 flex-wrap'>
        <div className='lg:block hidden'>
            <Star user_liked={user_liked} />
        </div>
        <div>
          <Image src={photo.src_original} alt={photo.alt} width={350} height={200} />
        </div>
        <div className='flex justify-between flex-1'>
            <div className='flex flex-col gap-2'>
                <span className='font-bold text-lg'>{photo.photographer}</span>    
                <span className='text-lg'>{photo.alt}</span>    
                <div className='flex gap-3 items-center'>
                    <span className="text-xl" style={{ color: photo.avg_color }}>{photo.avg_color}</span>
                    <div className="w-6 h-6"  style={{ backgroundColor: photo.avg_color }}></div>
                </div>

                <div className='lg:hidden flex gap-3 items-center'>
                    <PortfolioWithStar photo={photo} user_liked={user_liked} />
                </div>
            </div>
            <div className='gap-3 lg:flex hidden'>
                <PortfolioWithStar photo={photo} user_liked={user_liked} />
            </div>
        </div>
    </div>
  )
}

