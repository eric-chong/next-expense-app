import { useState } from 'react';
import SaveIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import { newBudgetItemSchema } from '@/app/schemas/budgets';
import { BudgetItem, NewBudgetItem } from '@/app/types';
import useCurrency from '@/app/hooks/useCurrency';

type NewOrEditBudgetItem = BudgetItem | NewBudgetItem;

interface IBudgetItemRow {
  budgetItem: NewOrEditBudgetItem;
  isEditing?: boolean;
  onCancel: () => void;
  onDelete?: (budgetItem: BudgetItem) => void;
  onEdit?: () => void;
  onSave: (budgetItem: NewOrEditBudgetItem) => void;
}

export default function BudgetItemRow({
  budgetItem,
  isEditing = false,
  onCancel,
  onDelete = () => {},
  onEdit = () => {},
  onSave,
}: IBudgetItemRow) {
  const { formatCurrency } = useCurrency();
  const [errorFields, setErrorFields] = useState<Array<string | number>>([]);
  const [editingData, setEditingData] =
    useState<NewOrEditBudgetItem>(budgetItem);

  const handleSave = () => {
    if (validateData(editingData)) {
      onSave(editingData);
    }
  };

  const validateData = (data: NewOrEditBudgetItem) => {
    const result = newBudgetItemSchema.safeParse(data);
    if (!result.success) {
      setErrorFields(result.error.issues.map((issue) => issue.path).flat());
    }
    return result.success;
  };

  const handleDelete = () => onDelete(budgetItem as BudgetItem);

  return (
    <TableRow key={'id' in budgetItem ? budgetItem.id : 'new-budget-item'}>
      <TableCell>
        {isEditing ? (
          <TextField
            id="name"
            autoFocus
            error={errorFields.includes('name')}
            variant="outlined"
            defaultValue={budgetItem.name}
            onChange={(e) =>
              setEditingData((currentData: any) => {
                return { ...currentData, name: e.target.value };
              })
            }
            fullWidth
            size="small"
          />
        ) : (
          budgetItem.name
        )}
      </TableCell>
      <TableCell align="right">
        {isEditing ? (
          <TextField
            id="amount"
            error={errorFields.includes('amount')}
            type="number"
            variant="outlined"
            defaultValue={budgetItem.amount}
            onChange={(e) =>
              setEditingData((currentData: any) => {
                return {
                  ...currentData,
                  amount: Number(e.target.value),
                };
              })
            }
            fullWidth
            size="small"
          />
        ) : (
          formatCurrency(budgetItem.amount)
        )}
      </TableCell>
      <TableCell>
        {isEditing ? (
          <TextField
            id="description"
            error={errorFields.includes('description')}
            variant="outlined"
            defaultValue={budgetItem.description}
            onChange={(e) =>
              setEditingData((currentData: any) => {
                return {
                  ...currentData,
                  description: e.target.value,
                };
              })
            }
            fullWidth
            size="small"
          />
        ) : (
          budgetItem.description
        )}
      </TableCell>
      <TableCell align="right">
        {isEditing ? (
          <>
            <IconButton
              aria-label="Save"
              color="success"
              size="small"
              onClick={handleSave}
            >
              <SaveIcon />
            </IconButton>
            <IconButton
              aria-label="Cancel"
              color="error"
              size="small"
              onClick={onCancel}
            >
              <CancelIcon />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton aria-label="Edit" size="small" onClick={onEdit}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="Delete" size="small" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </TableCell>
    </TableRow>
  );
}
