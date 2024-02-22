'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useDebouncedCallback } from 'use-debounce';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { StarIcon } from '@heroicons/react/20/solid';

export default function SearchWithFavorite({
  placeholder,
  favStatus,
}: {
  placeholder: string;
  favStatus: boolean;
}) {
  const [isChecked, setIsChecked] = useState(favStatus);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleFavorites = useDebouncedCallback(() => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (isChecked) {
      params.delete('fav');
    } else {
      params.set('fav', '1');
    }
    replace(`${pathname}?${params.toString()}`);
    setIsChecked(!isChecked);
  }, 300);

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="flex flex-1 flex-col gap-2 drop-shadow-lg md:flex-row">
      <label htmlFor="searchWithId" className="relative w-full">
        <span className="sr-only">Search</span>
        <input
          className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
          name="search"
          id="searchWithId"
          placeholder={placeholder}
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get('query')?.toString()}
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </label>
      <button
        type="button"
        className={`text-md flex items-center justify-center gap-2 rounded-md bg-peach_yellow p-2 font-bold text-bistre hover:bg-brown_sugar hover:text-white`}
        onClick={() => handleFavorites()}
      >
        Favorites
        <StarIcon
          className={`${isChecked ? 'text-yellow-500' : 'text-gray-500'} w-6`}
        />
      </button>
    </div>
  );
}

export function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="flex flex-1 flex-col gap-2 drop-shadow-lg md:flex-row">
      <label htmlFor="search" className="relative w-full">
        <span className="sr-only">Search</span>
        <input
          className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
          name="search"
          id="search"
          placeholder={placeholder}
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get('query')?.toString()}
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </label>
    </div>
  );
}
