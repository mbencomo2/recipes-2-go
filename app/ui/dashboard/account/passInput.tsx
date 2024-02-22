import { EyeIcon, KeyIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function PasswordInput({
  name,
  label,
  minLength,
}: {
  name: string;
  label: string;
  minLength: number;
}) {
  const [showPass, setShowPass] = useState(false);
  return (
    <div className="mt-4">
      <label
        className="mb-3 mt-5 block text-xs font-medium text-gray-900"
        htmlFor={name}
      >
        {label}
      </label>
      <div className="relative">
        <input
          className="peer block w-full rounded-md border border-bistre-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
          id={name}
          type={showPass ? 'text' : 'password'}
          name={name}
          placeholder="Enter password"
          required
          minLength={minLength}
        />
        <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        <EyeIcon
          className={`${showPass ? 'text-gray-900' : 'text-gray-500'} peer-focust:text-gray-900 absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500`}
          onClick={() => setShowPass(!showPass)}
          aria-label="Show Password"
        />
      </div>
    </div>
  );
}
