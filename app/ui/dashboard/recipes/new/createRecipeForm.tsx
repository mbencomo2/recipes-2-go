'use client';
import { Ingredient, Recipe } from '@/app/lib/definitions';
import {
  ExclamationCircleIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline';
import { PencilIcon, PlusIcon, StarIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import Ingredients from '../Ingredients';

export default function CreateRecipeForm({
  userId,
  dispatchFn,
}: {
  userId: string;
  dispatchFn: CallableFunction;
}) {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [checkState, setCheckState] = useState(false);

  const addIngredient = (
    newName: string,
    newAmount: number,
    newUnit: string,
  ) => {
    setIngredients([
      ...ingredients,
      { name: newName, amount: newAmount, unit: newUnit },
    ]);
  };

  const removeIngredient = (itemIndex: number) => {
    // So... apparently I have to filter because splice doesn't acually update the array
    // in a way that causes the component to re-render... bugger.
    setIngredients(
      ingredients.filter((ingredient, index) => index !== itemIndex),
    );
  };

  const [errorMessage, dispatch] = useFormState(dispatchFn as any, undefined);
  return (
    <form
      action={dispatch}
      className="shrink-1 mx-auto flex flex-col items-center rounded-md bg-mint_cream p-2 drop-shadow-lg lg:w-2/3"
    >
      <input type="hidden" name="userId" value={userId} readOnly />
      <input
        type="hidden"
        name="ingredients"
        value={JSON.stringify(ingredients)}
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
          placeholder={'Healthy Salad'}
          className="peer block w-full rounded-md border border-bistre-200 py-[9px] text-center text-lg outline-2 placeholder:text-gray-500 invalid:border-4 invalid:border-red-600"
          required
        />
      </label>
      <label
        htmlFor="image"
        className="text-md mb-3 mt-5 block w-full truncate font-bold text-gray-900 xl:w-2/3"
      >
        Image
        <input
          type="file"
          name="image"
          id="image"
          accept="image/png, image/jpeg, image/webp"
          className="peer block w-full rounded-md border py-[9px] text-lg outline-2 placeholder:text-gray-500 invalid:border-4 invalid:border-red-600"
          required
        />
      </label>
      <label
        htmlFor="favorite"
        className="text-md mx-auto mb-3 mt-5 flex items-center gap-2 self-start font-bold text-gray-900 xl:w-2/3"
      >
        Favorite:{' '}
        <StarIcon
          className={`shrink-1 w-12 p-2 ${checkState ? 'text-yellow-500' : 'text-gray-700'} rounded-md drop-shadow-lg hover:bg-gray-300`}
          onClick={() => setCheckState(!checkState)}
        />
        <input
          type="checkbox"
          name="favorite"
          id="favorite"
          className="hidden"
          checked={checkState}
          readOnly
        />
      </label>
      <label
        htmlFor="cookTime"
        className="text-md mb-3 mt-5 block w-full font-bold text-gray-900 xl:w-2/3"
      >
        Cook Time (minutes):
        <input
          type="number"
          name="cookTime"
          id="cookTime"
          step={0.1}
          placeholder={'30'}
          className="peer block w-full rounded-md border border-bistre-200 py-[9px] text-center text-lg outline-2 placeholder:text-gray-500 invalid:border-4 invalid:border-red-600"
          required
        />
      </label>
      <label
        htmlFor="servings"
        className="text-md mb-3 mt-5 block w-full font-bold text-gray-900 xl:w-2/3"
      >
        Servings:
        <input
          type="number"
          name="servings"
          id="servings"
          step={1}
          placeholder={'5'}
          className="peer block w-full rounded-md border border-bistre-200 py-[9px] text-center text-lg outline-2 placeholder:text-gray-500 invalid:border-4 invalid:border-red-600"
          required
        />
      </label>
      <Ingredients
        ingredients={ingredients}
        addIngredients={addIngredient}
        removeIngredients={removeIngredient}
      />
      <label
        htmlFor="instructions"
        className="text-md mb-3 mt-5 block w-full font-bold text-gray-900 xl:w-2/3"
      >
        Instructions
        <textarea
          name="instructions"
          id="instructions"
          placeholder={'Chop veggies and toss in a large bowl...'}
          rows={10}
          className="peer block w-full rounded-md border border-bistre-200 py-[9px] text-lg outline-2 placeholder:text-gray-500 invalid:border-4 invalid:border-red-600"
          required
        ></textarea>
      </label>
      <button
        type="submit"
        className="text-large mx-auto my-4 flex w-full justify-center gap-2 rounded-md bg-peach_yellow p-2 font-bold text-bistre transition-colors hover:bg-peach_yellow-700 lg:w-1/2 "
      >
        Save Recipe <PlusIcon className="w-5" />
      </button>
      {errorMessage && (
        <div className="mt-2 flex items-center justify-center gap-2">
          <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
          <p className="text-lg text-red-500">{errorMessage}</p>
        </div>
      )}
    </form>
  );
}
