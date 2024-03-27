'use client';

import { useCallback, useRef, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import {
  Check as SaveIcon,
  Close as CancelIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import useFormatDate from '@/app/hooks/useFormatDate';
import { Budget } from '@/app/types';
import BudgetDateRange from './BudgetDateRange';
import BudgetRangePicker from './BudgetRangePicker';

interface IBudgetRange {
  currentBudget: Budget;
}

export default function BudgetRange({ currentBudget }: IBudgetRange) {
  const { startDate, endDate } = currentBudget;
  const budgetToUpdate = useRef<Budget>(currentBudget);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { formatDate } = useFormatDate();

  const handleSave = useCallback(() => {
    if (budgetToUpdate.current.id) {
      // update
      console.log('to update', budgetToUpdate.current);
    } else {
      // insert
      console.log('to insert', budgetToUpdate.current);
    }
  }, []);
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
            size="small"
            sx={{ width: '1.75rem', height: '1.75rem' }}
            onClick={handleSave}
          >
            <SaveIcon color="success" fontSize="small" />
          </IconButton>
          <IconButton
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
