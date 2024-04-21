import { useMemo } from 'react';
import { sum } from 'mathjs';
import {
  BudgetItem,
  ExpenseItem,
  ExpenseSummaryData,
  SubtotalByMonthBudgetItem,
} from '@/app/types';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import DrawerSwiperContainer from '@/app/ui/DrawerSwiperContainer';
import ExpenseAllocationPieChart from './ExpenseAllocationPieChart';
import ExpenseComparisonBarChart from './ExpenseComparisonBarChart';

import 'swiper/css';
import 'swiper/css/pagination';

interface IExpenseCharts {
  budgetItems: Array<BudgetItem>;
  budgetItemSubtotals: Array<SubtotalByMonthBudgetItem>;
  expenseItems: Array<ExpenseItem>;
}
export default function ExpenseCharts({
  budgetItems,
  budgetItemSubtotals,
  expenseItems,
}: IExpenseCharts) {
  const theme = useTheme();
  const isMediumUp = useMediaQuery(theme.breakpoints.up('md'));

  const expenseSummaryData: Array<ExpenseSummaryData> = useMemo(() => {
    return budgetItems.map((budgetItem: BudgetItem) => {
      const subtotal: number = sum(
        expenseItems
          .filter((item: ExpenseItem) => item.budgetItemId === budgetItem.id)
          .map((item: ExpenseItem) => item.amount),
      );
      return {
        budgetItem,
        subtotal,
      };
    });
  }, [budgetItems, expenseItems]);

  return (
    <Box display="flex" flexDirection="column">
      {isMediumUp ? (
        <>
          <ExpenseAllocationPieChart expenseSummaryData={expenseSummaryData} />
          <ExpenseComparisonBarChart
            budgetItems={budgetItems}
            budgetItemSubtotals={budgetItemSubtotals}
            expenseSummaryData={expenseSummaryData}
          />
        </>
      ) : (
        <DrawerSwiperContainer
          pagination={{ clickable: true }}
          modules={[Pagination]}
        >
          <SwiperSlide>
            <ExpenseAllocationPieChart
              expenseSummaryData={expenseSummaryData}
            />
          </SwiperSlide>
          <SwiperSlide>
            <ExpenseComparisonBarChart
              budgetItems={budgetItems}
              budgetItemSubtotals={budgetItemSubtotals}
              expenseSummaryData={expenseSummaryData}
            />
          </SwiperSlide>
        </DrawerSwiperContainer>
      )}
    </Box>
  );
}
