'use client';
import { Recipe } from '@/app/lib/definitions';
import { useState } from 'react';
import { useFormState } from 'react-dom';
import RecipeIdTable from '../recipeIdTable';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { PlusIcon } from '@heroicons/react/24/solid';

export default function CreateShoppingListForm({
  userId,
  recipes,
  dispatchFn,
}: {
  userId: string;
  recipes: Recipe[];
  dispatchFn: CallableFunction;
}) {
  const [selected, setSelected] = useState<{ id: string; name: string }[]>([]);

  const [errorMessage, dispatch] = useFormState(dispatchFn as any, undefined);

  function addSelection(recipe: { id: string; name: string }) {
    setSelected([...selected, recipe]);
  }

  function removeSelection(indexToRemove: number) {
    setSelected(selected.filter((item, index) => index !== indexToRemove));
  }
  return (
    <form
      action={dispatch}
      className="shrink-1 mx-auto flex flex-col items-center rounded-md bg-mint_cream p-2 drop-shadow-lg lg:w-2/3"
    >
      <input type="hidden" name="userId" id="userId" value={userId} readOnly />
      <input
        type="hidden"
        name="recipes"
        value={JSON.stringify(selected.map((recipe) => recipe.id))}
        readOnly
      />
      <label
        htmlFor="name"
        className="text-md mb-3 mt-5 block w-full font-bold text-gray-900 xl:w-2/3"
      >
        Name
        <input
          type="text"
          name="name"
          id="name"
          placeholder={'Give your shopping list a name'}
          className="peer block w-full rounded-md border border-bistre-200 py-[9px] text-center text-lg outline-2 placeholder:text-gray-500"
          required
        />
      </label>
      <label
        htmlFor="date"
        className="text-md mb-3 mt-5 block w-full font-bold text-gray-900 xl:w-2/3"
      >
        Date:
        <input
          type="date"
          name="date"
          id="date"
          placeholder="mm/dd/yyyy"
          className="peer block w-full rounded-md border border-bistre-200 py-[9px] text-center text-lg outline-2 placeholder:text-gray-500"
          required
        />
      </label>
      <RecipeIdTable
        recipes={recipes}
        defaultSelection={selected}
        add={addSelection}
        remove={removeSelection}
      />
      <button
        type="submit"
        className="text-large mx-auto my-4 flex w-full justify-center gap-2 rounded-md bg-peach_yellow p-2 font-bold text-bistre transition-colors hover:bg-peach_yellow-700 lg:w-1/2 "
      >
        Save Shopping List <PlusIcon className="w-5" />
      </button>
      {errorMessage && (
        <div className="mt-2 flex items-center justify-center gap-2 text-lg font-bold">
          <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
          <p className="text-lg text-red-500">{errorMessage}</p>
        </div>
      )}
    </form>
  );
}
