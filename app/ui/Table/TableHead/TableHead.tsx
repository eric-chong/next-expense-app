import React from 'react';
import {
  TableHead as MuiTableHead,
  TableRow as MuiTableRow,
  TableCell as MuiTableCell,
} from '@mui/material';
import { Column } from '../types';

interface ITableHead {
  columns: Array<Column>;
}
export default function TableHead({ columns }: ITableHead) {
  return (
    <MuiTableHead>
      <MuiTableRow>
        {columns.map(({ headerContent, sx }, index) => {
          return (
            <MuiTableCell key={index} sx={sx}>
              {headerContent}
            </MuiTableCell>
          );
        })}
      </MuiTableRow>
    </MuiTableHead>
  );
}
