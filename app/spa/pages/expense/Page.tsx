'use client';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from '@/app/spa/App';
import { ExpenseItem } from '@/app/types';
// import BudgetPageSkeleton from '@/app/ui/skeletons/budgets';

interface IPage {
  expenseItems: Array<ExpenseItem>;
}

export default function Page(props: IPage) {
  const rootRoute = '/expenses';
  console.log('spa page');
  console.log('expense items', props.expenseItems);

  return (
    <App
    // loading={<BudgetPageSkeleton />}
    >
      <Router>
        <Routes>
          <Route path={`${rootRoute}/`} element={<p>Expense page</p>} />
        </Routes>
      </Router>
    </App>
  );
}
