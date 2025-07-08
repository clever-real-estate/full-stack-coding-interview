'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/utils/constants';
import { FullScreenLoading } from '@/components/shared/Loading';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        router.push(ROUTES.GALLERY);
      } else {
        router.push(ROUTES.SIGNIN);
      }
    }
  }, [isAuthenticated, loading, router]);

  return <FullScreenLoading text="Redirecting..." />;
}
