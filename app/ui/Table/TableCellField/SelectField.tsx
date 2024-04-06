import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { IBaseCellField } from './TableCellField';

export default function SelectField({
  column,
  hasError,
  onChange,
  value,
}: IBaseCellField) {
  const [selectValue, setSelectedValue] = useState(value);

  const handleChange = (event: SelectChangeEvent) => {
    const newValue = event.target.value as string;
    setSelectedValue(newValue);
    onChange(newValue);
  };

  return (
    <Select
      value={selectValue ? selectValue : ''}
      error={hasError}
      onChange={handleChange}
      size="small"
    >
      {(column.selectOptions as Array<any>)?.map((option: any) => (
        <MenuItem key={option.id} value={option.id}>
          {option.name}
        </MenuItem>
      ))}
    </Select>
  );
}
