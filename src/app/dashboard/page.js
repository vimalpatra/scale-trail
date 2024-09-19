'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Header from '@/components/Header';
import { ROUTES } from '@/constants/routes';
import { checkOnboardingStatus } from '@/utils/onboarding';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(ROUTES.HOME);
    } else if (status === 'authenticated') {
      const onboardingData = checkOnboardingStatus();
      if (!onboardingData) {
        router.push(ROUTES.ONBOARDING);
      } else {
        window.history.replaceState(null, '', ROUTES.DASHBOARD);
      }
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow p-8">
        <h1 className="mb-4 text-2xl font-bold">
          Welcome to your dashboard, {session.user.name}!
        </h1>
        {/* Add more dashboard content here */}
      </main>
    </div>
  );
}
