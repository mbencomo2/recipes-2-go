import { editRecipe } from '@/app/lib/actions';
import { fetchRecipeById } from '@/app/lib/data';
import { Recipe } from '@/app/lib/definitions';
import Breadcrumbs from '@/app/ui/dashboard/breadcrumbs';
import { DeleteRecipe } from '@/app/ui/dashboard/buttons';
import EditRecipeForm from '@/app/ui/dashboard/recipes/edit/editRecipeForm';
import { cormorantInfant } from '@/app/ui/fonts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Recipe',
  description: 'Edit the details of a recipe you have recorded.',
};

export default async function Page({ params }: { params: { id: string } }) {
  const recipeId = params.id;
  const recipe = (await fetchRecipeById(recipeId)) || ({} as Recipe);
  recipe.image.data = recipe.image.data.toString('base64');
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
            label: recipe.name,
            href: `/dashboard/recipes/${recipe.id}`,
          },
          {
            label: 'Edit',
            href: `/dashboard/recipes/${recipe.id}/edit`,
            active: true,
          },
        ]}
      />
      <h1
        className={`${cormorantInfant.className} mb-4 text-center text-4xl font-bold`}
      >
        Edit Recipe
      </h1>
      <EditRecipeForm recipe={recipe} dispatchFn={editRecipe} />
      <DeleteRecipe id={recipe.id} />
    </main>
  );
}
