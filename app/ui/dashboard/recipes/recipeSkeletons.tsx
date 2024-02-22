const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function RecipeTableSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div
          className={` ${shimmer} flex flex-col overflow-x-hidden rounded-md bg-mint_cream p-2 drop-shadow-lg md:pt-0`}
        >
          <MobileTableSkeleton />
          <LargeTableSkeleton />
        </div>
      </div>
    </div>
  );
}

function MobileRecipe() {
  return (
    <div className="mb-2 w-full p-4">
      <div className="flex flex-col items-center justify-between pb-4">
        <div className="flex w-full justify-end rounded-md">
          <div className="m-2 h-7 w-7 rounded-md bg-gray-300"></div>
        </div>
        <div className="h-[120px] w-[120px] rounded-full bg-gray-300"></div>
        <div className="mt-2 h-4 w-3/4 rounded-md bg-gray-300"></div>
        <div className="mt-2 h-4 w-1/2 rounded-md bg-gray-300"></div>
      </div>
    </div>
  );
}

function MobileTableSkeleton() {
  return (
    <div className="lg:hidden">
      <MobileRecipe />
      <MobileRecipe />
      <MobileRecipe />
      <MobileRecipe />
      <MobileRecipe />
    </div>
  );
}

function LargeTableRecipe() {
  return (
    <div className="flex w-full items-center justify-evenly py-3 text-sm">
      <div className="w-1/4 whitespace-nowrap px-3 py-3">
        <div className="mx-auto h-[120px] w-[120px] rounded-full bg-gray-300"></div>
      </div>
      <div className="w-1/4 whitespace-nowrap px-3 py-3">
        <div className="mx-auto h-4 w-32 rounded-md bg-gray-300"></div>
      </div>
      <div className="w-1/4 whitespace-nowrap px-3 py-3">
        <div className="mx-auto h-4 w-12 rounded-md bg-gray-300"></div>
      </div>
      <div className="w-1/4 whitespace-nowrap px-3 py-3">
        <div className="mx-auto h-8 w-8 rounded-md bg-gray-300"></div>
      </div>
    </div>
  );
}

function LargeTableSkeleton() {
  return (
    <div className="hidden min-w-full flex-col overflow-hidden lg:flex">
      <div className="justify-evenlyrounded-lg flex text-lg font-bold">
        <div className="w-1/4 px-3 py-5 font-medium">
          <div className="mx-auto h-4 w-16 rounded-md bg-gray-300"></div>
        </div>
        <div className="w-1/4 px-3 py-5 font-medium">
          <div className="mx-auto h-4 w-16 rounded-md bg-gray-300"></div>
        </div>
        <div className="w-1/4 px-3 py-5 font-medium">
          <div className="mx-auto h-4 w-16 rounded-md bg-gray-300"></div>
        </div>
        <div className="w-1/4 px-3 py-5 font-medium">
          <div className="mx-auto h-4 w-16 rounded-md bg-gray-300"></div>
        </div>
      </div>
      <div className="divide-y-2 divide-gray-300">
        <LargeTableRecipe />
        <LargeTableRecipe />
        <LargeTableRecipe />
        <LargeTableRecipe />
        <LargeTableRecipe />
      </div>
    </div>
  );
}
