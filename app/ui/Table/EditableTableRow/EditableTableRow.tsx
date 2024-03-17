import React, { useCallback, useState, useRef } from 'react';
import { TableRow as MuiTableRow } from '@mui/material';
import EditableTableCell from '../EditableTableCell';
import TableRowActionButtons from '../TableRowActionButtons';
import { Column } from '../types';

interface IEditableTableRow {
  columns: Array<Column>;
  isEditing: boolean;
  onSave: (row: any) => void;
  onCancel: () => void;
  onDelete: (row: any) => void;
  onEdit: (id: string) => void;
  row: any;
  rowDataValidator?: (row: any) => {
    success: boolean;
    errors: Array<string | number>;
  };
}

export default function EditableTableRow({
  columns,
  isEditing,
  onCancel,
  onDelete,
  onEdit,
  onSave,
  row,
  rowDataValidator,
}: IEditableTableRow) {
  const editingData = useRef(row);
  const [errorFields, setErrorFields] = useState<Array<string | number>>([]);

  const handleSave = useCallback(() => {
    if (rowDataValidator) {
      const { success, errors } = rowDataValidator(editingData.current);
      if (!success) {
        setErrorFields(errors);
        return;
      }
      setErrorFields([]);
      onSave(editingData.current);
    }
  }, [onSave, rowDataValidator]);

  const handleEdit = useCallback(() => {
    const { id } = row;
    onEdit(id);
  }, [row, onEdit]);

  const handleDelete = useCallback(() => {
    onDelete(row);
  }, [row, onDelete]);

  const handleValueChange = useCallback((name: any, value: any) => {
    editingData.current = {
      ...editingData.current,
      [name]: value,
    };
  }, []);

  const autoFocusColumnIndex = columns.findIndex((column) => column.autoFocus);

  return (
    <MuiTableRow>
      {columns.map((column, index) => {
        const { name } = column;
        return name ? (
          <EditableTableCell
            autoFocus={autoFocusColumnIndex === index}
            hasError={errorFields.includes(name)}
            isEditing={isEditing}
            key={name}
            column={column}
            value={row[name]}
            onChange={handleValueChange.bind(null, name)}
          />
        ) : null;
      })}
      <TableRowActionButtons
        isEditing={isEditing}
        onSave={handleSave}
        onCancel={onCancel}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </MuiTableRow>
  );
}
