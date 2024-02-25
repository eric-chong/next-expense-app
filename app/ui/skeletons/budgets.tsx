import { lusitana } from '@/app/ui/fonts';

// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

function BudgetNavigatorSkeleton() {
  return (
    <div className="flex gap-6">
      <div className="flex grow justify-end">
        <div
          className={`${shimmer} relative mb-4 h-9 w-9 overflow-hidden rounded-full bg-gray-100`}
        />
      </div>
      <div
        className={`${shimmer} relative mb-4 h-9 w-36 overflow-hidden rounded-md bg-gray-100`}
      />
      <div className="flex grow justify-start">
        <div
          className={`${shimmer} relative mb-4 h-9 w-9 overflow-hidden rounded-full bg-gray-100`}
        />
      </div>
    </div>
  );
}

function TableRowSkeleton() {
  return (
    <tr className="w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
      {/* Name */}
      <td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
        <div className="h-6 w-24 rounded bg-gray-100"></div>
      </td>
      {/* Amount */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
      {/* Description */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-32 rounded bg-gray-100"></div>
      </td>
    </tr>
  );
}

function BudgetItemListSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div
          className={`${shimmer} relative overflow-hidden rounded-lg bg-gray-50 p-2 md:pt-0`}
        >
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function BudgetPageSkeleton() {
  return (
    <div className="flex flex-col">
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Budgets
      </h1>
      <BudgetNavigatorSkeleton />
      <div className="grow">
        <BudgetItemListSkeleton />
      </div>
    </div>
  );
}
