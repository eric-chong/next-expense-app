import { useState } from 'react';
import SaveIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import { BudgetItem } from '@/app/types';
import useCurrency from '@/app/hooks/useCurrency';

interface IBudgetItemRow {
  budgetItem: BudgetItem;
  isEditing?: boolean;
  onCancel: () => void;
  onEdit: () => void;
  onSave: (budgetItem: BudgetItem) => void;
}
export default function BudgetItemRow({
  budgetItem,
  isEditing = false,
  onCancel,
  onEdit,
  onSave,
}: IBudgetItemRow) {
  const { formatCurrency } = useCurrency();
  const [editingData, setEditingData] = useState<BudgetItem>(budgetItem);

  const handleSave = () => onSave(editingData);

  return (
    <TableRow key={budgetItem.id}>
      <TableCell>
        {isEditing ? (
          <TextField
            id="name"
            required
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
            required
            type="number"
            variant="outlined"
            defaultValue={budgetItem.amount}
            onChange={(e) =>
              setEditingData((currentData: any) => {
                return {
                  ...currentData,
                  amount: e.target.value,
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
            <IconButton
              aria-label="Delete"
              size="small"
              onClick={() => {
                console.log('delete', budgetItem.id);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </TableCell>
    </TableRow>
  );
}
