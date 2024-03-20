import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { IBaseCellField } from './TableCellField';

export default function SelectField({
  column,
  onChange,
  value,
}: IBaseCellField) {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as string);
  };

  return (
    <Select value={value} onChange={handleChange} size="small">
      {column.selectOptions?.map((option) => (
        <MenuItem key={option.id} value={option.id}>
          {option.name}
        </MenuItem>
      ))}
    </Select>
  );
}
