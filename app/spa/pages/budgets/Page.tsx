'use client';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from '@/app/spa/App';
import { Budget, BudgetItem } from '@/app/types';
import Budgets from './components/Budgets';
import BudgetPageSkeleton from '@/app/ui/skeletons/budgets';

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
          <Route path={`${rootRoute}/`} element={<Budgets {...props} />} />
          <Route
            path={`${rootRoute}/items/new`}
            element={<Budgets {...props} />}
          />
          <Route
            path={`${rootRoute}/items/:itemId`}
            element={<Budgets {...props} />}
          />
          <Route
            path={`${rootRoute}/items/:itemId/edit`}
            element={<Budgets {...props} />}
          />
        </Routes>
      </Router>
    </App>
  );
}
