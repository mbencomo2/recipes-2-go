'use client';

import { Recipe } from '@/app/lib/definitions';
import { MarkFavorite } from '../buttons';
import Link from 'next/link';
import ImageFromDB from '../image';

export default function TableRow({ recipe }: { recipe: Recipe }) {
  return (
    <div className="flex w-full items-center justify-evenly transition-colors duration-300 first-of-type:rounded-t-md last-of-type:rounded-b-md hover:bg-gray-200">
      <Link
        href={`/dashboard/recipes/${recipe.id}`}
        className="flex w-3/4 items-center justify-evenly text-lg"
      >
        <div className="flex w-1/3 items-center justify-center px-3 py-3">
          <ImageFromDB
            image={recipe.thumbnail}
            className="mr-2 aspect-square rounded-full object-cover drop-shadow-lg"
            width={120}
            height={120}
            altText={`${recipe.name} Thumbnail`}
          />
        </div>
        <div className="flex w-1/3 justify-center px-3 py-3">
          <span className="truncate">{recipe.name}</span>
        </div>
        <div className="w-1/3 px-3 py-3">
          {Math.floor(recipe.cookTime / 60)} mins
        </div>
      </Link>
      <div className="w-1/4 px-3 py-3">
        <MarkFavorite id={recipe.id} status={recipe.favorite} />
      </div>
    </div>
  );
}

export function MobileRow({ recipe }: { recipe: Recipe }) {
  return (
    <div className="w-full p-4 transition-colors duration-300 first-of-type:rounded-t-md last-of-type:rounded-b-md hover:bg-gray-200">
      <div className="flex w-full justify-end">
        <MarkFavorite id={recipe.id} status={recipe.favorite} />
      </div>
      <Link
        href={`/dashboard/recipes/${recipe.id}`}
        className="flex flex-col items-center justify-between pb-4 text-lg"
      >
        <ImageFromDB
          image={recipe.thumbnail}
          className="aspect-square rounded-full object-cover drop-shadow-lg"
          width={120}
          height={120}
          altText={`${recipe.name} Thumbnail`}
        />
        <p className="text-md flex w-full justify-center px-3 pt-2 text-center text-gray-500">
          <span className="w-4/5 truncate">{recipe.name}</span>
        </p>
        <p className="text-md px-3 pt-2 text-gray-500">
          {Math.floor(recipe.cookTime / 60)} mins
        </p>
      </Link>
    </div>
  );
}
