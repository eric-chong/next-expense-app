import React, { useCallback } from 'react';
import { UTCDate } from '@date-fns/utc';
import { TableCell as MuiTableCell } from '@mui/material';
import TableCellField from '../TableCellField';

import { Column } from '../types';

interface IEditableTableCell {
  autoFocus: boolean;
  column: Column;
  hasError: boolean;
  isEditing: boolean;
  onChange: (value: string | number | UTCDate | undefined) => void;
  value: any;
}

export default function EditableTableCell({
  autoFocus,
  column,
  hasError,
  isEditing,
  onChange,
  value,
}: IEditableTableCell) {
  const { name, dataAlign, formControl, valueFormatter } = column;

  const formatValue = useCallback(
    (value: any, valueFormatter: Function | undefined) =>
      valueFormatter ? valueFormatter(value) : value,
    [],
  );

  return (
    <MuiTableCell align={dataAlign}>
      {isEditing ? (
        <TableCellField
          autoFocus={autoFocus}
          column={column}
          name={name}
          hasError={hasError}
          fieldType={formControl}
          value={value}
          onChange={onChange}
        />
      ) : (
        formatValue(value, valueFormatter)
      )}
    </MuiTableCell>
  );
}
