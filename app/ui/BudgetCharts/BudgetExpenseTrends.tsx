import { useMemo, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { ChartsReferenceLine } from '@mui/x-charts';
import { LineChart } from '@mui/x-charts/LineChart';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { BudgetItem, BudgetSummaryData } from '@/app/types';
import useCurrency from '@/app/hooks/useCurrency';
import BudgetExpenseTrendsView from './BudgetExpenseTrendsView';

interface IBudgetExpenseTrends {
  budgetItems: Array<BudgetItem>;
  summaryData: BudgetSummaryData;
}

export default function BudgetExpenseTrends({
  budgetItems,
  summaryData,
}: IBudgetExpenseTrends) {
  const [showSeries, setShowSeries] = useState<Array<BudgetItem>>(budgetItems);
  const [refBudgetItemId, setRefBudgetItemId] = useState<string | null>(null);

  const refBudgetItem = budgetItems.find(
    (budgetItem) => budgetItem.id === refBudgetItemId,
  );

  const { formatCurrency } = useCurrency();

  const theme = useTheme();
  const isMediumUp = useMediaQuery(theme.breakpoints.up('md'));

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
      position="relative"
      padding={{ xs: '0.5rem', sm: '0.5rem', md: '1rem' }}
      margin={{ xs: '0.5rem', sm: '0.5rem', md: '1rem' }}
      alignItems="center"
      component={Paper}
    >
      <BudgetExpenseTrendsView
        budgetItems={budgetItems}
        onShowSeriesChange={(items: Array<BudgetItem>) => setShowSeries(items)}
        onReferenceBudgetItemIdChange={(budgetItemId: string) =>
          setRefBudgetItemId(budgetItemId)
        }
      />
      <Typography variant="subtitle1" sx={{ fontSize: '1.25rem' }}>
        Monthly expense trends
      </Typography>
      <LineChart
        height={isMediumUp ? 400 : 300}
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
        series={budgetItems
          .filter((budgetItem) =>
            refBudgetItemId
              ? budgetItem.id === refBudgetItemId
              : showSeries.map((series) => series.id).includes(budgetItem.id),
          )
          .map((budgetItem) => {
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
      >
        {refBudgetItem && (
          <ChartsReferenceLine
            y={refBudgetItem.amount}
            label={`${refBudgetItem.name}: ${formatCurrency(refBudgetItem.amount)}`}
            lineStyle={{ stroke: 'red' }}
            labelStyle={{ fontSize: '0.85rem' }}
          />
        )}
      </LineChart>
    </Box>
  );
}
