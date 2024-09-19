'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { landingPageContent } from '@/content/landingPageContent';

export default function SignIn() {
  const router = useRouter();

  const handleSignIn = async () => {
    const result = await signIn('google', {
      callbackUrl: ROUTES.ONBOARDING,
      redirect: false,
    });
    if (result?.error) {
      console.error(result.error);
    } else if (result?.url) {
      router.push(result.url);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <button
        onClick={handleSignIn}
        className="rounded bg-[#ff8300] px-6 py-2 text-white hover:bg-[#e67600]"
      >
        {landingPageContent.navigation.signIn}
      </button>
    </div>
  );
}
