import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth/verifySession";
import { AuthError } from "@/lib/auth/AuthError";

const DJANGO_API = process.env.NEXT_PUBLIC_DJANGO_API!;

export async function POST(req: NextRequest) {
  try {
    const { token } = await getAuthenticatedUser();
    const { photoId } = await req.json();

    if (!photoId) {
      return NextResponse.json({ error: "Photo ID is required" }, { status: 400 });
    }

    const res = await fetch(`${DJANGO_API}/api/favorites/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ photo: photoId }),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: 401 });
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { token } = await getAuthenticatedUser();
    const photoId = req.nextUrl.searchParams.get("photoId");

    if (!photoId) {
      return NextResponse.json({ error: "Photo ID is required" }, { status: 400 });
    }

    const url = new URL(`${DJANGO_API}/api/favorites/`);

    const res = await fetch(`${url.toString()}?photo_id=${photoId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json(errorData, { status: res.status });
    }

    return NextResponse.json({ message: "Favorite removed" }, { status: 200 });
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: 401 });
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
