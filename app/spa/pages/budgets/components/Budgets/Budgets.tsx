import { Box, Typography } from '@mui/material';
import GlobalAlertProvider from '@/app/spa/providers/GlobalAlertProvider';
import { Budget, BudgetItem } from '@/app/types';
import GlobalAlert from '@/app/ui/GlobalAlert';
import BudgetNavigator from '../BudgetNavigator';
import BudgetItemTable from '../BudgetItemTable';
import { fillBudgetsWithNewPeriod } from '../utilHelpers';

interface IBudgets {
  budgetItems: Array<BudgetItem>;
  budgets: Array<Budget>;
  currentBudgetId?: string;
}

export default function Budgets({
  budgetItems,
  budgets,
  currentBudgetId,
}: IBudgets) {
  return (
    <main>
      <GlobalAlertProvider>
        <GlobalAlert />
        <Typography variant="h5">Budgets</Typography>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-1 lg:grid-cols-1">
          <BudgetNavigator
            budgets={
              currentBudgetId
                ? budgets
                : fillBudgetsWithNewPeriod(new Date(), budgets)
            }
            budgetId={currentBudgetId}
          />
          {currentBudgetId ? (
            <BudgetItemTable
              budgetItems={budgetItems}
              currentBudgetId={currentBudgetId}
            />
          ) : (
            <Box textAlign="center">
              There is no budget setup for this date, select the budget period
              and save.
            </Box>
          )}
        </div>
      </GlobalAlertProvider>
    </main>
  );
}
