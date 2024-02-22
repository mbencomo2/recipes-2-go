import { ArrowRightIcon, PlusIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { alegreyaSansSC } from '../fonts';

export default function QuickLinks() {
  return (
    <div className="w-full p-4">
      <h1 className={`${alegreyaSansSC.className} text-xl`}>
        Pick up where you left off:{' '}
      </h1>
      <div className="flex flex-col gap-4">
        <Link
          href={'/dashboard/recipes/new'}
          className="flex items-center justify-center gap-2 rounded-md bg-peach_yellow p-4 font-bold text-bistre drop-shadow-lg hover:bg-peach_yellow-700"
        >
          Add a new Recipe <PlusIcon className="h-5 w-5" />
        </Link>
        <Link
          href={'/dashboard/shopping-list/new'}
          className="flex items-center justify-center gap-2 rounded-md bg-peach_yellow p-4 font-bold text-bistre drop-shadow-lg hover:bg-peach_yellow-700"
        >
          Make a New Shopping List <PlusIcon className="h-5 w-5" />
        </Link>
        <Link
          href={'/dashboard/recipes'}
          className="flex items-center justify-center gap-2 rounded-md bg-peach_yellow p-4 font-bold text-bistre drop-shadow-lg hover:bg-peach_yellow-700"
        >
          View All Recipes <ArrowRightIcon className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
}
