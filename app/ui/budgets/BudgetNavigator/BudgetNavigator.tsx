'use client';
import IconButton from '@mui/material/IconButton';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import { useRouter } from 'next/navigation';
import useGetBudget from '@/app/hooks/useGetBudget';
import { Budget } from '@/app/types';

interface IBudgetNavigator {
  budgets: Array<Budget>;
  budgetId: string;
}

export default function BudgetNavigator({
  budgets,
  budgetId,
}: IBudgetNavigator) {
  const router = useRouter();
  const { getBudgetIndexById } = useGetBudget();
  const currentBudgetIndex = getBudgetIndexById(budgets, budgetId);
  const currentBudget =
    currentBudgetIndex > -1 ? budgets[currentBudgetIndex] : undefined;

  return (
    <div className="flex gap-6">
      <div className="flex grow justify-end">
        <IconButton
          aria-label="Previous"
          size="small"
          disabled={currentBudgetIndex === 0}
          onClick={() =>
            router.push(`/budgets/${budgets[currentBudgetIndex - 1].id}`)
          }
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
          onClick={() =>
            router.push(`/budgets/${budgets[currentBudgetIndex + 1].id}`)
          }
        >
          <ChevronRight />
        </IconButton>
      </div>
    </div>
  );
}
