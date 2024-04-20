import { useMemo } from 'react';
import { sum } from 'mathjs';
import { Box, Paper, Typography } from '@mui/material';
import { ExpenseSummaryData } from '@/app/types';
import AllocationPieChart from '@/app/ui/AllocationPieChart';

interface IExpenseAllocationPieChart {
  expenseSummaryData: Array<ExpenseSummaryData>;
}

export default function ExpenseAllocationPieChart({
  expenseSummaryData,
}: IExpenseAllocationPieChart) {
  const data = useMemo(
    () =>
      expenseSummaryData.map(
        ({ budgetItem: { id, name: label }, subtotal: value }) => {
          return { id, value, label };
        },
      ),
    [expenseSummaryData],
  );

  const total: number = useMemo(
    () => sum(expenseSummaryData.map(({ subtotal }) => subtotal)),
    [expenseSummaryData],
  );

  return (
    <Box
      display="flex"
      flexDirection="column"
      padding={{ xs: '0.5rem', sm: '0.5rem', md: '1rem' }}
      margin={{ xs: '0.5rem', sm: '0.5rem', md: '1rem' }}
      alignItems="center"
      component={Paper}
    >
      <Typography variant="subtitle1" sx={{ fontSize: '1.25rem' }}>
        Expense allocation
      </Typography>
      <AllocationPieChart data={data} total={total} />
    </Box>
  );
}
