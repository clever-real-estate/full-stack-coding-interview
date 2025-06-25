"use client";

import { JSX, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";

export default function ByPassLogin(WrappedComponent: () => JSX.Element) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Wrapper = (props: any) => {
    const router = useRouter();
    const pathname = usePathname();
    const { user } = useAuth();
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
      const verifyToken = async () => {
        if (user === null) {
          if (pathname !== "/login") {
            router.replace("/login");
          } else {
            setLoading(false);
          }
        }
        if (user?.uid) {
          router.replace("/photos");
        }
      };
      verifyToken();
    }, [user]);

    return loading ? (
      <div className="flex w-screen h-screen justify-center items-center">
        <div>Loading...</div>
      </div>
    ) : (
      <WrappedComponent {...props} />
    );
  };
  return Wrapper;
}
