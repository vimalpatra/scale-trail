'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import { landingPageContent } from '@/content/landingPageContent';
import { ROUTES } from '@/constants/routes';
import { checkOnboardingStatus, saveOnboardingData } from '@/utils/onboarding';

export default function Onboarding() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(ROUTES.HOME);
    } else if (status === 'authenticated') {
      const storedData = checkOnboardingStatus();
      if (storedData && storedData.completed) {
        router.push(ROUTES.DASHBOARD);
      }
    }
  }, [status, router]);

  if (status === 'loading' || !session) {
    return <div>Loading...</div>;
  }

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setExpanded(true);
  };

  const handleContinue = () => {
    saveOnboardingData({ option: selectedOption, completed: true });
    router.push(ROUTES.DASHBOARD);
  };

  const options = [
    { id: 'store-documents', label: 'Store documents for easy access' },
    {
      id: 'create-analyze-contracts',
      label: 'Create or analyze risk-free contracts',
    },
    {
      id: 'incorporation-info',
      label: 'Get information about incorporation and legal registration',
    },
    {
      id: 'legal-question',
      label: 'Ask a legal or compliance-related question',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow p-8">
        <h1 className="mb-6 text-2xl font-bold">
          Welcome, {session.user.name}! Let's get you set up.
        </h1>
        <div className="space-y-4">
          {options.map((option) => (
            <Button
              key={option.id}
              onClick={() => handleOptionSelect(option.id)}
              variant={selectedOption === option.id ? 'default' : 'outline'}
              className="w-full justify-start text-left"
            >
              {option.label}
            </Button>
          ))}
        </div>
        {expanded && (
          <div className="mt-6 rounded-md border p-4">
            <h2 className="mb-4 text-xl font-semibold">
              {options.find((o) => o.id === selectedOption)?.label}
            </h2>
            <p className="mb-4">
              Here you can add more details or a brief explanation about the
              selected option.
            </p>
            <Button onClick={handleContinue}>Continue</Button>
          </div>
        )}
      </main>
    </div>
  );
}
