import { useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { IBaseCellField } from './TableCellField';

export default function AutocompleteField({
  column,
  hasError,
  onChange,
  editingRowData,
  value,
}: IBaseCellField) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    async function fetchOptions() {
      const options = column.selectOptions
        ? await (column.selectOptions as Function)(editingRowData)
        : [];
      setOptions(options);
    }

    fetchOptions();
  }, [column.selectOptions, editingRowData]);

  return (
    <Autocomplete
      freeSolo
      id="free-solo-2-demo"
      defaultValue={value}
      disableClearable
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          InputProps={{
            ...params.InputProps,
            onChange: (e) => onChange(e.target.value),
            error: hasError,
            size: 'small',
          }}
        />
      )}
    />
  );
}
