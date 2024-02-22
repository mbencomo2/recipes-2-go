import { alegreyaSansSC, martel } from '@/app/ui/fonts';
import Hero from '../ui/home/hero';
import Highlight from '../ui/home/highlight';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Recipes2Go is the ultimate digital recipe book. Record, organize, and search all your recipes instead of leafing through cookbooks!',
};

export default function Page() {
  return (
    <main
      className={`${martel.className} flex flex-grow flex-col justify-center p-4 md:text-lg`}
    >
      <h1
        className={`${alegreyaSansSC.className} mb-4 text-center text-6xl font-bold`}
      >
        Cook More, Search Less
      </h1>
      <Hero />
      <div id="showcase" className="divide-y-2 divide-peach_yellow">
        <Highlight
          imgURL="/assets/record.webp"
          header="Record Recipes"
          content="Record your favorite recipes, ingredients, cook time, servings, and all!"
          altText="Screenshot of Recording a Recipe"
        />
        <Highlight
          imgURL="/assets/favorites.webp"
          header="Save Favorites"
          content="Save your your favorite recipes for easy access at the click of a button!"
          altText="Screenshot of viewing favorited recipes"
          reverse={true}
        />
        <Highlight
          imgURL="/assets/mobile.webp"
          header="Mobility and Style"
          content="Access your favorite recipes anywhere, and anytime with our easy to use UI. Install as a PWA for a smooth experience."
          altText="Screenshot of mobile layout"
        />
        <Highlight
          imgURL="/assets/shopping.webp"
          header="Create Shopping Lists"
          content="Create a shopping list including ingredients for all the recipes you want. Never write a shopping list ever again!"
          altText="Screenshot of viewing shopping lists"
          reverse={true}
        />
      </div>
    </main>
  );
}
