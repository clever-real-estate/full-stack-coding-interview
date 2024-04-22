import Head from "next/head";
import PhotoList from "./PhotoList";


export const metadata = {
  title: 'Photos List Page',
  description: 'Photos',
  keywords: 'Clever, photos, list, page, rent',  
}

async function getPhotos() {
    let token: string | null = ""
    if (typeof window !== 'undefined') {
        token = window.localStorage.getItem('token')
    }

    console.log("token", token)

    const response = await fetch('http://localhost:8000/photos/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Token ${token}`
        },
    })

    const data = await response.json()
    console.log("resp_json", data)

    if (!response.ok) {
        throw new Error('Error fetching photos');
    }

    const photos = await response.json()
    return photos
}


const Page = async () => {
  const photos = await getPhotos();

  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
      </Head>
      <PhotoList photos={photos}/>
    </>
  )
}

export default Page;
