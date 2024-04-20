import { useMemo } from 'react';
import { sum } from 'mathjs';
import { BudgetItem, ExpenseItem, ExpenseSummaryData } from '@/app/types';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import DrawerSwiperContainer from '@/app/ui/DrawerSwiperContainer';
import ExpenseAllocationPieChart from './ExpenseAllocationPieChart';

import 'swiper/css';
import 'swiper/css/pagination';

interface IExpenseCharts {
  budgetItems: Array<BudgetItem>;
  expenseItems: Array<ExpenseItem>;
}
export default function ExpenseCharts({
  budgetItems,
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
  console.log('expenseSummaryData', expenseSummaryData);

  return (
    <Box display="flex" flexDirection="column">
      {isMediumUp ? (
        <>
          <ExpenseAllocationPieChart expenseSummaryData={expenseSummaryData} />
          {/* Bar: Expense vs avg vs budget amount */}
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
          {/* <SwiperSlide>
            Bar: Expense vs avg vs budget amount
          </SwiperSlide>  */}
        </DrawerSwiperContainer>
      )}
    </Box>
  );
}
