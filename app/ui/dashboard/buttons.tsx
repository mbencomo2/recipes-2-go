'use client';

import {
  deleteRecipe,
  deleteShoppingList,
  markFavorite,
} from '@/app/lib/actions';
import { PlusIcon } from '@heroicons/react/24/outline';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { StarIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { cormorantInfant } from '../fonts';

export function CreateRecipe() {
  return (
    <Link
      href="/dashboard/recipes/new"
      className="flex h-10 items-center justify-center rounded-lg bg-peach_yellow px-4 text-lg font-bold text-bistre drop-shadow-lg transition-colors hover:bg-peach_yellow-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="sm:hidden lg:block">Create Recipe</span>{' '}
      <PlusIcon className="h-5 lg:ml-4" />
    </Link>
  );
}

export function CreateShoppingList() {
  return (
    <Link
      href="/dashboard/shopping-list/new"
      className="flex h-10 items-center justify-center rounded-lg bg-peach_yellow px-4 text-lg font-bold text-bistre drop-shadow-lg transition-colors hover:bg-peach_yellow-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="sm:hidden lg:block">Create List</span>{' '}
      <PlusIcon className="h-5 lg:ml-4" />
    </Link>
  );
}

export function MarkFavorite({
  id,
  status,
}: {
  id: string;
  status: boolean | undefined;
}) {
  return (
    <button
      onClick={() => markFavorite(id, !status)}
      className="rounded-md drop-shadow-lg hover:bg-gray-300"
    >
      <span className="sr-only">Mark as favorite</span>
      <StarIcon
        className={`mx-auto w-12 p-2 ${status ? 'text-yellow-500' : 'text-gray-500'}`}
      />
    </button>
  );
}

export function UpdateRecipe({ id, name }: { id: string; name: string }) {
  return (
    <Link
      href={`/dashboard/recipes/${id}/edit`}
      className="flex w-full items-center justify-center gap-4 border-b-2 border-bistre hover:text-blue-600"
    >
      <h1
        className={`${cormorantInfant.className} mb-4 text-center text-4xl font-bold`}
      >
        {name}
      </h1>
      <PencilIcon className="w-8 pb-2 print:hidden" />
    </Link>
  );
}

export function UpdateShoppingList({ id, name }: { id: string; name: string }) {
  return (
    <Link
      href={`/dashboard/shopping-list/${id}/edit`}
      className="flex w-full items-center justify-center gap-4 border-b-2 border-bistre hover:text-blue-600"
    >
      <h1
        className={`${cormorantInfant.className} mb-4 text-center text-4xl font-bold`}
      >
        {name}
      </h1>
      <PencilIcon className="w-8 pb-2 print:hidden" />
    </Link>
  );
}

export function DeleteRecipe({ id }: { id: string }) {
  const deleteRecipeWithId = deleteRecipe.bind(null, id);
  return (
    <form action={deleteRecipeWithId}>
      <button className="mx-auto mt-8 flex w-full items-center justify-center rounded-md bg-red-700 p-2 text-lg text-white drop-shadow-lg hover:bg-gray-300 hover:text-bistre lg:w-2/3">
        <span>Delete Recipe</span>
        <TrashIcon className="w-8" />
      </button>
    </form>
  );
}

export function DeleteShoppingList({ id }: { id: string }) {
  const deleteListWithId = deleteShoppingList.bind(null, id);
  return (
    <form action={deleteListWithId}>
      <button className="mx-auto mt-8 flex w-full items-center justify-center rounded-md bg-red-700 p-2 text-lg text-white drop-shadow-lg hover:bg-gray-300 hover:text-bistre lg:w-2/3">
        <span>Delete Shopping List</span>
        <TrashIcon className="w-8" />
      </button>
    </form>
  );
}
