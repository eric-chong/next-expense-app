'use client';

import { UTCDate } from '@date-fns/utc';
import { Box, Typography } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from '@/app/spa/App';
import { BudgetItem, ExpenseItem } from '@/app/types';
import { ExpenseItemsTable, MonthNavigator } from './components';
// import BudgetPageSkeleton from '@/app/ui/skeletons/budgets';

interface IPage {
  budgetItems: Array<BudgetItem>;
  currentDate: UTCDate;
  expenseItems: Array<ExpenseItem>;
}

export default function Page(props: IPage) {
  const rootRoute = '/expenses';

  return (
    <App
    // loading={<BudgetPageSkeleton />}
    >
      <Router>
        <Routes>
          <Route path={`${rootRoute}/`} element={<ExpensesPage {...props} />} />
          <Route
            path={`${rootRoute}/items/new`}
            element={<ExpensesPage {...props} />}
          />
          <Route
            path={`${rootRoute}/items/:itemId/edit`}
            element={<ExpensesPage {...props} />}
          />
        </Routes>
      </Router>
    </App>
  );
}

function ExpensesPage({ budgetItems, currentDate, expenseItems }: IPage) {
  return (
    <main>
      <Box display="flex" flexDirection="column" gap="1rem">
        <Typography variant="h5">Expenses</Typography>
        <MonthNavigator date={currentDate} />
        <Box
          display="flex"
          gap="1rem"
          sx={{ flexDirection: { xs: 'column', sm: 'column', md: 'row' } }}
        >
          <Box flexGrow="1">
            <ExpenseItemsTable
              budgetItems={budgetItems}
              expenseItems={expenseItems}
            />
          </Box>
          <Box flexBasis="40%">
            <div>Expense item summary</div>
          </Box>
        </Box>
      </Box>
    </main>
  );
}
