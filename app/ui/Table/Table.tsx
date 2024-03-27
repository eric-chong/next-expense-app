import React from 'react';
import { TableProps as MuiTableProps } from '@mui/material/Table';
import {
  Table as MuiTable,
  TableBody as MuiTableBody,
  TableContainer as MuiTableContainer,
  TableRow as MuiTableRow,
  TableCell as MuiTableCell,
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
  isActionsDisabled?: boolean;
  minWidth?: number;
  noItemsMessage?: string;
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
  isActionsDisabled,
  minWidth,
  noItemsMessage,
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
                isActionsDisabled={isActionsDisabled}
                isEditing={isEditing}
                onEdit={onEdit}
                onSave={onSave}
                onDelete={onDelete}
                onCancel={onCancel}
              />
            );
          })}
          {rows.length === 0 && noItemsMessage && (
            <MuiTableRow>
              <MuiTableCell colSpan={columns.length} align="center">
                {noItemsMessage}
              </MuiTableCell>
            </MuiTableRow>
          )}
        </MuiTableBody>
        {footer ? <TableFooter footer={footer} /> : null}
      </MuiTable>
    </MuiTableContainer>
  );
}
