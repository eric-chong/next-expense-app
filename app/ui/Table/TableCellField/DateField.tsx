import React, { useCallback } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { UTCDate } from '@date-fns/utc';
import { IBaseCellField } from './TableCellField';

export default function DateField({ value, onChange }: IBaseCellField) {
  const handleValueChange = useCallback(
    (value: UTCDate | null) => {
      onChange(value ? new UTCDate(value) : undefined);
    },
    [onChange],
  );
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        onChange={handleValueChange}
        defaultValue={value ? new UTCDate(value) : null}
        format="yyyy-MM-dd"
        slotProps={{ textField: { size: 'small' } }}
      />
    </LocalizationProvider>
  );
}
