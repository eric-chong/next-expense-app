import PaidIcon from '@mui/icons-material/Paid';
import { lusitana } from '@/app/ui/fonts';
import { Box, Typography } from '@mui/material';

export default function Logo() {
  return (
    <Box
      className={`${lusitana.className}`}
      display="flex"
      flexDirection="row"
      lineHeight="1"
      alignItems="center"
      color="white"
    >
      <PaidIcon sx={{ fontSize: 40, marginRight: '0.5rem' }} />
      <Typography className={`${lusitana.className}`} variant="h4">
        Planner
      </Typography>
    </Box>
  );
}
