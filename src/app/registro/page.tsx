'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RegistroPage() {
  const router = useRouter();

  useEffect(() => {
    // Ao carregar esta página, redireciona imediatamente para /login
    router.replace('/login');
  }, [router]);

  return null;
}
