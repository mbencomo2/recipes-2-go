import { createRecipe } from '@/app/lib/actions';
import Breadcrumbs from '@/app/ui/dashboard/breadcrumbs';
import CreateRecipeForm from '@/app/ui/dashboard/recipes/new/createRecipeForm';
import { cormorantInfant } from '@/app/ui/fonts';
import { auth, getUser } from '@/auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Recipe',
  description: 'Create a new recipe to save in your collection.',
};

export default async function Page() {
  const session = await auth().then((session) => session?.user);
  const email = session?.email || '';
  const id = (await getUser(email).then((user) => user?.id)) || '';
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Overview', href: '/dashboard' },
          {
            label: 'View Recipes',
            href: '/dashboard/recipes',
          },
          {
            label: 'Create',
            href: `/dashboard/recipes/create`,
            active: true,
          },
        ]}
      />
      <h1
        className={`${cormorantInfant.className} mb-4 text-left text-6xl font-bold`}
      >
        Create Recipe
      </h1>
      <CreateRecipeForm dispatchFn={createRecipe} userId={id} />
    </main>
  );
}
