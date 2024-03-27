'use client';
import { useRouter } from 'next/navigation';
import Navigator from '@/app/ui/Navigator';
import { getBudgetIndexById } from '@/app/utils/budgetHelpers';
import { Budget } from '@/app/types';
import BudgetRange from './BudgetRange';

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

  if (!currentBudget) return null;

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
    >
      <BudgetRange currentBudget={currentBudget} />
    </Navigator>
  );
}
