import React from 'react';
import {
  TableCell as MuiTableCell,
  TableFooter as MuiTableFooter,
  TableRow as MuiTableRow,
} from '@mui/material';
import { Footer } from '../types';

interface ITableFooter {
  footer: Array<Footer>;
}

export default function TableFooter({ footer }: ITableFooter) {
  return (
    <MuiTableFooter>
      <MuiTableRow>
        {footer.map((cell, index) => (
          <MuiTableCell
            key={index}
            align={cell.align}
            sx={{ fontSize: '0.875rem' }}
          >
            {cell.footerContent}
          </MuiTableCell>
        ))}
      </MuiTableRow>
    </MuiTableFooter>
  );
}
