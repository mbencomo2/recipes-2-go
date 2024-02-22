import { PowerIcon, UserIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Logo from '../logo';
import { signOut } from '../../../auth';
import NavLinks from './navLinks';

export default async function SideNav() {
  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-peach_yellow via-peach_yellow to-transparent px-3 py-4 print:hidden md:px-2">
      <Link
        className="mb-2 flex h-28 items-center justify-center overflow-hidden rounded-md bg-atomic_tangerine ring-4 ring-atomic_tangerine drop-shadow-lg md:h-40"
        href="/"
      >
        <div className="w-4/5 sm:w-3/5 md:w-full">
          <Logo />
        </div>
      </Link>
      <div className="mt-2 flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md md:block"></div>
        <form
          action={async () => {
            'use server';
            await signOut();
            return '#';
          }}
          className="flex gap-2 md:flex-col"
        >
          <Link
            href={'/dashboard/account'}
            aria-label="Go to account settings page"
            className="flex h-[48px] w-full flex-shrink items-center justify-center gap-2 rounded-md bg-white p-3 text-sm font-medium text-bistre drop-shadow-lg transition-all duration-500 hover:bg-peach_yellow-700 md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <UserIcon className="w-6" />
            <span className="hidden md:block">Account Settings</span>
          </Link>
          <button
            aria-label="Sign Out"
            className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-white p-3 text-sm font-medium text-bistre drop-shadow-lg transition-all duration-500 hover:bg-peach_yellow-700 md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <PowerIcon className="w-6" />
            <span className="hidden md:block">Sign Out</span>
          </button>
        </form>
      </div>
    </div>
  );
}
