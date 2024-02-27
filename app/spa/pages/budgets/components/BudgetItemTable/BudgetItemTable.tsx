'use client';
import { useMatch, useNavigate, useParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { BudgetItem, NewBudgetItem } from '@/app/types';
import useCurrency from '@/app/hooks/useCurrency';
import { insertBudgetItem, updateBudgetItem } from '@/app/actions/budgets';
import BudgetItemRow from '../BudgetItemRow';

interface IBudgetItemTable {
  budgetItems: Array<BudgetItem>;
  currentBudgetId: string;
}

export default function BudgetItemTable({
  budgetItems,
  currentBudgetId,
}: IBudgetItemTable) {
  const navigate = useNavigate();
  const { sumAndFormatCurrent } = useCurrency();

  const newItemMatcher = useMatch('/budgets/:budgetId/items/new');
  const { budgetId, itemId } = useParams();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: '220px' }}>Name</TableCell>
            <TableCell sx={{ width: '150px' }}>Amount</TableCell>
            <TableCell>Description</TableCell>
            <TableCell sx={{ width: '100px' }}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<AddIcon />}
                onClick={() => navigate(`/budgets/${budgetId}/items/new`)}
              >
                New
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {newItemMatcher && (
            <BudgetItemRow
              isEditing
              budgetItem={{
                name: '',
                amount: 0,
                description: '',
                budgetId: currentBudgetId,
              }}
              onCancel={() => navigate(`/budgets/${budgetId}`)}
              onSave={async (newBudgetItem) => {
                if (newBudgetItem) {
                  console.log('onAdd', newBudgetItem);
                  const result = await insertBudgetItem(
                    newBudgetItem as NewBudgetItem,
                  );
                  console.log('result', result);
                  navigate(`/budgets/${budgetId}`);
                }
              }}
            />
          )}
          {budgetItems.map((budgetItem) => {
            const isEditing: boolean = budgetItem.id === itemId;
            return (
              <BudgetItemRow
                key={budgetItem.id}
                budgetItem={budgetItem}
                isEditing={isEditing}
                onCancel={() => navigate(`/budgets/${budgetId}`)}
                onEdit={() => {
                  navigate(`/budgets/${budgetId}/items/${budgetItem.id}/edit`);
                }}
                onSave={async (updatedBudgetItem) => {
                  if (updatedBudgetItem) {
                    const result = await updateBudgetItem(
                      updatedBudgetItem as BudgetItem,
                    );
                    console.log('result', result);
                    navigate(`/budgets/${budgetId}`);
                  }
                }}
              />
            );
          })}
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
