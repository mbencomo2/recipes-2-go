import { fetchFilteredRecipes } from '@/app/lib/data';
import { alegreyaSansSC } from '../../fonts';
import TableRow, { MobileRow } from './tableRow';
import { Recipe } from '@/app/lib/definitions';

export default async function RecipeTable({
  userId,
  query,
  currentPage,
  favoritesOnly,
}: {
  userId: string;
  query: string;
  currentPage: number;
  favoritesOnly: boolean;
}) {
  const recipes = await fetchFilteredRecipes(
    userId,
    query,
    currentPage,
    favoritesOnly,
  );
  recipes.forEach(
    (recipe) =>
      (recipe.thumbnail.data = recipe.thumbnail.data.toString('base64')),
  );
  return (
    <>
      {recipes.length > 0 ? (
        <Table recipes={recipes} />
      ) : (
        <div className="flex w-full flex-col items-center py-2 text-center text-lg">
          No Recipes to show
        </div>
      )}
    </>
  );
}

function Table({ recipes }: { recipes: Recipe[] }) {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-mint_cream p-2 drop-shadow-lg md:pt-0">
          <div className="divide-y-2 divide-peach_yellow lg:hidden">
            {recipes.map((recipe: Recipe) => (
              <MobileRow key={recipe.id} recipe={recipe} />
            ))}
          </div>
          <div className="hidden w-full bg-mint_cream lg:block">
            <div
              className={`flex flex-row items-center justify-evenly text-center text-xl ${alegreyaSansSC.className}`}
            >
              <span className="w-1/4 px-4 py-5 font-medium">Recipe</span>
              <span className="w-1/4 px-3 py-5 font-medium">Name</span>
              <span className="w-1/4 px-3 py-5 font-medium">Cook Time</span>
              <span className="w-1/4 px-3 py-5 font-medium">Favorite</span>
            </div>
            <div className="divide-y-2 divide-peach_yellow text-center">
              {recipes?.map((recipe) => (
                <TableRow key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
