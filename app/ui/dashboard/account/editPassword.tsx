'use client';
import { updatePassword } from '@/app/lib/actions';
import { ExclamationCircleIcon, KeyIcon } from '@heroicons/react/24/outline';
import { useFormState } from 'react-dom';

export default function EditPassword({ userId }: { userId: string }) {
  const [errorMessage, dispatch] = useFormState(updatePassword, undefined);
  return (
    <form action={dispatch}>
      <input type="hidden" name="userId" value={userId} className="hidden" />
      <div className="mt-4">
        <label
          className=" relative mb-3 mt-5 block text-xs font-medium text-gray-900"
          htmlFor="password"
        >
          Password
          <input
            className="peer block w-full rounded-md border border-bistre-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
            id="password"
            type="text"
            name="password"
            placeholder="Enter password"
            required
            minLength={8}
          />
          <KeyIcon className="pointer-events-none absolute left-3 top-9 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </label>
      </div>
      <div className="mt-4">
        <label
          className="relative mb-3 mt-5 block text-xs font-medium text-gray-900"
          htmlFor="verify"
        >
          Re-enter Password
          <input
            className="peer block w-full rounded-md border border-bistre-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
            id="verify"
            type="password"
            name="verify"
            placeholder="Verify password"
            required
            minLength={8}
          />
          <KeyIcon className="pointer-events-none absolute left-3 top-9 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </label>
        <button
          type="submit"
          className="my-2 flex w-full justify-center gap-4 rounded-md bg-peach_yellow py-2 font-bold text-bistre drop-shadow-lg hover:bg-peach_yellow-700"
        >
          Edit Password <KeyIcon className="h-5 w-5" />
        </button>
      </div>
      {errorMessage && (
        <div className={`flex justify-center gap-2 text-red-500`}>
          <ExclamationCircleIcon className={`h-5 w-5`} />
          {errorMessage}
        </div>
      )}
    </form>
  );
}
