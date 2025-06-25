import { Photo, PhotoResponse } from "@/app/model/Photo";
import { AuthError } from "@/lib/auth/AuthError";
import { getAuthenticatedUser } from "@/lib/auth/verifySession";
import { NextResponse } from "next/server";

const DJANGO_API = process.env.NEXT_PUBLIC_DJANGO_API!;

export async function GET() {
  try {
    const { token } = await getAuthenticatedUser();
    const res = await fetch(`${DJANGO_API}/api/photos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch photos" }, { status: res.status });
    }

    const data = await res.json();

    return NextResponse.json({photos: data.map((photo: PhotoResponse) => ({
      id: photo.id,
      isFavorite: photo.is_favorite,
      imageUrl: photo.image_url,
      photographer: photo.photographer,
      title: photo.alt,
      hexColor: photo.avg_color,
      portfolioUrl: photo.photographer_url,
    })) as Photo});

    return res;
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: 401 });
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
