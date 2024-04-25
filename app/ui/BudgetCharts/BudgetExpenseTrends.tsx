import { useMemo, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { ChartsReferenceLine } from '@mui/x-charts';
import { LineChart } from '@mui/x-charts/LineChart';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import useCurrency from '@/app/hooks/useCurrency';
import { BudgetItem, BudgetSummaryData } from '@/app/types';
import BudgetItemsSelectDropdown from '@/app/ui/BudgetItemsSelectDropdown';

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
      <BudgetItemsSelectDropdown
        allowSingle
        budgetItems={budgetItems}
        onMultiChange={(items: Array<BudgetItem>) => setShowSeries(items)}
        onSingleChange={(budgetItemId: string) =>
          setRefBudgetItemId(budgetItemId)
        }
        triggerButtonLabel="View"
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
        series={
          refBudgetItem
            ? [
                {
                  connectNulls: true,
                  dataKey: refBudgetItem.id,
                  label: refBudgetItem.name,
                  showMark: true,
                  valueFormatter: (value: number) => formatCurrency(value),
                },
                {
                  data: aggregatedSummary.map(() => refBudgetItem.amount),
                  showMark: false,
                  color: theme.palette.error.main,
                  label: 'Budget amount',
                  valueFormatter: (value: number) => formatCurrency(value),
                },
              ]
            : (budgetItems
                .filter((budgetItem) =>
                  showSeries.map((series) => series.id).includes(budgetItem.id),
                )
                .map((budgetItem) => {
                  return {
                    connectNulls: true,
                    dataKey: budgetItem.id,
                    label: budgetItem.name,
                    showMark: true,
                    valueFormatter: (value: number) => formatCurrency(value),
                  };
                }) as Array<any>)
        }
        dataset={aggregatedSummary}
        slotProps={{ legend: { hidden: true } }}
      >
        {refBudgetItem && (
          <ChartsReferenceLine
            y={refBudgetItem.amount}
            label={`${refBudgetItem.name}: ${formatCurrency(refBudgetItem.amount)}`}
            lineStyle={{ stroke: theme.palette.error.main }}
            labelStyle={{ fontSize: '0.85rem' }}
          />
        )}
      </LineChart>
    </Box>
  );
}
