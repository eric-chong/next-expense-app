import React from 'react';
import {
  Check as SaveIcon,
  Close as CancelIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { IconButton, TableCell as MuiTableCell } from '@mui/material';
import DeleteButton from '@/app/ui/DeleteButton';

interface ITableRowActionButtons {
  isActionsDisabled?: boolean;
  isEditing: boolean;
  onCancel: () => void;
  onDelete: () => void;
  onEdit: () => void;
  onSave: () => void;
}
export default function TableRowActionButtons({
  isActionsDisabled,
  isEditing,
  onCancel,
  onDelete,
  onEdit,
  onSave,
}: ITableRowActionButtons) {
  return (
    <MuiTableCell align="right">
      {isEditing ? (
        <>
          <IconButton
            aria-label="Save"
            color="success"
            disabled={isActionsDisabled}
            size="small"
            onClick={onSave}
          >
            <SaveIcon />
          </IconButton>
          <IconButton
            aria-label="Cancel"
            color="error"
            disabled={isActionsDisabled}
            size="small"
            onClick={onCancel}
          >
            <CancelIcon />
          </IconButton>
        </>
      ) : (
        <>
          <IconButton
            aria-label="Edit"
            disabled={isActionsDisabled}
            size="small"
            onClick={onEdit}
          >
            <EditIcon />
          </IconButton>
          <DeleteButton disabled={!!isActionsDisabled} onDelete={onDelete} />
        </>
      )}
    </MuiTableCell>
  );
}
