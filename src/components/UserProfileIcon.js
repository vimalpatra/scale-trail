'use client';

export default function UserProfileIcon({ user }) {
  const initials = user.name
    .split(' ')
    .map((name) => name[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ff8300] text-sm font-bold text-white">
      {initials}
    </div>
  );
}
