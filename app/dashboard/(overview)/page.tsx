import { fetchFavoritesCount } from '@/app/lib/data';
import QuickLinks from '@/app/ui/dashboard/quickLinks';
import { RecipeTableSkeleton } from '@/app/ui/dashboard/recipes/recipeSkeletons';
import RecipeTable from '@/app/ui/dashboard/recipes/table';
import { alegreyaSansSC, cormorantInfant } from '@/app/ui/fonts';
import { auth, getUser } from '@/auth';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Overview',
  description: 'Overview of recipes and shopping lists you have recorded.',
};

export default async function Page() {
  const session = await auth().then((session) => session?.user);
  const email = session?.email || '';
  const id = (await getUser(email).then((user) => user?.id)) || '';
  const favoritesCount = await fetchFavoritesCount(id);
  return (
    <main>
      <div className="flex flex-col items-center justify-center gap-4 lg:flex-row-reverse">
        <QuickLinks />
        <Link
          href={'/dashboard/recipes?fav=1'}
          className="mx-auto my-2 flex w-full flex-col items-center justify-center rounded-md bg-peach_yellow p-4 drop-shadow-lg hover:bg-peach_yellow-700"
        >
          <span className={`${alegreyaSansSC.className} text-xl font-bold`}>
            Total Favorites
          </span>
          {favoritesCount}
          <span className="flex items-center gap-2 ">
            {' '}
            Go to Favorites <ArrowRightIcon className="h-5 w-5" />
          </span>
        </Link>
      </div>
      <section className="w-full p-4">
        <h2 className={`${alegreyaSansSC.className} text-2xl`}>
          Your Top 5 recipes:
        </h2>
        <Suspense fallback={<RecipeTableSkeleton />}>
          <RecipeTable
            userId={id}
            query=""
            currentPage={1}
            favoritesOnly={true}
          />
        </Suspense>
      </section>
    </main>
  );
}
