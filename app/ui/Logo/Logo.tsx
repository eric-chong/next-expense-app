import PaidIcon from '@mui/icons-material/Paid';
import { lusitana } from '@/app/ui/fonts';
import { Box, Typography } from '@mui/material';
import * as sc from './Logo.styles';

export default function Logo() {
  return (
    <Box
      display="flex"
      flexDirection="row"
      lineHeight="1"
      alignItems="center"
      color="white"
    >
      <PaidIcon sx={{ fontSize: 40, marginRight: '0.5rem' }} />
      <sc.LogoText className={`${lusitana.className}`}>Planner</sc.LogoText>
    </Box>
  );
}
