import { useMemo } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { sum } from 'mathjs';
import { BudgetItem } from '@/app/types';
import AllocationPieChart from '@/app/ui/AllocationPieChart';

interface IBudgetAllocationPieChart {
  budgetItems: Array<BudgetItem>;
}

export default function BudgetAllocationPieChart({
  budgetItems,
}: IBudgetAllocationPieChart) {
  const data = useMemo(
    () =>
      budgetItems.map(({ id, amount: value, name: label }) => {
        return { id, value, label };
      }),
    [budgetItems],
  );
  const total = useMemo(
    () => sum(budgetItems.map(({ amount }) => amount)),
    [budgetItems],
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
        Budget items allocation
      </Typography>
      <AllocationPieChart data={data} total={total} />
    </Box>
  );
}
