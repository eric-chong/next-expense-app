'use client';

import { Box, Typography } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from '@/app/spa/App';
import { BudgetItem, ExpenseItem } from '@/app/types';
import GlobalAlertProvider from '@/app/spa/providers/GlobalAlertProvider';
import ExpensesPageSkeleton from '@/app/ui/skeletons/expenses';
import { ExpenseItemsTable, MonthNavigator } from './components';
import ExpenseSummaryTable from './components/ExpenseSummaryTable';
import GlobalAlert from '@/app/ui/GlobalAlert';

interface IPage {
  budgetItems: Array<BudgetItem>;
  currentDate: Date;
  expenseItems: Array<ExpenseItem>;
}

export default function Page(props: IPage) {
  const rootRoute = '/expenses';

  return (
    <App loading={<ExpensesPageSkeleton />}>
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
      <GlobalAlertProvider>
        <GlobalAlert />
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
                currentDate={currentDate}
                budgetItems={budgetItems}
                expenseItems={expenseItems}
              />
            </Box>
            <Box flexBasis="40%">
              <ExpenseSummaryTable
                budgetItems={budgetItems}
                expenseItems={expenseItems}
              />
            </Box>
          </Box>
        </Box>
      </GlobalAlertProvider>
    </main>
  );
}
