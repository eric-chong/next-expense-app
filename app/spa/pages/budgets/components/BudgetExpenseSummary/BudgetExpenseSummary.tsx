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
import { Budget, BudgetItem, BudgetSummaryData } from '@/app/types';
import useCurrency from '@/app/hooks/useCurrency';
import { StyledBalanceText } from '@/app/ui/StyledBalanceText';

interface IBudgetExpenseSummary {
  budgetItems: Array<BudgetItem>;
  budget?: Budget;
  summaryData: BudgetSummaryData;
}

const StickyTableCell = styled(TableCell)(({ theme }) => ({
  position: 'sticky',
  left: 0,
  backgroundColor: theme.palette.background.default,
  borderRight: `1px solid ${theme.palette.divider}`,
}));

export default function BudgetExpenseSummary({
  budget,
  budgetItems,
  summaryData,
}: IBudgetExpenseSummary) {
  const [columns, setColumns] = useState<Array<{ month: string }>>([]);
  const { formatCurrency } = useCurrency();

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
                  const value = summaryData.byMonthAndBudgetItem.find(
                    (data) => data.month === month && data.budgetItemId === id,
                  );
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
              const value = summaryData.byMonth.find(
                (data) => data.month === month,
              );
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
