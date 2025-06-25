import { serialize } from "cookie";
import { NextResponse } from "next/server";

export async function POST() {
  const expiredCookie = serialize("session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  const res = NextResponse.json({ message: "Logged out" });
  res.headers.set("Set-Cookie", expiredCookie);

  return res;
}
