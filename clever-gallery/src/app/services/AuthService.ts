export class AuthService {
  static async auth({ email, password }: { email: string; password: string }) {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    console.log({ res });

    if (!res.ok) {
      const data = await res.json();
      switch (data.error) {
        case "INVALID_LOGIN_CREDENTIALS":
          throw new Error("Incorrect password");
        case "TOO_MANY_ATTEMPTS_TRY_LATER":
          throw new Error("Too many attempts. Try later.");
        default:
          throw new Error(data.error || "Login error");
      }
    }
  }

  static async logout(router: any) {
    const res = await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    });

    if (res.ok) {
      router.push("/login");
    } else {
      const data = await res.json();
      throw new Error(data.error || "Logout failed");
    }
  }

  static async forgotPassword({ email }: { email: string }) {
    const res = await fetch("/api/forgotPassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Error");
    }
  }
}
