'use client';

import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
  PencilIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline';
import { useFormState, useFormStatus } from 'react-dom';
import { CreateUser } from '@/app/lib/actions';
import { alegreyaSansSC } from '../fonts';
import { Button } from '../button';
import Link from 'next/link';
import PasswordInput from '../dashboard/account/passInput';

export default function RegisterForm() {
  const [errorMessage, dispatch] = useFormState(CreateUser, undefined);
  return (
    <form action={dispatch} className="space-y-3">
      <div className="flex-1 rounded-md bg-mint_cream px-6 pb-4 pt-8 drop-shadow-lg">
        <h1 className={`${alegreyaSansSC.className} mb-3 text-2xl`}>
          Create an account with us!
        </h1>
        <div className="w-full">
          <div>
            <label
              htmlFor="name"
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
            >
              Your Name
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-bistre-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="name"
                type="text"
                name="name"
                placeholder="Enter your Name"
                required
              />
              <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-bistre-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <PasswordInput name="password" label="Password" minLength={8} />
          <PasswordInput name="verify" label="Verify Password" minLength={8} />
        </div>
        <RegisterButton />
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
        <p className="text-center">
          Already have an account?{' '}
          <Link href={'/login'} className="text-lg underline">
            Log in here.
          </Link>
        </p>
      </div>
    </form>
  );
}

function RegisterButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      Create Account <PlusCircleIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
