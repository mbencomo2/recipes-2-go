import { alegreyaSansSC, cormorantInfant, martel } from '@/app/ui/fonts';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Get answers to frequently asked questions for Recipes2Go.',
};

export default function Page() {
  return (
    <main className={`${martel.className} mx-auto p-2 text-lg md:container`}>
      <h1
        className={`${cormorantInfant.className} mb-4 text-center text-6xl font-bold`}
      >
        Frequently Asked Questions
      </h1>
      <ul className="mx-auto flex list-disc flex-col gap-4 lg:container">
        <li id="print" className="flex flex-col gap-2">
          <span className="font-bold">Q: Can I print my Recipes?</span>
          A: Yes, you can! Just use the print functionality of your browser for
          now (a button will be coming soon), and you can print off your recipes
          (and Shopping Lists!) with a simplified layout for easy printing.
        </li>
        <li id="dark-mode" className="flex flex-col gap-2">
          <span className="font-bold">Q: Can I turn on dark mode?</span>
          A: For now, you will need to use an extension. A dark mode is in the
          works!
        </li>
        <li id="Accuracy" className="flex flex-col gap-2">
          <span className="font-bold">
            Q: How acurrate are my shopping lists?
          </span>
          A: Due to the large number of units and differing density and weights
          of ingredients, creating a perfectly accurate conversion tool is
          difficult. We strive to provide as accurate amounts as possible, but
          expect it to be off for a bit if you have one recipe with ingredients
          measured by weight, and another recipe with the same ingredients
          measured by volume.
        </li>
        <li className="flex flex-col gap-2">
          <span className="font-bold">
            Q: When I delete a recipe, it says &quot;Recipe Deleted&quot; on my
            shopping list.
          </span>
          A: Yes, That is because the recipe is no longer stored on our
          database, and the shopping list cannot find it. We are working on a
          more elegant solution, but don&apos;t worry. It will not affect the
          calculation of the ingredient amounts.
        </li>
        <li className="flex flex-col gap-2">
          <span className="font-bold">Q: I want X feature!</span>
          <p>
            A: I bet that would be awesome! Please submit it as a{' '}
            <a href="#" className="inline font-semibold hover:text-blue-300">
              features request{' '}
            </a>
            and we will see if we can include it!
          </p>
        </li>
      </ul>
    </main>
  );
}
