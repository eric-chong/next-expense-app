'use client';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Typography } from '@mui/material';
import App from '@/app/spa/App';
import { Budget, BudgetItem } from '@/app/types';
import BudgetItems from './components/BudgetItems';
import GlobalAlertProvider from '@/app/spa/providers/GlobalAlertProvider';
import BudgetPageSkeleton from '@/app/ui/skeletons/budgets';
import GlobalAlert from '@/app/ui/GlobalAlert';
import BudgetNavigator from './components/BudgetNavigator';
import { fillBudgetsWithNewPeriod } from './components/utilHelpers';

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
          <BudgetItems
            budgetItems={budgetItems}
            currentBudgetId={currentBudgetId}
          />
        </div>
      </GlobalAlertProvider>
    </main>
  );
}
