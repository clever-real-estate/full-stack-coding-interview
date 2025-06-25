import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { adminAuth } from "@/app/firebase/firebaseAdmin";

export async function GET() {
  const session = (await cookies()).get("session")?.value;

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await adminAuth.verifySessionCookie(session, true);
    return NextResponse.json({ email: user.email, uid: user.uid });
  } catch {
    return NextResponse.json({ error: "Invalid session" }, { status: 401 });
  }
}
