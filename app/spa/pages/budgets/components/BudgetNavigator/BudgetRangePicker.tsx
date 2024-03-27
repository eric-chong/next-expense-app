import React, { useCallback, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { UTCDate } from '@date-fns/utc';
import BudgetDateRange from './BudgetDateRange';

interface IBudgetRangePicker {
  startDate: Date;
  endDate: Date | null;
  onChange: Function;
}

export default function BudgetRangePicker({
  startDate,
  endDate,
  onChange,
}: IBudgetRangePicker) {
  const [hasStartDateError, setHasStartDateError] = useState(false);
  const dateRange = useRef<BudgetDateRange>({ startDate, endDate });

  const handleStartValueChange = useCallback(
    (value: UTCDate | null) => {
      if (value) {
        setHasStartDateError(false);
        dateRange.current = { ...dateRange.current, startDate: value };
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
        dateRange.current = { ...dateRange.current, endDate: value };
        onChange(dateRange.current);
      }
    },
    [onChange],
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box width="9rem">
        <DatePicker
          onChange={handleStartValueChange}
          defaultValue={new UTCDate(startDate)}
          format="yyyy-MM-dd"
          slotProps={{
            textField: { size: 'small', error: hasStartDateError },
          }}
        />
      </Box>
      -
      <Box width="9rem">
        <DatePicker
          onChange={handleEndValueChange}
          defaultValue={endDate ? new UTCDate(endDate) : null}
          format="yyyy-MM-dd"
          slotProps={{ textField: { size: 'small' } }}
        />
      </Box>
    </LocalizationProvider>
  );
}
