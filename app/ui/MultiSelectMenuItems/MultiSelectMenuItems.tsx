import {
  Checkbox,
  Divider,
  FormControlLabel,
  MenuItem,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface IMultiSelectMenuItems {
  disabled: boolean;
  dividerLabel?: string;
  items: Array<any>;
  selectedItems: Array<any>;
  onChange: (items: any) => void;
}

export default function MultiSelectMenuItems({
  disabled,
  dividerLabel,
  items,
  selectedItems,
  onChange,
}: IMultiSelectMenuItems) {
  const theme = useTheme();

  const handleItemToggle = (item: any) => {
    const selectedIndex = selectedItems.findIndex(
      (selected) => selected.id === item.id,
    );
    if (selectedIndex > -1) {
      onChange(selectedItems.filter((selected) => selected.id != item.id));
    } else {
      onChange([...selectedItems, item]);
    }
  };

  return (
    <>
      <Divider textAlign="center" component="div" role="presentation">
        <Typography
          variant="subtitle1"
          sx={{ fontSize: '0.85rem', color: theme.palette.text.secondary }}
        >
          {dividerLabel}
        </Typography>
      </Divider>
      {items.map((item) => (
        <MenuItem key={item.name} onClick={() => {}}>
          <FormControlLabel
            disabled={disabled}
            control={
              <Checkbox
                checked={selectedItems
                  .map((selected) => selected.id)
                  .includes(item.id)}
                size="small"
              />
            }
            label={item.name}
            sx={{ height: '1.25rem' }}
            onChange={() => handleItemToggle(item)}
          />
        </MenuItem>
      ))}
    </>
  );
}
