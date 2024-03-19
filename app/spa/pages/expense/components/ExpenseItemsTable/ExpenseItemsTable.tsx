import React, { useCallback } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { format } from 'date-fns';
import { useMatch, useNavigate, useParams } from 'react-router-dom';
import useCurrency from '@/app/hooks/useCurrency';
import useFormatDate from '@/app/hooks/useFormatDate';
import { BudgetItem, ExpenseItem } from '@/app/types';
import { Table } from '@/app/ui/Table';
import { Column, Footer } from '@/app/ui/Table/types';

interface IExpenseItemsTable {
  budgetItems: Array<BudgetItem>;
  expenseItems: Array<ExpenseItem>;
}

export default function ExpenseItemsTable({
  budgetItems,
  expenseItems,
}: IExpenseItemsTable) {
  const navigate = useNavigate();
  const { sumAndFormatCurrent, formatCurrency } = useCurrency();

  const newItemMatcher = useMatch('/expenses/items/new');
  const { itemId } = useParams();
  const { formatDate } = useFormatDate();

  const columns: Array<Column> = [
    {
      headerContent: 'Date',
      name: 'date',
      maxWidth: 200,
      formControl: 'date',
      valueFormatter: (value: Date) => formatDate(value) || '',
    },
    {
      autoFocus: true,
      headerContent: 'Amount',
      name: 'amount',
      maxWidth: 200,
      dataAlign: 'right',
      formControl: 'number',
      valueFormatter: (value: number) => formatCurrency(value),
    },
    {
      headerContent: 'Budget Item',
      name: 'budgetItemId',
      maxWidth: 250,
      formControl: 'select',
      valueFormatter: (value: string) => {
        const budgetItem = budgetItems.find(
          (budgetItem: BudgetItem) => budgetItem.id === value,
        );
        return budgetItem ? budgetItem.name : 'unknown';
      },
    },
    { headerContent: 'Description', name: 'description' },
    {
      headerContent: (
        <Button
          variant="outlined"
          size="small"
          startIcon={<AddIcon />}
          onClick={() => navigate(`/expenses/items/new${location.search}`)}
        >
          New
        </Button>
      ),
      width: 100,
    },
  ];
  const footer: Array<Footer> = [
    { footerContent: 'Totals:', align: 'right' },
    {
      footerContent: sumAndFormatCurrent(
        expenseItems.map((item) => item.amount),
      ),
      align: 'right',
    },
  ];

  const rowDataValidator = useCallback((data: any) => {
    // const result = newBudgetItemSchema.safeParse(data);
    // let errors: Array<string | number> = [];
    // if (!result.success) {
    //   errors = result.error.issues.map((issue) => issue.path).flat();
    // }
    // return {
    //   success: result.success,
    //   errors,
    // };
    return {
      success: true,
      errors: [],
    };
  }, []);

  return (
    <Table
      columns={columns}
      editingItemId={itemId}
      footer={footer}
      minWidth={650}
      rows={expenseItems}
      rowDataValidator={rowDataValidator}
      newItemRow={
        newItemMatcher
          ? {
              date: format(new Date(), 'yyyy-MM-dd'),
              amount: 0,
              description: '',
              budgetItemId: undefined,
            }
          : undefined
      }
      onEdit={(id) => {
        navigate(`/expenses/items/${id}/edit${location.search}`);
      }}
      onSaveNew={async (newExpenseItem) => {
        console.log('save new', newExpenseItem);
        // if (newBudgetItem) {
        //   await insertBudgetItem(newBudgetItem as NewBudgetItem);
        //   navigate(`/budgets/${budgetId}`);
        // }
      }}
      onSave={async (expenseItemToUpdate) => {
        console.log('save', expenseItemToUpdate);
        // if (budgetItemToUpdate) {
        //   await updateBudgetItem(budgetItemToUpdate as BudgetItem);
        //   navigate(`/budgets/${budgetId}`);
        // }
      }}
      onDelete={async (expenseItemToDelete) => {
        console.log('delete', expenseItemToDelete);
        // if (budgetItemToDelete) {
        //   await deleteBudgetItem(budgetItemToDelete);
        // }
      }}
      onCancel={() => navigate(`/expenses${location.search}`)}
    />
  );
}
