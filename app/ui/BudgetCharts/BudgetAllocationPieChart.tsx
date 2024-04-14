import { BudgetItem } from '@/app/types';
import { Box, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { sum } from 'mathjs';
import useCurrency from '@/app/hooks/useCurrency';
import { useMemo } from 'react';

interface IBudgetAllocationPieChart {
  budgetItems: Array<BudgetItem>;
}

export default function BudgetAllocationPieChart({
  budgetItems,
}: IBudgetAllocationPieChart) {
  const { formatCurrency } = useCurrency();

  const theme = useTheme();
  const isMediumUp = useMediaQuery(theme.breakpoints.up('md'));

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
      <PieChart
        series={[
          {
            data,
            arcLabel: (item) =>
              `${item.label} (${((item.value / total) * 100).toFixed(0)}%)`,
            arcLabelMinAngle: 45,
            valueFormatter: ({ value }) => formatCurrency(value),
            cx: isMediumUp ? 250 : 200,
            cy: isMediumUp ? 200 : 150,
            highlightScope: { faded: 'global', highlighted: 'item' },
            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
          },
        ]}
        height={isMediumUp ? 400 : 300}
        width={isMediumUp ? 500 : 400}
        slotProps={{ legend: { hidden: true } }}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: 'white',
          },
        }}
      />
    </Box>
  );
}
