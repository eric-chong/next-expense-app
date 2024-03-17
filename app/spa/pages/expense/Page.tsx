'use client';

import { UTCDate } from '@date-fns/utc';
import { Box, Typography } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from '@/app/spa/App';
import { ExpenseItem } from '@/app/types';
import { MonthNavigator } from './components';
// import BudgetPageSkeleton from '@/app/ui/skeletons/budgets';

interface IPage {
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
        </Routes>
      </Router>
    </App>
  );
}

function ExpensesPage({ currentDate, expenseItems }: IPage) {
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
            <div>Expense item list</div>
          </Box>
          <Box flexBasis="300px">
            <div>Expense item summary</div>
          </Box>
        </Box>
      </Box>
    </main>
  );
}