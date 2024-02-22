const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function ShoppingTableSkeleton() {
  return (
    <div className="inline-block min-w-full align-middle">
      <div
        className={`${shimmer} flex w-full flex-col items-center justify-center divide-y-2 divide-peach_yellow overflow-hidden rounded-md bg-mint_cream p-2 drop-shadow-lg`}
      >
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
        <TableRowSkeleton />
      </div>
    </div>
  );
}

function TableRowSkeleton() {
  return (
    <div className="flex w-full flex-col items-center py-4 transition-colors duration-300 first-of-type:rounded-t-md last-of-type:rounded-b-md hover:bg-gray-200 lg:flex-row">
      <div className={`flex w-full items-center justify-center gap-2 lg:w-1/3`}>
        <span className="h-8 w-3/5 rounded-md bg-gray-300"></span>
        <span className="h-8 w-8 flex-shrink-0 rounded-md bg-gray-300"></span>
      </div>
      <div className="flex flex-col items-center justify-center lg:w-1/3">
        <span className="my-4 h-4 w-1/6 rounded-md bg-gray-300"></span>
        <span className="h-4 w-1/3 rounded-md bg-gray-300"></span>
      </div>
      <div className="flex flex-col items-center justify-center lg:w-1/3">
        <span className="my-4 h-4 w-1/2 rounded-md bg-gray-300"></span>
        <span className="h-4 w-1/6 rounded-md bg-gray-300"></span>
      </div>
    </div>
  );
}
