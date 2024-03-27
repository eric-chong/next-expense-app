import React, { useCallback, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { useMatch, useNavigate, useParams } from 'react-router-dom';
import {
  deleteExpenseItem,
  insertExpenseItem,
  updateExpenseItem,
} from '@/app/actions/expenses';
import useCurrency from '@/app/hooks/useCurrency';
import useFormatDate from '@/app/hooks/useFormatDate';
import { newExpenseItemSchema } from '@/app/schemas/expenses';
import { BudgetItem, ExpenseItem, NewExpenseItem } from '@/app/types';
import { Table } from '@/app/ui/Table';
import { Column, Footer } from '@/app/ui/Table/types';

interface IExpenseItemsTable {
  budgetItems: Array<BudgetItem>;
  currentDate: Date;
  expenseItems: Array<ExpenseItem>;
}

export default function ExpenseItemsTable({
  budgetItems,
  currentDate,
  expenseItems,
}: IExpenseItemsTable) {
  const navigate = useNavigate();
  const { sumAndFormatCurrency, formatCurrency } = useCurrency();

  const [isMutating, setIsMutating] = useState(false);

  const newItemMatcher = useMatch('/expenses/items/new');
  const { itemId } = useParams();
  const { formatDate } = useFormatDate();

  const isNewOrEditing = !!newItemMatcher || !!itemId;
  const columns: Array<Column> = [
    {
      headerContent: 'Date',
      name: 'date',
      formControl: 'date',
      valueFormatter: (value: Date) => formatDate(value) || '',
      sx: { maxWidth: 200, minWidth: isNewOrEditing ? 155 : 105 },
    },
    {
      autoFocus: true,
      headerContent: 'Amount',
      name: 'amount',
      dataAlign: 'right',
      formControl: 'number',
      valueFormatter: (value: number) => formatCurrency(value),
      sx: { maxWidth: 200 },
    },
    {
      headerContent: 'Budget Item',
      name: 'budgetItemId',
      formControl: 'select',
      selectOptions: budgetItems,
      valueFormatter: (value: string) => {
        const budgetItem = budgetItems.find(
          (budgetItem: BudgetItem) => budgetItem.id === value,
        );
        return budgetItem ? budgetItem.name : 'unknown';
      },
      sx: { maxWidth: 250 },
    },
    { headerContent: 'Description', name: 'description' },
    {
      headerContent: (
        <Button
          disabled={isMutating}
          variant="outlined"
          size="small"
          startIcon={<AddIcon />}
          onClick={() => navigate(`/expenses/items/new${location.search}`)}
        >
          New
        </Button>
      ),
      sx: { paddingTop: '8px', paddingBottom: '8px', width: 100 },
    },
  ];
  const footer: Array<Footer> = [
    { footerContent: 'Totals:', align: 'right' },
    {
      footerContent: sumAndFormatCurrency(
        expenseItems.map((item) => item.amount),
      ),
      align: 'right',
    },
  ];

  const rowDataValidator = useCallback((data: any) => {
    const result = newExpenseItemSchema.safeParse(data);
    let errors: Array<string | number> = [];
    if (!result.success) {
      errors = result.error.issues.map((issue) => issue.path).flat();
    }
    return {
      success: result.success,
      errors,
    };
  }, []);

  return (
    <Table
      columns={columns}
      editingItemId={itemId}
      footer={footer}
      isActionsDisabled={isMutating}
      minWidth={600}
      noItemsMessage="There is no expense items in this period."
      rows={expenseItems}
      rowDataValidator={rowDataValidator}
      newItemRow={
        newItemMatcher
          ? {
              date: currentDate,
              amount: 0,
              description: '',
              budgetItemId: '',
            }
          : undefined
      }
      onEdit={(id) => {
        navigate(`/expenses/items/${id}/edit${location.search}`);
      }}
      onSaveNew={async (newExpenseItem) => {
        if (newExpenseItem) {
          setIsMutating(true);
          await insertExpenseItem(newExpenseItem as NewExpenseItem);
          setIsMutating(false);
          navigate(`/expenses${location.search}`);
        }
      }}
      onSave={async (expenseItemToUpdate) => {
        if (expenseItemToUpdate) {
          setIsMutating(true);
          await updateExpenseItem(expenseItemToUpdate as ExpenseItem);
          setIsMutating(false);
          navigate(`/expenses${location.search}`);
        }
      }}
      onDelete={async (expenseItemToDelete) => {
        if (expenseItemToDelete) {
          setIsMutating(true);
          await deleteExpenseItem(expenseItemToDelete);
          setIsMutating(false);
        }
      }}
      onCancel={() => navigate(`/expenses${location.search}`)}
    />
  );
}
