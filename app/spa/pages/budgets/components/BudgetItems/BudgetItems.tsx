import { Box } from '@mui/material';
import { BudgetItem } from '@/app/types';
import BudgetItemTable from '../BudgetItemTable';

interface IBudgets {
  budgetItems: Array<BudgetItem>;
  currentBudgetId?: string;
}

export default function Budgets({ budgetItems, currentBudgetId }: IBudgets) {
  return currentBudgetId ? (
    <BudgetItemTable
      budgetItems={budgetItems}
      currentBudgetId={currentBudgetId}
    />
  ) : (
    <Box textAlign="center">
      There is no budget setup for this date, select the budget period and save.
    </Box>
  );
}
