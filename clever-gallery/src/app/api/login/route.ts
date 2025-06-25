import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";
import { adminAuth } from "@/app/firebase/firebaseAdmin";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const firebaseApiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY!;
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseApiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, returnSecureToken: true }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error?.message || "Authentication error" },
        { status: 401 }
      );
    }

    const idToken = data.idToken;

    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn: 60 * 60 * 24 * 5 * 1000, // 5 days
    });

    const res = NextResponse.json({ message: "Successful login" });
    res.headers.set(
      "Set-Cookie",
      serialize("session", sessionCookie, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 5,
      })
    );

    return res;
  } catch(e: unknown) {
    console.log(e)
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
