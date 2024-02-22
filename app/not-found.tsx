import Link from 'next/link';
import Header from './ui/header';
import Footer from './ui/footer';
import { alegreyaSansSC, martel } from './ui/fonts';

export default function NotFound() {
  return (
    <>
      <Header />
      <main
        className={`${martel.className} flex flex-grow flex-col justify-center p-4 md:text-lg`}
      >
        <h1
          className={`${alegreyaSansSC.className} mb-4 text-center text-4xl font-bold`}
        >
          The page you are looking for is not here...
        </h1>
        <div className="flex w-full flex-col items-center justify-evenly gap-2 ">
          <Link
            href="/dashboard"
            className="rounded-md bg-peach_yellow p-4 text-lg text-bistre-500 hover:bg-peach_yellow-700"
          >
            <span>Go back to Home</span>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
