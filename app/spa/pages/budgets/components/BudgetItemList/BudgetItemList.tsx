'use client';
import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useMatch, useNavigate, useParams } from 'react-router-dom';
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
  const navigate = useNavigate();
  const { formatCurrency, sumAndFormatCurrent } = useCurrency();
  const newItemMatcher = useMatch('/budgets/:budgetId/items/new');
  console.log('newItemMatcher', newItemMatcher);
  const { budgetId, itemId } = useParams();
  console.log('params', budgetId, itemId);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: '220px' }}>Name</TableCell>
            <TableCell sx={{ width: '150px' }}>Amount</TableCell>
            <TableCell>Description</TableCell>
            <TableCell sx={{ width: '100px' }} />
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
              <TableCell align="right">
                <IconButton
                  aria-label="Edit"
                  size="small"
                  onClick={() => {
                    navigate(
                      `/budgets/${budgetId}/items/${budgetItem.id}/edit`,
                    );
                  }}
                >
                  <EditIcon />
                </IconButton>
                {/* <IconButton
                  aria-label="Delete"
                  size="small"
                  onClick={() => {
                    console.log('delete', budgetItem.id);
                  }}
                >
                  <DeleteIcon />
                </IconButton> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell align="right">Total:</TableCell>
            <TableCell align="right">
              {sumAndFormatCurrent(budgetItems.map((item) => item.amount))}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
