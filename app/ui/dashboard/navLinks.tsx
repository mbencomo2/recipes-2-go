'use client';

import {
  HomeIcon,
  ListBulletIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Recipes',
    href: '/dashboard/recipes',
    icon: PencilSquareIcon,
  },
  {
    name: 'Shopping List',
    href: '/dashboard/shopping-list',
    icon: ListBulletIcon,
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            aria-label={`Go To ${link.name}`}
            className={clsx(
              'tranistion-colors flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium duration-300 hover:bg-atomic_tangerine-700 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-atomic_tangerine text-bistre drop-shadow-lg':
                  pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="m-0 hidden p-0 md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
