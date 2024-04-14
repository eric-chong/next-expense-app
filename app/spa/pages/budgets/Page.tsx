'use client';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import App from '@/app/spa/App';
import { Budget, BudgetItem, BudgetSummaryData } from '@/app/types';
import BudgetItems from './components/BudgetItems';
import DrawerProvider from '@/app/spa/providers/DrawerProvider';
import GlobalAlertProvider from '@/app/spa/providers/GlobalAlertProvider';
import BudgetPageSkeleton from '@/app/ui/skeletons/budgets';
import DrawerContainer from '@/app/ui/DrawerContainer';
import GlobalAlert from '@/app/ui/GlobalAlert';
import SectionHeader from '@/app/ui/SectionHeader';
import ViewChartsButton from '@/app/ui/ViewChartsButton';
import BudgetNavigator from './components/BudgetNavigator';
import { fillBudgetsWithNewPeriod } from './components/utilHelpers';
import BudgetExpenseSummary from './components/BudgetExpenseSummary';
import BudgetCharts from '@/app/ui/BudgetCharts';

interface IPage {
  budgetItems: Array<BudgetItem>;
  budgets: Array<Budget>;
  currentBudgetId?: string;
  summaryData: BudgetSummaryData;
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

function BudgetPage({
  budgetItems,
  budgets,
  currentBudgetId,
  summaryData,
}: IPage) {
  return (
    <main>
      <GlobalAlertProvider>
        <DrawerProvider>
          <GlobalAlert />
          <DrawerContainer title="Budget charts">
            <BudgetCharts budgetItems={budgetItems} summaryData={summaryData} />
          </DrawerContainer>
          <Box
            display="flex"
            flexDirection="column"
            gap={{ xs: '0.5rem', sm: '0.5rem', md: '1rem' }}
          >
            <Typography variant="h5">Budgets</Typography>
            <Box
              display="flex"
              gap={{ xs: '0.5rem', sm: '0.5rem', md: '1rem' }}
              sx={{
                flexDirection: { xs: 'column', sm: 'column', md: 'row' },
              }}
            >
              <Box flexGrow="1">
                <BudgetNavigator
                  budgets={
                    currentBudgetId
                      ? budgets
                      : fillBudgetsWithNewPeriod(new Date(), budgets)
                  }
                  budgetId={currentBudgetId}
                />
              </Box>
              <Box padding={{ xs: '0 0.5rem', sm: '0 0.5rem', md: '0' }}>
                <ViewChartsButton />
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
                <SectionHeader>Budget items</SectionHeader>
                <BudgetItems
                  budgetItems={budgetItems}
                  currentBudgetId={currentBudgetId}
                />
              </Box>
              <Box maxWidth={{ xs: '100%', sm: '100%', md: '400px' }}>
                <SectionHeader>Budget summary</SectionHeader>
                <BudgetExpenseSummary
                  summaryData={summaryData}
                  budget={budgets.find(
                    (budget) => budget.id === currentBudgetId,
                  )}
                  budgetItems={budgetItems}
                />
              </Box>
            </Box>
          </Box>
        </DrawerProvider>
      </GlobalAlertProvider>
    </main>
  );
}
