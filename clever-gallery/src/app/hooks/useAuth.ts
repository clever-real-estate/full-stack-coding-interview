"use client";

import { useEffect, useState } from "react";

export function useAuth() {
  const [user, setUser] = useState<
    { email: string; uid: string } | null | undefined
  >(undefined);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    fetch("/api/me", {
      credentials: "include",
    })
      .then(async (res) => {
        if (!res.ok) return setUser(null);
        const data = await res.json();
        setUser(data);
      })
      .finally(() => setloading(false));
  }, []);

  return { user, loading };
}
