import { cookies } from "next/headers";
import { adminAuth } from "@/app/firebase/firebaseAdmin";
import { AuthError } from "./AuthError";

export async function getAuthenticatedUser() {
  const sessionCookie = (await cookies()).get("session")?.value;

  if (!sessionCookie) {
    throw new AuthError("Missing session cookie");
  }

  try {
    const decodedToken = await adminAuth.verifySessionCookie(
      sessionCookie,
      true
    );
    return { decodedToken, token: sessionCookie };
  } catch {
    throw new AuthError("Invalid or expired session cookie");
  }
}
