import Link from 'next/link';
import { alegreyaSansSC } from '../fonts';
import ImageCarousel from '../imageCarousel';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

export default function Hero() {
  return (
    <div
      id="hero"
      className="relative flex flex-col items-center px-8 md:flex-row-reverse md:px-[15%]"
    >
      <ImageCarousel
        images={[
          '/assets/woman_w_openCookBook.webp',
          '/assets/woman_cooking_w_phone.webp',
          '/assets/open_cookBook_w_veggies.webp',
        ]}
        className="mx-auto w-4/5 self-start rounded-md lg:w-[40%] xl:w-1/3"
      />
      <div className="mx-auto flex-shrink p-2 lg:w-2/5">
        <div className=" flex flex-col justify-center">
          <p>
            Transform the time spent{' '}
            <span className={`${alegreyaSansSC.className} text-2xl font-bold `}>
              Searching
            </span>{' '}
            your recipe book into time spent{' '}
            <span className={`${alegreyaSansSC.className} text-2xl font-bold `}>
              Cooking
            </span>{' '}
            with the ultimate digital recipe book!
          </p>
          <Link
            href={`/register`}
            className="mt-8 flex w-full items-center justify-between rounded-md bg-peach_yellow p-4 text-lg font-bold text-bistre drop-shadow-lg transition-colors duration-300 hover:bg-peach_yellow-700"
          >
            Create Your Cook Book{' '}
            <ArrowRightIcon className="h-84 inline-block w-8" />
          </Link>
        </div>
      </div>
    </div>
  );
}
