'use client';
import { useCallback, useState } from 'react';
import { useMatch, useNavigate, useParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import {
  deleteBudgetItem,
  insertBudgetItem,
  updateBudgetItem,
} from '@/app/actions/budgets';
import useCurrency from '@/app/hooks/useCurrency';
import { newBudgetItemSchema } from '@/app/schemas/budgets';
import { BudgetItem, NewBudgetItem } from '@/app/types';
import { Table } from '@/app/ui/Table';
import { Column, Footer } from '@/app/ui/Table/types';

interface IBudgetItemTable {
  budgetItems: Array<BudgetItem>;
  currentBudgetId: string;
}

export default function BudgetItemTable({
  budgetItems,
  currentBudgetId,
}: IBudgetItemTable) {
  const navigate = useNavigate();
  const { sumAndFormatCurrency, formatCurrency } = useCurrency();

  const [isMutating, setIsMutating] = useState(false);

  const newItemMatcher = useMatch('/budgets/:budgetId/items/new');
  const { budgetId, itemId } = useParams();

  const columns: Array<Column> = [
    {
      autoFocus: true,
      headerContent: 'Name',
      name: 'name',
      formControl: 'text',
      sx: { maxWidth: 220 },
    },
    {
      headerContent: 'Amount',
      name: 'amount',
      dataAlign: 'right',
      formControl: 'number',
      valueFormatter: (value: number) => formatCurrency(value),
      sx: { maxWidth: 200 },
    },
    { headerContent: 'Description', name: 'description' },
    {
      headerContent: (
        <Button
          disabled={isMutating}
          variant="outlined"
          size="small"
          startIcon={<AddIcon />}
          onClick={() => navigate(`/budgets/${budgetId}/items/new`)}
        >
          New
        </Button>
      ),
      sx: { width: 100 },
    },
  ];
  const footer: Array<Footer> = [
    { footerContent: 'Totals:', align: 'right' },
    {
      footerContent: sumAndFormatCurrency(
        budgetItems.map((item) => item.amount),
      ),
      align: 'right',
    },
  ];

  const rowDataValidator = useCallback((data: any) => {
    const result = newBudgetItemSchema.safeParse(data);
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
      noItemsMessage="There is no budget items in this period."
      rows={budgetItems}
      rowDataValidator={rowDataValidator}
      newItemRow={
        newItemMatcher
          ? {
              name: '',
              amount: 0,
              description: '',
              budgetId: currentBudgetId,
            }
          : undefined
      }
      onEdit={(id) => {
        navigate(`/budgets/${budgetId}/items/${id}/edit`);
      }}
      onSaveNew={async (newBudgetItem) => {
        if (newBudgetItem) {
          setIsMutating(true);
          await insertBudgetItem(newBudgetItem as NewBudgetItem);
          setIsMutating(false);
          navigate(`/budgets/${budgetId}`);
        }
      }}
      onSave={async (budgetItemToUpdate) => {
        if (budgetItemToUpdate) {
          setIsMutating(true);
          await updateBudgetItem(budgetItemToUpdate as BudgetItem);
          setIsMutating(false);
          navigate(`/budgets/${budgetId}`);
        }
      }}
      onDelete={async (budgetItemToDelete) => {
        if (budgetItemToDelete) {
          setIsMutating(true);
          await deleteBudgetItem(budgetItemToDelete);
          setIsMutating(false);
        }
      }}
      onCancel={() => navigate(`/budgets/${budgetId}`)}
    />
  );
}
