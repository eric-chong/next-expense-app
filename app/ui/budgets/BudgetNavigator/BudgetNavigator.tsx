'use client';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import useGetBudget from '@/app/hooks/useGetBudget';
import { Budget } from '@/app/types';

interface IBudgetNavigator {
  budgets: Array<Budget>;
}

export default function BudgetNavigator({ budgets }: IBudgetNavigator) {
  const { getBudgetIndex } = useGetBudget();
  const currentBudgetIndex = getBudgetIndex(budgets, new Date());
  const currentBudget =
    currentBudgetIndex > -1 ? budgets[currentBudgetIndex] : undefined;
  return (
    <div className="flex gap-6">
      <div className="flex grow justify-end">
        {/* Use MUI button */}
        <button className="w-6 hover:text-blue-500">
          <ChevronLeftIcon />
        </button>
      </div>
      <div className="leading-loose">{`${currentBudget?.startDate} - ${currentBudget?.endDate}`}</div>
      <div className="flex grow justify-start">
        {/* Use MUI button */}
        <button className="w-6 hover:text-blue-500">
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
}
