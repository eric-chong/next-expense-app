import { Box, Paper, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { BudgetItem, BudgetSummaryData } from '@/app/types';
import useCurrency from '@/app/hooks/useCurrency';
import { useMemo } from 'react';

interface IBudgetExpenseTrends {
  budgetItems: Array<BudgetItem>;
  summaryData: BudgetSummaryData;
}

export default function BudgetExpenseTrends({
  budgetItems,
  summaryData,
}: IBudgetExpenseTrends) {
  const { formatCurrency } = useCurrency();

  const aggregatedSummary = useMemo(() => {
    return summaryData.byMonthAndBudgetItem.reduce((prev, curr) => {
      const index = prev.findIndex((item: any) => item.month === curr.month);
      if (index === -1) {
        prev.push({
          id: prev.length + 1,
          month: curr.month,
          [curr.budgetItemId]: curr.subtotal,
        });
      } else {
        prev.splice(index, 1, {
          ...prev[index],
          [curr.budgetItemId]: curr.subtotal,
        });
      }
      return prev;
    }, [] as Array<any>);
  }, [summaryData]);

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
        Monthly expense trends
      </Typography>
      <LineChart
        height={400}
        xAxis={[
          {
            dataKey: 'id',
            valueFormatter: (value) => {
              return aggregatedSummary[value - 1]
                ? aggregatedSummary[value - 1].month
                : '';
            },
            tickInterval: aggregatedSummary.map((entry) => entry.id),
          },
        ]}
        series={budgetItems.map((budgetItem) => {
          return {
            dataKey: budgetItem.id,
            label: budgetItem.name,
            showMark: true,
            valueFormatter: (value) => formatCurrency(value as number),
            curve: 'linear',
          };
        })}
        dataset={aggregatedSummary}
        slotProps={{ legend: { hidden: true } }}
      />
    </Box>
  );
}
