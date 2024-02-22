import { alegreyaSansSC, cormorantInfant, martel } from '@/app/ui/fonts';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about who we are at Recipes2Go.',
};

export default function Page() {
  return (
    <main className={`${martel.className} mx-auto p-2 text-lg md:container`}>
      <h1
        className={`${cormorantInfant.className} mb-4 text-center text-6xl font-bold`}
      >
        About Us
      </h1>
      <div className="mx-auto flex w-full flex-col justify-evenly lg:w-2/3 lg:flex-row-reverse">
        <div className="flex w-full flex-col gap-2 p-2 lg:p-4 xl:w-2/3">
          <h2
            className={`${alegreyaSansSC.className} text-center text-2xl font-bold`}
          >
            We love Cooking
          </h2>
          <p>
            Nothing is as satisfying as a home cooked meal, and nothing more
            frustrating than struggling to find a recipe hidden away in
            Grandma&apos;s cookbook or leafing through dozens of recipe cards.
          </p>
          <p>
            We aim to provide a way to document your favorite recipes, while
            also being able to search them for easy finding! Once you have
            recorded a recipe, it becomes accessible from anywhere at anytime,
            only a search away!
          </p>
          <p>
            To make meal planning even easier, we created a system of creating
            shopping lists based on your recipes, so you know roughly what you
            need to buy when you go the store. No more hand-written (or
            hand-typed) notes!
          </p>
          <p>
            Turn all that time planning and searching into time spent cooking
            and enjoying good food with good fiends using Recipes2Go!
          </p>
        </div>
        <Image
          src={'/assets/man_make_pizza.webp'}
          width={1000}
          height={1500}
          alt="Man making a pizza."
          className="mx-auto w-full rounded-md drop-shadow-lg md:w-1/2 xl:w-1/3"
        />
      </div>
    </main>
  );
}
