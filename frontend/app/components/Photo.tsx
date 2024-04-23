import React from 'react'
import Image from "next/image";
import Link from 'next/link';

export function Photo({photo}: {photo: any}) {
    const likeDislikePhoto = async (photo_id: number) => {
        const user_token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8000/photos/${photo_id}/like/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${user_token}`
            },
        });
    
        if (response.ok) {
            alert('Photo liked')
        }else{
            const error = await response.json()
            alert(error.detail)
        }
    }   

  return (
    <div className='flex gap-2 mt-5'>
        <div>
            <Image onClick={() => likeDislikePhoto(photo.id)} 
                src="star-fill.svg" alt="star user liked" width={50} height={50} />
            <Image onClick={() => likeDislikePhoto(photo.id)} 
                src="star-line.svg" alt="star user not liked" width={50} height={50} />
        </div>
        <div>
          <Image src={photo.src_original} alt={photo.alt} width={350} height={200} />
        </div>
        <div className='flex justify-between flex-1'>
            <div className='flex flex-col'>
                <span className='font-bold text-lg'>{photo.photographer}</span>    
                <span className='text-lg'>{photo.alt}</span>    
                <div className='flex'>
                    <span className={`text-[${photo.avg_color}] text-md`}>{photo.avg_color}</span>
                    <div className={`w-[100px] h-[100px] bg-[${photo.avg_color}]`}></div>
                </div>    
            </div>
            <div>
                <Link className="text-blue-500 flex gap-1" href={`${photo.photographer_url}`}>
                    <Image src="links.svg" alt="portfolio link" width={20} height={20} />
                    <span className='text-xl'>Portfolio</span>
                </Link>
            </div>
        </div>
       
    </div>
  )
}

