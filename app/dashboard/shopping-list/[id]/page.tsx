import { fetchShoppingListById } from '@/app/lib/data';
import { Ingredient, ShoppingList } from '@/app/lib/definitions';
import { formatDateToLocal } from '@/app/lib/utils';
import Breadcrumbs from '@/app/ui/dashboard/breadcrumbs';
import { UpdateShoppingList } from '@/app/ui/dashboard/buttons';
import { alegreyaSansSC } from '@/app/ui/fonts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'View Shopping List',
  description: 'Detailed view of a shopping list you have created.',
};

export default async function Page({ params }: { params: { id: string } }) {
  const shoppingList =
    (await fetchShoppingListById(params.id)) || ({} as ShoppingList);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Overview', href: '/dashboard' },
          {
            label: 'View Shopping Lists',
            href: '/dashboard/shopping-list',
          },
          {
            label: `${shoppingList.name}`,
            href: `/dashboard/shopping-list/${params.id}`,
            active: true,
          },
        ]}
      />
      <div className="mx-auto flex flex-col items-center print:w-full md:w-4/5 xl:w-1/2">
        <UpdateShoppingList id={shoppingList.id} name={shoppingList.name} />
        <div
          id="details"
          className="flex w-full justify-center gap-2 p-2 text-xl"
        >
          <div className="mt-2 flex flex-col items-center">
            <span className={`${alegreyaSansSC.className} font-bold`}>
              Date:
            </span>
            <span>{formatDateToLocal(shoppingList.dateAdded)}</span>
          </div>
        </div>
        <ShoppingListDetails shoppingList={shoppingList} />
      </div>
    </main>
  );
}

function ShoppingListDetails({ shoppingList }: { shoppingList: ShoppingList }) {
  return (
    <div className="mx-auto w-full rounded-md bg-mint_cream p-2 text-center print:w-1/2">
      <h2 className={`${alegreyaSansSC.className} mt-4 text-3xl font-bold`}>
        Makes:
      </h2>
      <ul className="w-full divide-y-2 divide-peach_yellow">
        {shoppingList.matched_recipes?.length ? (
          shoppingList.matched_recipes.map(
            (recipe: { id: string; name: string }, index: number) => (
              <RecipeRow key={index} name={recipe.name} />
            ),
          )
        ) : (
          <li className="mx-auto flex justify-evenly font-bold print:w-full md:w-2/3">
            No Recipes Found
          </li>
        )}
      </ul>
      <h2 className={`${alegreyaSansSC.className} mt-4 text-3xl font-bold`}>
        You Need:
      </h2>
      <ul className="flex w-full flex-col divide-y-2 divide-peach_yellow print:divide-y-0 print:text-sm">
        {shoppingList.ingredients.length > 0 ? (
          shoppingList.ingredients.map(
            (ingredient: Ingredient, index: number) => (
              <IngredientsRow key={index} ingredient={ingredient} />
            ),
          )
        ) : (
          <li className="mx-auto flex justify-evenly font-bold print:w-full md:w-2/3">
            No Ingredients Found
          </li>
        )}
      </ul>
      <p>* Note that the above amounts are estimated.</p>
    </div>
  );
}

function RecipeRow({ name }: { name: string }) {
  return (
    <li className="mx-auto flex w-full justify-evenly py-2 text-lg font-bold print:py-0 md:w-2/3">
      {name}
    </li>
  );
}

function IngredientsRow({ ingredient }: { ingredient: Ingredient }) {
  return (
    <li className="mx-auto flex w-full justify-evenly py-2 font-bold print:py-0 md:w-2/3">
      <span className="w-1/2 text-left">{ingredient.name}:</span>
      <span className="w-1/2">
        {ingredient.amount} {ingredient.unit}
      </span>
    </li>
  );
}
