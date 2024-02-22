import { fetchRecipeById } from '@/app/lib/data';
import { Ingredient, Recipe } from '@/app/lib/definitions';
import { formatDateToLocal } from '@/app/lib/utils';
import Breadcrumbs from '@/app/ui/dashboard/breadcrumbs';
import { MarkFavorite, UpdateRecipe } from '@/app/ui/dashboard/buttons';
import ImageFromDB from '@/app/ui/dashboard/image';
import { alegreyaSansSC } from '@/app/ui/fonts';
import { Binary } from 'mongodb';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'View Recipe',
  description: 'See all the details on a recipe you have recorded.',
};

export default async function Page({ params }: { params: { id: string } }) {
  const recipeId = params.id;
  const recipe = (await fetchRecipeById(recipeId)) || ({} as Recipe);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Overview', href: '/dashboard' },
          {
            label: 'View Recipes',
            href: '/dashboard/recipes',
          },
          {
            label: recipe.name,
            href: `/dashboard/recipes/${recipe.id}`,
            active: true,
          },
        ]}
      />
      <div className="mx-auto flex flex-col items-center md:w-4/5 xl:w-1/2">
        <UpdateRecipe id={recipe.id} name={recipe.name} />
        <ImageFromDB
          image={{
            type: recipe.image.type,
            data: recipe.image.data.toString('base64'),
          }}
          altText={`Hero Image for ${recipe.name}`}
          className="mx-auto mt-2 rounded-md object-cover print:h-64 print:w-1/2 lg:w-2/3"
          width={800}
          height={600}
        />
        <div
          id="details"
          className="flex w-full items-center justify-evenly gap-2 p-2 text-lg"
        >
          <div className="mt-2 flex flex-col items-center justify-center">
            <span className={`${alegreyaSansSC.className} text-lg font-bold`}>
              Date Added
            </span>
            <span>{formatDateToLocal(recipe.dateAdded)}</span>
          </div>
          <div className="mt-2 flex flex-col items-center justify-center">
            <span className={`${alegreyaSansSC.className} text-lg font-bold`}>
              Cook Time
            </span>
            <span>{recipe.cookTime / 60} mins</span>
          </div>
          <MarkFavorite id={recipe.id} status={recipe.favorite} />
        </div>
        <p id="servings" className="mt-2 rounded-md bg-peach_yellow p-2">
          Makes <span className="text-xl font-bold">{recipe.servings}</span>{' '}
          servings
        </p>
        <h2 className={`${alegreyaSansSC.className} mt-4 text-2xl font-bold`}>
          Ingredients:
        </h2>
        <div
          id="ingredients"
          className="mx-auto w-full rounded-md bg-mint_cream p-2"
        >
          <ul className="flex w-full flex-col divide-y-2 divide-peach_yellow print:divide-y-0 print:text-sm">
            {recipe.ingredients.map((ingredient: Ingredient) => (
              <li
                key={ingredient.name}
                className="mx-auto flex w-full justify-evenly py-2 font-bold print:py-0 md:w-2/3"
              >
                <span className="w-1/2">{ingredient.name}:</span>
                <span className="w-1/2">
                  {ingredient.amount} {ingredient.unit}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <h2 className={`${alegreyaSansSC.className} mt-4 text-2xl font-bold`}>
          Instructions:
        </h2>
        <div className="text-lg">
          {recipe.instructions.split('\n').map((line, index) => (
            <p key={index} className="mt-4">
              {line}
            </p>
          ))}
        </div>
      </div>
    </main>
  );
}
