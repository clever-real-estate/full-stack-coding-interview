"use client";

import { JSX, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import { AuthService } from "../services/AuthService";

export default function WithAuthentication(
  WrappedComponent: () => JSX.Element
) {
  const Wrapper = (props: any) => {
    const router = useRouter();
    const { user } = useAuth();
    const [loading, setloading] = useState(true);
    useEffect(() => {
      const verifySession = async () => {
        if (user === null) {
          AuthService.logout(router);
        }
        if (user?.uid) {
          setloading(false);
        }
      };
      verifySession();
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
