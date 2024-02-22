import { fetchFilteredShoppingListCount } from '@/app/lib/data';
import Breadcrumbs from '@/app/ui/dashboard/breadcrumbs';
import Pagination from '@/app/ui/dashboard/pagination';
import { CreateShoppingList } from '@/app/ui/dashboard/buttons';
import { Search } from '@/app/ui/dashboard/recipes/search';
import ShoppingListTable from '@/app/ui/dashboard/shopping/shopListTable';
import { ShoppingTableSkeleton } from '@/app/ui/dashboard/shopping/shopTableSkeleton';
import { alegreyaSansSC } from '@/app/ui/fonts';
import { auth, getUser } from '@/auth';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { z } from 'zod';

export const metadata: Metadata = {
  title: 'Browse Shopping Lists',
  description: 'Search the shopping lists you have created.',
};

const searchSchema = z.object({
  query: z.string(),
  page: z.coerce.number(),
});

const validateParams = (searchParams: { query: string; page: number }) => {
  const validatedQuery = searchSchema.safeParse({
    query: searchParams.query || '',
    page: searchParams.page || 1,
  });
  if (validatedQuery.success)
    return {
      query: validatedQuery.data.query,
      page: validatedQuery.data.page,
    };

  return {
    query: '',
    page: 1,
  };
};

export default async function Page({
  searchParams,
}: {
  searchParams: { query: string; page: number };
}) {
  const safeParmas = validateParams(searchParams);

  // Fetch user information
  const session = await auth().then((session) => session?.user);
  const email = session?.email || '';
  const id = (await getUser(email).then((user) => user?.id)) || '';
  const totalPages = await fetchFilteredShoppingListCount(id, safeParmas.query);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Overview', href: '/dashboard' },
          {
            label: 'View Shopping Lists',
            href: '/dashboard/shopping-list',
            active: true,
          },
        ]}
      />
      <h1 className={`${alegreyaSansSC.className} mb-4 text-4xl font-bold`}>
        View Shopping Lists
      </h1>
      <div className="relative mx-auto xl:w-2/3">
        <h2 className={`${alegreyaSansSC.className} text-2xl font-bold`}>
          Shopping Lists
        </h2>
        <Search placeholder="Search by name" />
        <div className="relative my-5 flex w-full flex-wrap items-center justify-center gap-2">
          <div className="right-0 top-0 w-full sm:absolute sm:w-fit">
            <CreateShoppingList />
          </div>
          <div className="w-full"></div>
          <Pagination totalPages={totalPages} />
        </div>
        <Suspense
          key={`${safeParmas.query} + ${safeParmas.page}`}
          fallback={<ShoppingTableSkeleton />}
        >
          <ShoppingListTable
            id={id}
            query={safeParmas.query}
            page={safeParmas.page}
          />
        </Suspense>
        <div className="relative my-5 flex w-full flex-wrap justify-center gap-2">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </main>
  );
}
