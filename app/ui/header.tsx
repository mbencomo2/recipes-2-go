import Link from 'next/link';
import Logo from './logo';
import {
  ArrowRightCircleIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';

export default function Header() {
  return (
    <header className="w-full bg-gradient-to-b from-peach_yellow via-peach_yellow to-transparent p-4">
      <div className="flex flex-col items-center md:container md:mx-auto md:flex-row md:justify-between">
        <Link
          id="logo"
          className="mb-2 flex h-24 w-full items-center justify-center overflow-hidden rounded-md bg-atomic_tangerine ring-4 ring-atomic_tangerine drop-shadow-lg md:h-32 lg:w-1/3"
          href="/"
        >
          <Logo />
        </Link>
        <div
          id="navLinks"
          className="flex-shrink-1 flex w-full items-center justify-evenly lg:w-1/2"
        >
          <Link
            className="flex w-1/3 items-center justify-center rounded-md py-2 text-center transition-colors hover:bg-peach_yellow-700 hover:drop-shadow-lg md:h-16 md:p-4"
            href={'/about'}
          >
            About Us
          </Link>
          <Link
            className="flex w-1/3 items-center justify-center rounded-md py-2 text-center transition-colors hover:bg-peach_yellow-700 hover:drop-shadow-lg md:h-16 md:p-4"
            href={'/faq'}
          >
            <span>FAQ</span>
            <QuestionMarkCircleIcon className="ml-2 h-8 w-8" />
          </Link>
          <Link
            className="flex w-1/3 items-center justify-center rounded-md py-2 text-center transition-colors hover:bg-peach_yellow-700 hover:drop-shadow-lg md:h-16 md:p-4"
            href={'/login'}
          >
            <span>Sign In</span>
            <ArrowRightCircleIcon className="ml-2 h-8 w-8" />
          </Link>
        </div>
      </div>
    </header>
  );
}
