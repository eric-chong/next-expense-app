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
        {columns.map(({ headerContent, maxWidth, width }, index) => {
          return (
            <MuiTableCell key={index} sx={{ maxWidth, width }}>
              {headerContent}
            </MuiTableCell>
          );
        })}
      </MuiTableRow>
    </MuiTableHead>
  );
}
