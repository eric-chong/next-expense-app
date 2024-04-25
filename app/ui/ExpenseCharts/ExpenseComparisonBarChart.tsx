import { useMemo, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { BarChart } from '@mui/x-charts/BarChart';
import { mean } from 'mathjs';
import useCurrency from '@/app/hooks/useCurrency';
import {
  BudgetItem,
  ExpenseSummaryData,
  SubtotalByMonthBudgetItem,
} from '@/app/types';
import BudgetItemsSelectDropdown from '@/app/ui/BudgetItemsSelectDropdown';

interface IPropTypes {
  budgetItems: Array<BudgetItem>;
  budgetItemSubtotals: Array<SubtotalByMonthBudgetItem>;
  expenseSummaryData: Array<ExpenseSummaryData>;
}

export default function ExpenseComparisonBarChart({
  budgetItems,
  budgetItemSubtotals,
  expenseSummaryData,
}: IPropTypes) {
  const [showBudgetItems, setShowBudgetItems] =
    useState<Array<BudgetItem>>(budgetItems);
  const { formatCurrency } = useCurrency();

  const theme = useTheme();
  const isMediumUp = useMediaQuery(theme.breakpoints.up('md'));
  const isSmallUp = useMediaQuery(theme.breakpoints.up('sm'));

  const chartSetting = {
    height: isMediumUp ? 400 : 300,
    width: isSmallUp ? 570 : 400,
    slotProps: { legend: { hidden: true } },
  };

  const valueFormatter = (value: number | null) => formatCurrency(value || 0);

  const dataset = useMemo(() => {
    return budgetItems
      .filter((budgetItem: BudgetItem) =>
        showBudgetItems
          .map((showItems) => showItems.id)
          .includes(budgetItem.id),
      )
      .map((budgetItem: BudgetItem) => {
        const expenseSubtotal = expenseSummaryData.find(
          (summary) => summary.budgetItem.id === budgetItem.id,
        );
        const subtotals = budgetItemSubtotals
          .filter(
            (budgetItemSubtotal) =>
              budgetItemSubtotal.budgetItemId === budgetItem.id,
          )
          .map((budgetItemSubtotal) => budgetItemSubtotal.subtotal);
        return {
          budgetItemName: budgetItem.name,
          subtotal: expenseSubtotal ? expenseSubtotal.subtotal : 0,
          average: subtotals.length ? mean(subtotals) : 0,
          budgetItemAmount: budgetItem.amount,
        };
      });
  }, [budgetItems, budgetItemSubtotals, expenseSummaryData, showBudgetItems]);

  const series = [
    { dataKey: 'subtotal', label: 'Current month subtotal', valueFormatter },
    { dataKey: 'average', label: 'Monthly average', valueFormatter },
    { dataKey: 'budgetItemAmount', label: 'Budget amount', valueFormatter },
  ];

  return (
    <Box
      display="flex"
      position="relative"
      flexDirection="column"
      padding={{ xs: '0.5rem', sm: '0.5rem', md: '1rem' }}
      margin={{ xs: '0.5rem', sm: '0.5rem', md: '1rem' }}
      alignItems="center"
      component={Paper}
    >
      <Typography variant="subtitle1" sx={{ fontSize: '1.25rem' }}>
        Expense comparison by item
      </Typography>
      <BudgetItemsSelectDropdown
        allowSingle={false}
        budgetItems={budgetItems}
        onMultiChange={(items) => setShowBudgetItems(items)}
        triggerButtonLabel="View"
      />
      <BarChart
        dataset={dataset}
        xAxis={[{ scaleType: 'band', dataKey: 'budgetItemName' }]}
        series={series}
        {...chartSetting}
      />
    </Box>
  );
}
