import React from 'react';
import { UTCDate } from '@date-fns/utc';
import { TextField as MuiTextField } from '@mui/material';
import DateField from './DateField';
import SelectField from './SelectField';
import { Column, FormControl } from '../types';
import AutocompleteField from './AutocompleteField';

interface ITableCellField {
  fieldType: FormControl;
}

export interface IBaseCellField {
  autoFocus: boolean;
  column: Column;
  editingRowData: any;
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

const CurrencyField = (props: IBaseCellField) => {
  return <NumberField {...props} value={props.value / 100} />;
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
    case 'currency':
      return <CurrencyField {...otherProps} />;
    case 'date':
      return <DateField {...otherProps} />;
    case 'select':
      return <SelectField {...otherProps} />;
    case 'autocomplete':
      return <AutocompleteField {...otherProps} />;
    default:
      return <TextField {...otherProps} />;
  }
}
