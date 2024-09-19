'use client';

import Image from 'next/image';
import Link from 'next/link';
import { landingPageContent } from '@/content/landingPageContent';
import Navigation from './Navigation';

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-white p-4 shadow-sm">
      <Link href="/">
        <Image
          src="/assets/scaletrail-logo.png"
          alt={landingPageContent.logoAlt}
          width={120}
          height={40}
          style={{ height: '40px', width: 'auto' }}
          priority
        />
      </Link>
      <Navigation />
    </header>
  );
}
