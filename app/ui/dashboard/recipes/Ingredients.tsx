'use client';
import { Ingredient } from '@/app/lib/definitions';
import { capitalize } from '@/app/lib/utils';
import { alegreyaSansSC } from '@/app/ui/fonts';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

const units = [
  'fl oz',
  'cup',
  'pt',
  'qt',
  'gal',
  'ml',
  'l',
  'g',
  'kg',
  'oz',
  'lb',
  'tsp',
  'tbsp',
  'dash',
  'pinch',
];

export default function Ingredients({
  ingredients,
  addIngredients,
  removeIngredients,
}: {
  ingredients: Ingredient[];
  addIngredients: CallableFunction;
  removeIngredients: CallableFunction;
}) {
  const [ingName, setIngName] = useState('Salt');
  const [ingAmount, setIngAmount] = useState(1);
  const [ingUnit, setIngUnit] = useState('pinch');

  const handleAdd = () => {
    addIngredients(capitalize(ingName), ingAmount, ingUnit);
  };

  const handleRemove = (index: number) => {
    removeIngredients(index);
  };

  function IngredientsRow({
    ingredient,
    index,
  }: {
    ingredient: Ingredient;
    index: number;
  }) {
    return (
      <div className="mx-auto flex w-full items-center justify-between p-2">
        <span className={`${alegreyaSansSC.className} w-1/3 text-lg font-bold`}>
          {ingredient.name}
        </span>
        <div className="flex w-1/3 items-center justify-center gap-2">
          <span>{ingredient.amount}</span>
          <span>{ingredient.unit}</span>
        </div>
        <div className="flex w-1/3 justify-end">
          <button
            type="button"
            className="mr-4 rounded-md bg-red-700 p-2 text-white drop-shadow-lg"
            onClick={() => handleRemove(index)}
          >
            <span className="sr-only">Delete Ingredient</span>
            <TrashIcon className="w-8" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <fieldset className="mx-auto w-full rounded-md border border-bistre-500 p-2 xl:w-2/3">
      <legend>Ingredients</legend>
      <div className="w-full items-end justify-center gap-2 lg:flex">
        <div className=" flex w-full items-end justify-center gap-2">
          <label
            htmlFor="ingName"
            className="text-md mb-3 flex flex-col items-center justify-center font-medium text-gray-900"
          >
            Name:
            <input
              type="text"
              name="ingName"
              id="ingName"
              placeholder="Salt"
              className="peer w-full rounded-md border border-bistre-200 py-[9px] text-center text-lg outline-2 placeholder:text-gray-500"
              onChange={(e) => setIngName(e.target.value)}
            />
          </label>
          <label
            htmlFor="ingAmount"
            className="text-md mb-3 flex flex-col items-center justify-center font-medium text-gray-900"
          >
            Amount:
            <input
              type="number"
              name="ingAmount"
              id="ingAmount"
              step={0.1}
              placeholder="1"
              className="peer w-full rounded-md border border-bistre-200 py-[9px] text-center text-lg outline-2 placeholder:text-gray-500"
              onChange={(e) => setIngAmount(Number(e.target.value))}
            />
          </label>
          <label htmlFor="ingUnit">
            <span className="sr-only">Select a Unit</span>
            <select
              name="ingUnit"
              id="ingUnit"
              className="mb-3 rounded-md border border-bistre-200 py-[9px] outline-2 placeholder:text-gray-500"
              defaultValue="pinch"
              onChange={(e) => setIngUnit(e.target.value)}
            >
              <option value="Whole">Whole</option>
              {units.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button
          type="button"
          className="mb-3 flex w-full shrink items-center justify-center gap-2 rounded-md bg-peach_yellow px-4 py-2 text-lg font-bold drop-shadow-lg transition-colors hover:bg-peach_yellow-700 lg:w-fit"
          onClick={handleAdd}
        >
          Add <PlusIcon className="w-5" />
        </button>
      </div>
      <div className="mx-auto divide-y-2 divide-atomic_tangerine rounded-md bg-peach_yellow">
        {ingredients.map((ingredient: Ingredient, index: number) => (
          <IngredientsRow key={index} ingredient={ingredient} index={index} />
        ))}
      </div>
    </fieldset>
  );
}
