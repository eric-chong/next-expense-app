'use client';

import { useEffect } from 'react';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

export default function GoToCurrent() {
  const router = useRouter();

  useEffect(() => {
    const now = new Date();
    router.push(`/expenses/${format(now, 'yyyy/MM')}`);
  }, [router]);

  return <>Redirecting...</>;
}
