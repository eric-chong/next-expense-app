'use client';
import IconButton from '@mui/material/IconButton';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
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
        <IconButton
          aria-label="Previous"
          size="small"
          disabled={currentBudgetIndex === 0}
        >
          <ChevronLeft />
        </IconButton>
      </div>
      <div className="leading-9">{`${currentBudget?.startDate} - ${currentBudget?.endDate}`}</div>
      <div className="flex grow justify-start">
        <IconButton
          aria-label="Previous"
          size="small"
          disabled={currentBudgetIndex === budgets.length - 1}
        >
          <ChevronRight />
        </IconButton>
      </div>
    </div>
  );
}
