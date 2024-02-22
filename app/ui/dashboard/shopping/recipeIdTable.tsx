import { Recipe } from '@/app/lib/definitions';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { alegreyaSansSC } from '../../fonts';

export default function RecipeIdTable({
  recipes,
  defaultSelection,
  add,
  remove,
}: {
  recipes: Recipe[];
  defaultSelection: { id: string; name: string }[];
  add: CallableFunction;
  remove: CallableFunction;
}) {
  const [recipeIndex, setRecipeIndex] = useState(0);
  return (
    <fieldset className="mx-auto w-full rounded-md border border-bistre-500 p-2 xl:w-2/3">
      <legend>Add Recipes</legend>
      <label
        htmlFor="recipeSelect"
        className="mb-3 flex w-full flex-col items-center justify-center text-lg font-medium text-gray-900"
      >
        <span className="sr-only">Add Recipes:</span>
        <div className="flex w-full flex-col justify-evenly gap-2 rounded-md lg:flex-row">
          <select
            name="recipeName"
            id="recipeSelect"
            defaultValue={0}
            className="mb-3 shrink rounded-md border border-bistre-200 py-[9px] outline-2 placeholder:text-gray-500 disabled:bg-gray-300 lg:w-2/3"
            disabled={recipes.length === 0}
            onChange={(e) => setRecipeIndex(Number(e.target.value))}
          >
            {recipes.map((recipe: Recipe, index: number) => (
              <option key={index} value={index}>
                {recipe.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => add(recipes[recipeIndex])}
            disabled={recipes.length === 0}
            className=" mb-3 flex w-full shrink-0 items-center justify-center gap-2 rounded-md bg-peach_yellow px-4 py-2 text-lg font-bold drop-shadow-lg transition-colors hover:bg-peach_yellow-700 disabled:bg-gray-300 lg:w-fit"
          >
            Add Recipe
            <PlusIcon className="w-5" />
          </button>
        </div>
      </label>
      <ul className="mx-auto w-full divide-y-2 divide-atomic_tangerine rounded-md bg-peach_yellow">
        {defaultSelection.map(
          (item: { id: string; name: string }, index: number) => (
            <li
              key={index}
              className="mx-auto flex w-full items-center justify-between p-2"
            >
              <span
                className={`${alegreyaSansSC.className} w-2/3 truncate text-lg font-bold`}
              >
                {item.name}
              </span>
              <button
                type="button"
                className="mr-4 rounded-md bg-red-700 p-2 text-white drop-shadow-lg"
                onClick={() => remove(index)}
              >
                <span className="sr-only">Delete Ingredient</span>
                <TrashIcon className="w-8" />
              </button>
            </li>
          ),
        )}
      </ul>
    </fieldset>
  );
}
