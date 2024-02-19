'use client';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { BudgetItem } from '@/app/types';
import useCurrency from '@/app/hooks/useCurrency';

interface IBudgetItemList {
  budgetItems: Array<BudgetItem>;
}

export default function BudgetItemList({ budgetItems }: IBudgetItemList) {
  const { formatCurrency } = useCurrency();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {budgetItems.map((budgetItem) => (
            <TableRow key={budgetItem.id}>
              <TableCell component="th" scope="row">
                {budgetItem.name}
              </TableCell>
              <TableCell align="right">
                {formatCurrency(budgetItem.amount)}
              </TableCell>
              <TableCell>{budgetItem.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell align="right">Total:</TableCell>
            <TableCell align="right">total amount</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
