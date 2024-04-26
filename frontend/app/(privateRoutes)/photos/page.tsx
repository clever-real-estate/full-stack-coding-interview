"use client"

import { Photo } from "@/app/components/Photo";
import { useEffect, useState } from "react";
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { isTokenExpired } from "@/app/auth";
import { formatError } from "@/app/utils";

async function getPhotos(token: string | null) {
  const response = await fetch(`${process.env.API_URL}/photos/`, {
      method: 'GET',
      headers: {
          "Authorization": `Bearer ${token}`
      },
  });

  if (response.ok) {
    const data = await response.json();
    return data
  }else{
    const error = await response.json();
    const errorMessage = formatError(error);
    alert(errorMessage);
  }
}


export default function Page() {
  const [photos, setPhotos] = useState([]);
  const router = useRouter()
  useEffect(() => {
    const fetchData = async () => {
        const user_token = localStorage.getItem('token');
        if (isTokenExpired(user_token)) {
          router.push('/sign-in')
        }
        const photos = await getPhotos(user_token);
        setPhotos(photos);
    };

    fetchData();
}, [router]);

  return (
    <div>
      <div className="mb-3">
          <Image src={`logo.svg`} alt='Clever logo' width="100" height="100" />
      </div>
      <h1 className="font-bold text-2xl mb-5">All Photos</h1>
      {photos && photos.map((photo: any) => (
        <Photo key={photo.id} photo={photo} />
      ))}
    </div>
  )
}
