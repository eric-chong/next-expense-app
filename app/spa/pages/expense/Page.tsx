'use client';

import { Box, Typography } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from '@/app/spa/App';
import { BudgetItem, ExpenseItem } from '@/app/types';
import DrawerProvider from '@/app/spa/providers/DrawerProvider';
import GlobalAlertProvider from '@/app/spa/providers/GlobalAlertProvider';
import DrawerContainer from '@/app/ui/DrawerContainer';
import GlobalAlert from '@/app/ui/GlobalAlert';
import SectionHeader from '@/app/ui/SectionHeader';
import ViewChartsButton from '@/app/ui/ViewChartsButton';
import ExpensesPageSkeleton from '@/app/ui/skeletons/expenses';
import { ExpenseItemsTable, MonthNavigator } from './components';
import ExpenseSummaryTable from './components/ExpenseSummaryTable';

interface IPage {
  budgetItems: Array<BudgetItem>;
  expenseItems: Array<ExpenseItem>;
}

export default function Page(props: IPage) {
  const rootRoute = '/expenses/:year/:month';

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

function ExpensesPage({ budgetItems, expenseItems }: IPage) {
  return (
    <main>
      <GlobalAlertProvider>
        <DrawerProvider>
          <GlobalAlert />
          <DrawerContainer title="Expense charts">
            {/* <BudgetCharts budgetItems={budgetItems} summaryData={summaryData} /> */}
            Test
          </DrawerContainer>
          <Box display="flex" flexDirection="column" gap="1rem">
            <Typography variant="h5">Expenses</Typography>
            <Box
              display="flex"
              gap={{ xs: '0.5rem', sm: '0.5rem', md: '1rem' }}
              sx={{
                flexDirection: { xs: 'column', sm: 'column', md: 'row' },
              }}
            >
              <Box flexGrow="1">
                <MonthNavigator />
              </Box>
              <Box padding={{ xs: '0 0.5rem', sm: '0 0.5rem', md: '0' }}>
                <ViewChartsButton disabled={false} />
              </Box>
            </Box>
            <Box
              display="flex"
              sx={{
                flexDirection: { xs: 'column', sm: 'column', md: 'row' },
                gap: { xs: '2rem', sm: '2rem', md: '1rem' },
              }}
            >
              <Box flexGrow="1">
                <SectionHeader>Expense items</SectionHeader>
                <ExpenseItemsTable
                  budgetItems={budgetItems}
                  expenseItems={expenseItems}
                />
              </Box>
              <Box flexBasis="40%">
                <SectionHeader>Expense summary</SectionHeader>
                <ExpenseSummaryTable
                  budgetItems={budgetItems}
                  expenseItems={expenseItems}
                />
              </Box>
            </Box>
          </Box>
        </DrawerProvider>
      </GlobalAlertProvider>
    </main>
  );
}
