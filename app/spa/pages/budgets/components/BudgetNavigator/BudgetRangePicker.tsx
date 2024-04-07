import React, { useCallback, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { UTCDate } from '@date-fns/utc';
import BudgetDateRange from './BudgetDateRange';
import { endOfMonth, startOfMonth } from 'date-fns';

interface IBudgetRangePicker {
  startDate: Date;
  endDate: Date;
  onChange: Function;
}

export default function BudgetRangePicker({
  startDate,
  endDate,
  onChange,
}: IBudgetRangePicker) {
  const [hasStartDateError, setHasStartDateError] = useState(false);
  const [hasEndDateError, setHasEndDateError] = useState(false);
  const dateRange = useRef<BudgetDateRange>({ startDate, endDate });

  const handleStartValueChange = useCallback(
    (value: UTCDate | null) => {
      if (value) {
        setHasStartDateError(false);
        dateRange.current = {
          ...dateRange.current,
          startDate: startOfMonth(value),
        };
        onChange(dateRange.current);
      } else {
        setHasStartDateError(true);
      }
    },
    [onChange],
  );

  const handleEndValueChange = useCallback(
    (value: UTCDate | null) => {
      if (value) {
        setHasEndDateError(false);
        dateRange.current = {
          ...dateRange.current,
          endDate: endOfMonth(value),
        };
        onChange(dateRange.current);
      } else {
        setHasEndDateError(true);
      }
    },
    [onChange],
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box width="8rem">
        <DatePicker
          onChange={handleStartValueChange}
          defaultValue={new UTCDate(startDate)}
          format="yyyy-MM"
          slotProps={{
            textField: { size: 'small', error: hasStartDateError },
          }}
          views={['month']}
        />
      </Box>
      -
      <Box width="8rem">
        <DatePicker
          onChange={handleEndValueChange}
          defaultValue={endDate ? new UTCDate(endDate) : null}
          format="yyyy-MM"
          slotProps={{ textField: { size: 'small', error: hasEndDateError } }}
          views={['month']}
        />
      </Box>
    </LocalizationProvider>
  );
}
