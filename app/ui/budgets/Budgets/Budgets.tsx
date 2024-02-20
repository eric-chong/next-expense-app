import { Budget, BudgetItem } from '@/app/types';
import BudgetItemList from '@/app/ui/budgets/BudgetItemList';
import BudgetNavigator from '@/app/ui/budgets/BudgetNavigator';

interface IBudgets {
  budgetItems: Array<BudgetItem>;
  budgets: Array<Budget>;
  currentBudgetId: string;
}
export default function Budgets({
  budgetItems,
  budgets,
  currentBudgetId,
}: IBudgets) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-1 lg:grid-cols-1">
      <BudgetNavigator budgets={budgets} budgetId={currentBudgetId} />
      <BudgetItemList budgetItems={budgetItems} />
    </div>
  );
}
