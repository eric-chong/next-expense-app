'use client';

import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Logo from '@/app/ui/Logo';

export default function LogoHeader() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '100%',
        height: '4.5rem',
        padding: '1rem',
        backgroundColor: theme.palette.primary.dark,
      }}
    >
      <Logo />
    </Box>
  );
}
