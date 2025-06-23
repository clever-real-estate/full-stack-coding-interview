import { Photo } from "@/app/model/Photo";
import { AuthError } from "@/lib/auth/AuthError";
import { getAuthenticatedUser } from "@/lib/auth/verifySession";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    await getAuthenticatedUser();
    const mockPhotos: Photo[] = [
      {
        id: "21751820",
        isFavorite: true,
        imageUrl:
          "https://images.pexels.com/photos/21751820/pexels-photo-21751820.jpeg?auto=compress&cs=tinysrgb&h=350",
        photographer: "Felix",
        title: "A small island surrounded by trees in the middle of a lake",
        hexColor: "#333831",
        portfolioUrl: "https://www.pexels.com/@felix-57767809",
      },
      {
        id: "21405575",
        isFavorite: false,
        imageUrl:
          "https://images.pexels.com/photos/21405575/pexels-photo-21405575.jpeg?auto=compress&cs=tinysrgb&h=350",
        photographer: "Centre for Ageing Better",
        title: "Two older people cycling",
        hexColor: "#6D755E",
        portfolioUrl:
          "https://www.pexels.com/@centre-for-ageing-better-55954677",
      },
    ];

    const res = NextResponse.json({
      message: "Get photos",
      photos: mockPhotos,
    });

    return res;
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: 401 });
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
