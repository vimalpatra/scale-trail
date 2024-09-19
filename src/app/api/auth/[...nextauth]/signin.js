import { getProviders, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function SignIn({ providers }) {
  const router = useRouter();

  const handleSignIn = (providerId) => {
    signIn(providerId, { callbackUrl: '/app/dashboard' });
  };

  return (
    <div>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => handleSignIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
