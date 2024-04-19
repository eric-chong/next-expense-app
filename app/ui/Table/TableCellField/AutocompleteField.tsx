import { useEffect, useRef, useState } from 'react';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { IBaseCellField } from './TableCellField';

export default function AutocompleteField({
  column,
  hasError,
  onChange,
  editingRowData,
  value,
}: IBaseCellField) {
  const prevEditingRowData = useRef(editingRowData);
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loadingOptions, setLoadingOptions] = useState(false);

  useEffect(() => {
    async function fetchOptions() {
      setLoadingOptions(true);
      const options = column.selectOptions
        ? await (column.selectOptions as Function)(editingRowData)
        : [];
      setLoadingOptions(false);
      setOptions(options);
    }

    if (isOpen && options.length === 0) {
      fetchOptions();
    }
  }, [isOpen, options.length, column.selectOptions, editingRowData]);

  useEffect(() => {
    const { name } = column;
    if (name && prevEditingRowData.current[name] === editingRowData[name]) {
      setOptions([]);
    }
    prevEditingRowData.current = editingRowData;
  }, [editingRowData]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Autocomplete
      freeSolo
      id="free-solo-2-demo"
      defaultValue={value}
      disableClearable
      options={options}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      onChange={(event: any, newValue: string) => onChange(newValue)}
      loading={loadingOptions}
      renderInput={(params) => (
        <TextField
          {...params}
          InputProps={{
            ...params.InputProps,
            onChange: (e) => onChange(e.target.value),
            endAdornment: (
              <>
                {loadingOptions ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
            error: hasError,
            size: 'small',
          }}
        />
      )}
    />
  );
}
