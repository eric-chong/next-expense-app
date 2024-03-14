'use client';
import { useRouter } from 'next/navigation';
import useFormatDate from '@/app/hooks/useFormatDate';
import Navigator from '@/app/ui/Navigator';
import { getBudgetIndexById } from '@/app/utils/budgetHelpers';
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
  const currentBudgetIndex = getBudgetIndexById(budgets, budgetId);
  const currentBudget =
    currentBudgetIndex > -1 ? budgets[currentBudgetIndex] : undefined;

  const { formatDate } = useFormatDate();

  if (!currentBudget) return null;

  const { startDate, endDate } = currentBudget;
  return (
    <Navigator
      hasPrev={currentBudgetIndex > 0}
      onPrev={() =>
        router.push(`/budgets/${budgets[currentBudgetIndex - 1].id}`)
      }
      hasNext={currentBudgetIndex < budgets.length - 1}
      onNext={() =>
        router.push(`/budgets/${budgets[currentBudgetIndex + 1].id}`)
      }
    >{`${formatDate(startDate)} - ${formatDate(endDate)}`}</Navigator>
  );
}
