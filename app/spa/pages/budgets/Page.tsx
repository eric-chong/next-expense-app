'use client';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import App from '@/app/spa/App';
import { Budget, BudgetItem } from '@/app/types';
import BudgetItems from './components/BudgetItems';
import GlobalAlertProvider from '@/app/spa/providers/GlobalAlertProvider';
import BudgetPageSkeleton from '@/app/ui/skeletons/budgets';
import GlobalAlert from '@/app/ui/GlobalAlert';
import BudgetNavigator from './components/BudgetNavigator';
import { fillBudgetsWithNewPeriod } from './components/utilHelpers';
import BudgetExpenseSummary from './components/BudgetExpenseSummary';

interface IPage {
  budgetItems: Array<BudgetItem>;
  budgets: Array<Budget>;
  currentBudgetId?: string;
}

export default function Page(props: IPage) {
  const rootRoute = '/budgets/:budgetId';

  return (
    <App loading={<BudgetPageSkeleton />}>
      <Router>
        <Routes>
          <Route path={`${rootRoute}/`} element={<BudgetPage {...props} />} />
          <Route
            path={`${rootRoute}/items/new`}
            element={<BudgetPage {...props} />}
          />
          <Route
            path={`${rootRoute}/items/:itemId`}
            element={<BudgetPage {...props} />}
          />
          <Route
            path={`${rootRoute}/items/:itemId/edit`}
            element={<BudgetPage {...props} />}
          />
        </Routes>
      </Router>
    </App>
  );
}

function BudgetPage({ budgetItems, budgets, currentBudgetId }: IPage) {
  return (
    <main>
      <GlobalAlertProvider>
        <GlobalAlert />
        <Box display="flex" flexDirection="column" gap="1rem">
          <Typography variant="h5">Budgets</Typography>
          <BudgetNavigator
            budgets={
              currentBudgetId
                ? budgets
                : fillBudgetsWithNewPeriod(new Date(), budgets)
            }
            budgetId={currentBudgetId}
          />
          <Box
            display="flex"
            gap="1rem"
            sx={{ flexDirection: { xs: 'column', sm: 'column', md: 'row' } }}
          >
            <Box flexGrow="1">
              <BudgetItems
                budgetItems={budgetItems}
                currentBudgetId={currentBudgetId}
              />
            </Box>
            <Box maxWidth={{ xs: '100%', sm: '100%', md: '400px' }}>
              <BudgetExpenseSummary
                budget={budgets.find((budget) => budget.id === currentBudgetId)}
                budgetItems={budgetItems}
              />
            </Box>
          </Box>
        </Box>
      </GlobalAlertProvider>
    </main>
  );
}
