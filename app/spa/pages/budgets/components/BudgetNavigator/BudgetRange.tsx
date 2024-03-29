'use client';

import { useCallback, useRef, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import {
  Check as SaveIcon,
  Close as CancelIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { insertBudget, updateBudget } from '@/app/actions/budgets';
import useFormatDate from '@/app/hooks/useFormatDate';
import { Budget, NewBudget } from '@/app/types';
import BudgetDateRange from './BudgetDateRange';
import BudgetRangePicker from './BudgetRangePicker';
import { ErrorResponse } from '@/app/actions/types';

interface IBudgetRange {
  currentBudget: Budget | NewBudget;
}

export default function BudgetRange({ currentBudget }: IBudgetRange) {
  const { startDate, endDate } = currentBudget;
  const budgetToUpdate = useRef<Budget | NewBudget>(currentBudget);
  const [isEditing, setIsEditing] = useState<boolean>(
    isNewBudget(currentBudget),
  );
  const [isMutating, setIsMutating] = useState<boolean>(false);
  const { formatDate } = useFormatDate();

  function isNewBudget(budget: Budget | NewBudget) {
    return !budget.hasOwnProperty('id');
  }

  const handleSave = useCallback(async () => {
    setIsMutating(true);
    let result;
    if (!isNewBudget(budgetToUpdate.current)) {
      result = await updateBudget(budgetToUpdate.current as Budget);
    } else {
      result = await insertBudget(budgetToUpdate.current as NewBudget);
    }
    if ((result as ErrorResponse).errors.length > 0) handleError(result);

    setIsMutating(false);
    setIsEditing(false);
  }, [setIsMutating]);

  const handleError = (result: any) => {
    console.log('error mutating', result);
  };

  return (
    <Box display="flex" gap="0.15rem" alignItems="center">
      {isEditing ? (
        <>
          <BudgetRangePicker
            startDate={startDate}
            endDate={endDate}
            onChange={(dateRange: BudgetDateRange) => {
              budgetToUpdate.current = { ...currentBudget, ...dateRange };
              console.log('budgetToUpdate', budgetToUpdate.current);
            }}
          />
          <IconButton
            disabled={isMutating}
            size="small"
            sx={{ width: '1.75rem', height: '1.75rem' }}
            onClick={handleSave}
          >
            <SaveIcon color="success" fontSize="small" />
          </IconButton>
          <IconButton
            disabled={isMutating}
            size="small"
            sx={{ width: '1.75rem', height: '1.75rem' }}
            onClick={() => setIsEditing(false)}
          >
            <CancelIcon color="error" fontSize="small" />
          </IconButton>
        </>
      ) : (
        <>
          <div>{`${formatDate(startDate)} - ${formatDate(endDate)}`}</div>
          <IconButton
            size="small"
            sx={{ width: '1.75rem', height: '1.75rem' }}
            onClick={() => setIsEditing(true)}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </>
      )}
    </Box>
  );
}
