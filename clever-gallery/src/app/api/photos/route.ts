import { AuthError } from "@/lib/auth/AuthError";
import { getAuthenticatedUser } from "@/lib/auth/verifySession";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    const user = await getAuthenticatedUser();
    const res = NextResponse.json({ message: "Get photos", user });

    return res;
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: 401 });
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
