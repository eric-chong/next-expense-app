import { useEffect, useState } from 'react';
import { UTCDate } from '@date-fns/utc';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { addMonths, differenceInMonths, format, isBefore } from 'date-fns';
import { sum } from 'mathjs';
import {
  fetchSubtotalPerMonth,
  fetchSubtotalPerMonthBudgeItem,
} from '@/app/data/summarize';
import {
  Budget,
  BudgetItem,
  SubtotalByMonth,
  SubtotalByMonthBudgetItem,
} from '@/app/types';
import useCurrency from '@/app/hooks/useCurrency';
import { StyledBalanceText } from '@/app/ui/StyledBalanceText';

interface IBudgetExpenseSummary {
  budgetItems: Array<BudgetItem>;
  budget?: Budget;
}

type SummaryData = {
  byMonth: Array<SubtotalByMonth>;
  byMonthAndBudgetItem: Array<SubtotalByMonthBudgetItem>;
};

const StickyTableCell = styled(TableCell)(({ theme }) => ({
  position: 'sticky',
  left: 0,
  backgroundColor: theme.palette.background.default,
  borderRight: `1px solid ${theme.palette.divider}`,
}));

export default function BudgetExpenseSummary({
  budget,
  budgetItems,
}: IBudgetExpenseSummary) {
  const [summarizeData, setSummarizeData] = useState<SummaryData | null>(null);
  const [columns, setColumns] = useState<Array<{ month: string }>>([]);
  const { formatCurrency } = useCurrency();

  useEffect(() => {
    async function fetchAndSetupData(budget: Budget) {
      const [subtotalByMoonth, subtotalByMoonthAndBudgetItem] =
        await Promise.all([
          fetchSubtotalPerMonth(budget.id),
          fetchSubtotalPerMonthBudgeItem(budget.id),
        ]);
      setSummarizeData({
        byMonth: subtotalByMoonth,
        byMonthAndBudgetItem: subtotalByMoonthAndBudgetItem,
      });
    }
    if (budget) {
      fetchAndSetupData(budget);
    }
  }, [budget, setSummarizeData]);

  useEffect(() => {
    function getSummaryColumns(budget: Budget) {
      const { startDate, endDate } = budget;

      let columns = [];
      let current = new UTCDate(startDate);
      do {
        columns.push({ month: format(current, 'yyyy-MM') });
        current = addMonths(new UTCDate(current), 1);
      } while (
        endDate
          ? isBefore(current, endDate)
          : differenceInMonths(current, startDate) < 12
      );

      return columns;
    }

    if (budget) {
      setColumns(getSummaryColumns(budget));
    }
  }, [budget, setColumns]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ borderCollapse: 'separate', borderSpacing: 0 }}>
        <TableHead>
          <TableRow>
            <StickyTableCell>Budget Item</StickyTableCell>
            {columns.map(({ month }) => (
              <TableCell key={month} sx={{ minWidth: '5.5rem' }}>
                {month}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {budgetItems.map(({ id, name, amount: budgetItemAmount }) => {
            return (
              <TableRow key={name}>
                <StickyTableCell>{name}</StickyTableCell>
                {columns.map(({ month }) => {
                  const value = summarizeData
                    ? summarizeData.byMonthAndBudgetItem.find(
                        (data) =>
                          data.month === month && data.budgetItemId === id,
                      )
                    : null;
                  return (
                    <TableCell key={month} align="right">
                      <StyledBalanceText
                        alert={
                          value ? value.subtotal > budgetItemAmount : false
                        }
                      >
                        {formatCurrency(value?.subtotal || 0)}
                      </StyledBalanceText>
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <StickyTableCell align="right" sx={{ fontSize: '0.875rem' }}>
              Total:
            </StickyTableCell>
            {columns.map(({ month }) => {
              const value = summarizeData
                ? summarizeData.byMonth.find((data) => data.month === month)
                : null;
              const budgetTotal = sum(budgetItems.map(({ amount }) => amount));
              return (
                <TableCell
                  key={month}
                  align="right"
                  sx={{ fontSize: '0.875rem' }}
                >
                  <StyledBalanceText
                    alert={value ? value.subtotal > budgetTotal : false}
                  >
                    {formatCurrency(value?.subtotal || 0)}
                  </StyledBalanceText>
                </TableCell>
              );
            })}
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
