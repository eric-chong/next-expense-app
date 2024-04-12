import { MouseEventHandler } from 'react';
import { Close as CloseIcon } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface IDrawerHeader {
  title: string;
  onClose?: MouseEventHandler<HTMLButtonElement>;
}

export default function DrawerHeader({
  title,
  onClose = () => {},
}: IDrawerHeader) {
  const theme = useTheme();
  return (
    <Box
      display="flex"
      borderBottom={`1px solid ${theme.palette.divider}`}
      alignItems="center"
    >
      <Box flexGrow="1" padding={{ xs: '0.5rem', sm: '0.5rem', md: '1rem' }}>
        <Typography variant="h6">{title}</Typography>
      </Box>
      <Box
        borderLeft={`1px solid ${theme.palette.divider}`}
        padding={{ xs: '0.5rem', sm: '0.5rem', md: '1rem' }}
      >
        <IconButton size="small" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
