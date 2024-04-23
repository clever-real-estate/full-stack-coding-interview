"use client"

import { Photo } from "@/app/components/Photo";
import Image from "next/image";
import { useEffect, useState } from "react";


async function getPhotos(token: string | null) {
  try {
    const response = await fetch('http://localhost:8000/photos/', {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Handle the response
    const data = await response.json();
    return data
  } catch (error) {
    console.error('Error:', error);
  }

}


export default function Page() {
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
        const user_token = localStorage.getItem('token');
        const photos = await getPhotos(user_token);

        setPhotos(photos);
    };

    fetchData();
}, []);

  return (
    <div>
      <h1 className="font-bold text-2xl mb-5">All Photos</h1>
      
      {photos && photos.map((photo: any) => (
        <Photo key={photo.id} photo={photo} />
      ))}
      
    </div>
  )
}
