import { Metadata } from 'next';
import Image from 'next/image';
import RegisterForm from '../ui/register/register-form';
import Link from 'next/link';
import Logo from '../ui/logo';

export const metadata: Metadata = {
  title: 'Register',
  description: 'Create a new account for Recipes2Go.',
};

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4">
        <div>
          <Link
            href={'/'}
            className="flex h-24 w-full items-center overflow-hidden rounded-md bg-atomic_tangerine p-3 ring-4 ring-atomic_tangerine drop-shadow-lg md:h-32"
          >
            <Logo />
          </Link>
        </div>
        <RegisterForm />
      </div>
    </main>
  );
}
