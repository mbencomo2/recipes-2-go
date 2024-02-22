import Link from 'next/link';
import { alegreyaSansSC } from '../../fonts';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { ShoppingList } from '@/app/lib/definitions';
import { formatDateToLocal } from '@/app/lib/utils';
import { fetchFilteredShoppingLists } from '@/app/lib/data';
import { CreateShoppingList } from '../buttons';

export default async function ShoppingListTable({
  id,
  query,
  page,
}: {
  id: string;
  query: string;
  page: number;
}) {
  const filteredResults = await fetchFilteredShoppingLists(id, query, page);
  return (
    <div className="flex flex-col items-center justify-center">
      {filteredResults.length > 0 ? (
        <div className="w-full divide-y-2 divide-peach_yellow rounded-md bg-mint_cream p-2 drop-shadow-lg">
          {filteredResults.map((listItem) => (
            <TableRow key={listItem.id} listItem={listItem} />
          ))}
        </div>
      ) : (
        <div className="flex w-full flex-col items-center py-2 text-center text-lg">
          No Shopping Lists to show
        </div>
      )}
    </div>
  );
}

function TableRow({ listItem }: { listItem: ShoppingList }) {
  return (
    <Link
      href={`/dashboard/shopping-list/${listItem.id}`}
      className="flex w-full flex-col items-center py-4 transition-colors duration-300 first-of-type:rounded-t-md last-of-type:rounded-b-md hover:bg-gray-200 lg:flex-row"
    >
      <h3
        className={`${alegreyaSansSC.className} flex w-full justify-center gap-2 text-2xl font-bold lg:w-1/3`}
      >
        <span className="max-w-4/5 truncate">{listItem.name}</span>
        <ShoppingCartIcon className="w-8 flex-shrink-0" />
      </h3>
      <p className="flex flex-col items-center justify-center lg:w-1/3">
        <span className="mt-2 text-lg font-bold">Date:</span>
        <span>{formatDateToLocal(listItem.dateAdded)}</span>
      </p>
      <p className="flex flex-col items-center justify-center lg:w-1/3">
        <span className="mt-2 text-lg font-bold">Number of Recipes</span>
        <span className={`${alegreyaSansSC.className} text-lg font-bold`}>
          {listItem.recipes.length}
        </span>
      </p>
    </Link>
  );
}
