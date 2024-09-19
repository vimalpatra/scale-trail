// src/components/Navigation.js
'use client';

import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import UserProfileIcon from './UserProfileIcon';
import { landingPageContent } from '@/content/landingPageContent';
import { ROUTES } from '@/constants/routes';

export default function Navigation() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const handleSignIn = () => {
    signIn('google', { callbackUrl: ROUTES.DASHBOARD });
  };
  const isOnboarding = pathname === ROUTES.ONBOARDING;

  return (
    <nav className="flex items-center">
      {status === 'authenticated' && !isOnboarding && (
        <>
          <Link
            href={ROUTES.DASHBOARD}
            className="mr-4 text-gray-600 hover:text-gray-900"
          >
            {landingPageContent.navigation.dashboard}
          </Link>
          <Link
            href={ROUTES.DOCUMENTS}
            className="mr-4 text-gray-600 hover:text-gray-900"
          >
            Documents
          </Link>
        </>
      )}
      {status === 'authenticated' && (
        <>
          <button
            onClick={() => signOut({ callbackUrl: ROUTES.HOME })}
            className="mr-4 text-red-500 hover:text-red-700"
          >
            {landingPageContent.navigation.signOut}
          </button>
          <UserProfileIcon user={session.user} />
        </>
      )}
    </nav>
  );
}
