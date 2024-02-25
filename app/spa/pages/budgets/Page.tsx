'use client';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from '@/app/spa/App';
import { Budget, BudgetItem } from '@/app/types';
import Budgets from './components/Budgets';

interface IPage {
  budgetItems: Array<BudgetItem>;
  budgets: Array<Budget>;
  currentBudgetId?: string;
}

export default function Page(props: IPage) {
  const rootRoute = '/budgets/:budgetId';

  return (
    <App>
      <Router>
        <Routes>
          <Route path={`${rootRoute}/`} element={<Budgets {...props} />} />
          <Route
            path={`${rootRoute}/items/:itemId`}
            element={<Budgets {...props} />}
          />
        </Routes>
      </Router>
    </App>
  );
}
