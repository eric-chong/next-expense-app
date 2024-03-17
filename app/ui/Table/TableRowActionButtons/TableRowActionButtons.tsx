import React from 'react';
import {
  Check as SaveIcon,
  Close as CancelIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { IconButton, TableCell as MuiTableCell } from '@mui/material';

interface ITableRowActionButtons {
  isEditing: boolean;
  onCancel: () => void;
  onDelete: () => void;
  onEdit: () => void;
  onSave: () => void;
}
export default function TableRowActionButtons({
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
            size="small"
            onClick={onSave}
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
          <IconButton aria-label="Delete" size="small" onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </>
      )}
    </MuiTableCell>
  );
}
