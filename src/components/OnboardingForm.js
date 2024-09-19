'use client';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { landingPageContent } from '@/content/landingPageContent';
import { ROUTES } from '@/constants/routes';
import EnhancedUpload from './EnhancedUpload';

export default function OnboardingForm() {
  const router = useRouter();
  const [industry, setIndustry] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!industry) {
      setError('Please select an industry.');
      return;
    }

    if (!description && !file) {
      setError('Please either describe your idea or upload a file.');
      return;
    }

    localStorage.setItem(
      'tempOnboardingData',
      JSON.stringify({ industry, description, file: file ? file.name : null })
    );

    signIn('google', { callbackUrl: ROUTES.ONBOARDING });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 w-full max-w-md space-y-4">
      <Select onValueChange={setIndustry}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="What type of business or industry are you in?" />
        </SelectTrigger>
        <SelectContent>
          {landingPageContent.industryOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <EnhancedUpload
        onFileChange={setFile}
        onDescriptionChange={setDescription}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <Button
        type="submit"
        className="w-full bg-[#ff8300] text-white hover:bg-[#e67600]"
        size="lg"
      >
        Start Now
      </Button>
    </form>
  );
}
