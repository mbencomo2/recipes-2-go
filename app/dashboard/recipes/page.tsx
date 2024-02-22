import { fetchFilteredRecipesCount } from '@/app/lib/data';
import Breadcrumbs from '@/app/ui/dashboard/breadcrumbs';
import Pagination from '@/app/ui/dashboard/pagination';
import { CreateRecipe } from '@/app/ui/dashboard/buttons';
import { RecipeTableSkeleton } from '@/app/ui/dashboard/recipes/recipeSkeletons';
import SearchWithFavorite from '@/app/ui/dashboard/recipes/search';
import RecipeTable from '@/app/ui/dashboard/recipes/table';
import { alegreyaSansSC } from '@/app/ui/fonts';
import { auth, getUser } from '@/auth';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { z } from 'zod';

export const metadata: Metadata = {
  title: 'Browse Recipes',
  description:
    'Search for your favorite recipes or record a new one to add to your collection.',
};

const searchSchema = z.object({
  query: z.string(),
  page: z.coerce.number(),
  fav: z.coerce.number(),
});

const validateParams = (searchParams: {
  query: string;
  page: number;
  fav: number;
}) => {
  const validatedQuery = searchSchema.safeParse({
    query: searchParams.query || '',
    page: searchParams.page || 1,
    fav: searchParams.fav || 0,
  });
  if (validatedQuery.success)
    return {
      query: validatedQuery.data.query,
      page: validatedQuery.data.page,
      fav: validatedQuery.data.fav === 1,
    };

  return {
    query: '',
    page: 1,
    fav: false,
  };
};

export default async function Page({
  searchParams,
}: {
  searchParams: { query: string; page: number; fav: number };
}) {
  // Validate parameter values, no hacking!
  const safeParams = validateParams(searchParams);

  // Fetch user information
  const session = await auth().then((session) => session?.user);
  const email = session?.email || '';
  const id = (await getUser(email).then((user) => user?.id)) || '';
  const totalPages = await fetchFilteredRecipesCount(
    id,
    safeParams.query,
    safeParams.fav,
  );
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Overview', href: '/dashboard' },
          {
            label: 'View Recipes',
            href: '/dashboard/recipes',
            active: true,
          },
        ]}
      />
      <h1 className={`${alegreyaSansSC.className} text-4xl font-bold`}>
        Manage Your Recipes
      </h1>
      <div className="mx-auto xl:w-2/3">
        <SearchWithFavorite
          placeholder="Search by Name, ingredients, cook time..."
          favStatus={safeParams.fav}
        />
        <div className="relative my-5 flex w-full flex-wrap items-center justify-center gap-2">
          <div className="right-0 top-0 w-full sm:absolute sm:w-fit">
            <CreateRecipe />
          </div>
          <div className="w-full"></div>
          <Pagination totalPages={totalPages} />
        </div>
        <Suspense
          key={`${safeParams.query} + ${safeParams.page} + ${safeParams.fav}`}
          fallback={<RecipeTableSkeleton />}
        >
          <RecipeTable
            userId={id}
            query={safeParams.query}
            currentPage={safeParams.page}
            favoritesOnly={safeParams.fav}
          />
        </Suspense>
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </main>
  );
}
