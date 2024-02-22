import { createShoppingList } from '@/app/lib/actions';
import { fetchRecipes } from '@/app/lib/data';
import Breadcrumbs from '@/app/ui/dashboard/breadcrumbs';
import CreateShoppingListForm from '@/app/ui/dashboard/shopping/new/createShopListForm';
import { cormorantInfant } from '@/app/ui/fonts';
import { auth, getUser } from '@/auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'New Shopping List',
  description: 'Create a new shopping list.',
};

export default async function Page() {
  const session = await auth().then((session) => session?.user);
  const email = session?.email || '';
  const id = (await getUser(email).then((user) => user?.id)) || '';
  const recipes = await fetchRecipes(id);
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
            label: 'New',
            href: '/dashboard/shopping-list/new',
            active: true,
          },
        ]}
      />
      <h1
        className={`${cormorantInfant.className} mb-4 text-center text-6xl font-bold`}
      >
        New Shopping List
      </h1>
      <CreateShoppingListForm
        userId={id}
        recipes={recipes}
        dispatchFn={createShoppingList}
      />
    </main>
  );
}
