import { editShoppingList } from '@/app/lib/actions';
import { fetchRecipes, fetchShoppingListById } from '@/app/lib/data';
import { ShoppingList } from '@/app/lib/definitions';
import Breadcrumbs from '@/app/ui/dashboard/breadcrumbs';
import { DeleteShoppingList } from '@/app/ui/dashboard/buttons';
import EditShoppingListForm from '@/app/ui/dashboard/shopping/edit/editShopListForm';
import { cormorantInfant } from '@/app/ui/fonts';
import { auth, getUser } from '@/auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Shopping List',
  description: 'Edit the details of a Shopping List you have created.',
};

export default async function Page({ params }: { params: { id: string } }) {
  const session = await auth().then((session) => session?.user);
  const email = session?.email || '';
  const id = (await getUser(email).then((user) => user?.id)) || '';
  const recipes = await fetchRecipes(id);

  const listId = params.id;
  const shoppingList =
    (await fetchShoppingListById(listId)) || ({} as ShoppingList);
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
            label: shoppingList.name,
            href: `/dashboard/shopping-list/${shoppingList.id}`,
          },
          {
            label: 'Edit',
            href: `/dashboard/shopping-list/${shoppingList.id}/edit`,
            active: true,
          },
        ]}
      />
      <h1
        className={`${cormorantInfant.className} mb-4 text-center text-4xl font-bold`}
      >
        Edit Shopping List
      </h1>
      <EditShoppingListForm
        recipes={recipes}
        list={shoppingList}
        dispatchFn={editShoppingList}
      />
      <DeleteShoppingList id={shoppingList.id} />
    </main>
  );
}
