import React from 'react';
import { UTCDate } from '@date-fns/utc';
import { TextField as MuiTextField } from '@mui/material';
import DateField from './DateField';
import { FormControl } from '../types';

interface ITableCellField {
  fieldType: FormControl;
}

export interface IBaseCellField {
  autoFocus: boolean;
  name?: string;
  hasError: boolean;
  value: any;
  onChange: (value: string | number | UTCDate | undefined) => void;
}

const TextField = ({
  autoFocus,
  name,
  hasError,
  value,
  onChange,
}: IBaseCellField) => {
  return (
    <MuiTextField
      autoFocus={autoFocus}
      id={name}
      error={hasError}
      variant="outlined"
      defaultValue={value}
      onChange={(e) => onChange(e.target.value)}
      fullWidth
      size="small"
    />
  );
};

const NumberField = ({
  autoFocus,
  name,
  hasError,
  value,
  onChange,
}: IBaseCellField) => {
  return (
    <MuiTextField
      autoFocus={autoFocus}
      id={name}
      error={hasError}
      type="number"
      variant="outlined"
      defaultValue={value}
      onChange={(e) => onChange(Number(e.target.value))}
      fullWidth
      size="small"
    />
  );
};

export default function TableCellField({
  fieldType,
  ...otherProps
}: ITableCellField & IBaseCellField) {
  switch (fieldType) {
    case 'text':
      return <TextField {...otherProps} />;
    case 'number':
      return <NumberField {...otherProps} />;
    case 'date':
      return <DateField {...otherProps} />;
    default:
      return <TextField {...otherProps} />;
  }
}
