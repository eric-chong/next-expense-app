import { sum } from 'mathjs';
import useCurrency from '@/app/hooks/useCurrency';
import { BudgetItem, ExpenseItem } from '@/app/types';
import { Table } from '@/app/ui/Table';
import { Column, Footer } from '@/app/ui/Table/types';

interface IExpenseSummaryTable {
  expenseItems: Array<ExpenseItem>;
  budgetItems: Array<BudgetItem>;
}

export default function ExpenseSummaryTable({
  expenseItems,
  budgetItems,
}: IExpenseSummaryTable) {
  const { formatCurrency, sumAndFormatCurrency } = useCurrency();

  const columns: Array<Column> = [
    {
      headerContent: 'Budget Item',
      name: 'name',
    },
    {
      headerContent: 'Used',
      name: 'used',
      dataAlign: 'right',
      valueFormatter: (value: number) => formatCurrency(value),
    },
    {
      headerContent: 'Balance',
      name: 'balance',
      dataAlign: 'right',
      valueFormatter: (value: number) => formatCurrency(value),
    },
  ];

  const rows = budgetItems.map(({ id, name, amount: budgetItemAmount }) => {
    const used: number = sum(
      expenseItems
        .filter((item) => item.budgetItemId === id)
        .map((item) => item.amount),
    );
    const balance = budgetItemAmount - used;
    return {
      name,
      used,
      balance,
    };
  });

  const footer: Array<Footer> = [
    { footerContent: 'Totals:', align: 'right' },
    {
      footerContent: sumAndFormatCurrency(rows.map((row) => row.used)),
      align: 'right',
    },
    {
      footerContent: sumAndFormatCurrency(rows.map((row) => row.balance)),
      align: 'right',
    },
  ];

  return <Table columns={columns} footer={footer} rows={rows} />;
}
