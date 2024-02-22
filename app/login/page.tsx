import LoginForm from '@/app/ui/login-form';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '../ui/logo';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Log in as a returning user to Recipes2Go.',
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 ">
        <Link
          href={'/'}
          className="flex h-24 w-full items-center overflow-hidden rounded-md bg-atomic_tangerine p-3 ring-4 ring-atomic_tangerine drop-shadow-lg md:h-32"
        >
          <Logo />
        </Link>
        <LoginForm />
      </div>
    </main>
  );
}
