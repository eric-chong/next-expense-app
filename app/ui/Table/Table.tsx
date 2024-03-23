import React from 'react';
import { TableProps as MuiTableProps } from '@mui/material/Table';
import {
  Table as MuiTable,
  TableBody as MuiTableBody,
  TableContainer as MuiTableContainer,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import EditableTableRow from './EditableTableRow';
import TableHead from './TableHead';
import TableFooter from './TableFooter';
import { Column, Footer } from './types';

interface ITable {
  columns: Array<Column>;
  editingItemId?: string | undefined;
  footer?: Array<Footer>;
  minWidth?: number;
  newItemRow?: any;
  onCancel?: () => void;
  onDelete?: (row: any) => void;
  onEdit?: (id: string) => void;
  onSave?: (row: any) => void;
  onSaveNew?: (row: any) => void;
  rowDataValidator?: (row: any) => {
    success: boolean;
    errors: Array<string | number>;
  };
  rows: Array<any>;
}

export default function Table({
  columns,
  editingItemId,
  footer,
  minWidth,
  newItemRow,
  onCancel,
  onDelete,
  onEdit,
  onSave,
  onSaveNew,
  rowDataValidator,
  rows,
  ...otherTableProps
}: ITable & MuiTableProps) {
  return (
    <MuiTableContainer component={Paper}>
      <MuiTable sx={{ minWidth }} {...otherTableProps}>
        <TableHead columns={columns} />
        <MuiTableBody>
          {newItemRow && (
            <EditableTableRow
              key="new-item-row"
              columns={columns}
              row={newItemRow}
              rowDataValidator={rowDataValidator}
              isEditing={true}
              onEdit={onEdit}
              onSave={onSaveNew}
              onDelete={onDelete}
              onCancel={onCancel}
            />
          )}
          {rows.map((row, index) => {
            const isEditing: boolean = editingItemId
              ? row.id === editingItemId
              : false;
            return (
              <EditableTableRow
                key={row.id || index}
                columns={columns}
                row={row}
                rowDataValidator={rowDataValidator}
                isEditing={isEditing}
                onEdit={onEdit}
                onSave={onSave}
                onDelete={onDelete}
                onCancel={onCancel}
              />
            );
          })}
        </MuiTableBody>
        {footer ? <TableFooter footer={footer} /> : null}
      </MuiTable>
    </MuiTableContainer>
  );
}
