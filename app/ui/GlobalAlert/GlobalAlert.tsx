import { useContext } from 'react';
import { GlobalAlertContext } from '@/app/spa/providers/GlobalAlertProvider';
import { Alert, Box } from '@mui/material';

export default function GlobalAlert() {
  const { error, resetError } = useContext(GlobalAlertContext);
  return error ? (
    <Box
      display="flex"
      justifyContent="center"
      position="absolute"
      width="100%"
      left="0"
      top="1rem"
    >
      <Alert
        onClose={() => resetError()}
        severity="error"
        sx={{ maxWidth: { xs: '100%', sm: '100%', md: '60%' } }}
      >
        {error}
      </Alert>
    </Box>
  ) : null;
}
