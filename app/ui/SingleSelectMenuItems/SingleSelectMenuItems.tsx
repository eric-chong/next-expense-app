import {
  Divider,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface ISingleSelectMenuItems {
  dividerLabel?: string;
  items: Array<any>;
  selectedItem: any | null;
  onChange: (item: any) => void;
}

export default function SingleSelectMenuItems({
  dividerLabel,
  items,
  selectedItem,
  onChange,
}: ISingleSelectMenuItems) {
  const theme = useTheme();

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
      <RadioGroup
        value={selectedItem ? selectedItem.id : ''}
        onChange={(e) => onChange(e.target.value)}
      >
        <MenuItem>
          <FormControlLabel
            value={''}
            control={<Radio />}
            label="None"
            sx={{ height: '1.25rem' }}
          />
        </MenuItem>

        {items.map((item) => (
          <MenuItem key={item.id}>
            <FormControlLabel
              key={item.id}
              value={item.id}
              control={<Radio />}
              label={item.name}
              sx={{ height: '1.25rem' }}
            />
          </MenuItem>
        ))}
      </RadioGroup>
    </>
  );
}
