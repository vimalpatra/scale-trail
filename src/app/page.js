'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Header from '@/components/Header';
import OnboardingForm from '@/components/OnboardingForm';
import BenefitCard from '@/components/BenefitCard';
import { landingPageContent } from '@/content/landingPageContent';
import { ROUTES } from '@/constants/routes';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push(ROUTES.DASHBOARD);
    }
  }, [status, router]);

  if (status === 'loading' || status === 'authenticated') {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex flex-grow flex-col items-center justify-center p-8 text-center">
        <h1 className="mb-4 text-4xl font-bold">
          {landingPageContent.headline}
        </h1>
        <p className="mb-8 text-xl">{landingPageContent.subheadline}</p>

        <OnboardingForm />

        <div className="grid w-full max-w-4xl grid-cols-1 gap-4 md:grid-cols-3">
          {landingPageContent.benefits.map((benefit, index) => (
            <BenefitCard
              key={index}
              title={benefit.title}
              description={benefit.description}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
