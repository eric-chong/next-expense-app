'use client';

import { useFormState, useFormStatus } from 'react-dom';
import {
  Alert,
  Box,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  Typography,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import LoginIcon from '@mui/icons-material/Login';
import { authenticate } from '@/app/actions/auth';

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <form action={dispatch}>
      <Box padding="2rem">
        <Typography variant="subtitle1" gutterBottom>
          Please log in to continue.
        </Typography>
        <Box display="flex" flexDirection="column" gap="16px" width="100%">
          <FormControl variant="standard" sx={{ width: '100%' }}>
            <InputLabel htmlFor="login-email">
              Enter your email address
            </InputLabel>
            <Input
              id="login-email"
              type="email"
              name="email"
              required
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl variant="standard" sx={{ width: '100%' }}>
            <InputLabel htmlFor="login-password">Enter password</InputLabel>
            <Input
              id="login-password"
              type="password"
              name="password"
              required
              startAdornment={
                <InputAdornment position="start">
                  <KeyIcon />
                </InputAdornment>
              }
            />
          </FormControl>
          <LoginButton />
        </Box>
        {errorMessage && (
          <Alert
            variant="outlined"
            severity="error"
            sx={{ marginTop: '1rem', paddingTop: 0, paddingBottom: 0 }}
          >
            {errorMessage}
          </Alert>
        )}
      </Box>
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <LoadingButton
      disabled={pending}
      loading={pending}
      endIcon={<LoginIcon />}
      type="submit"
      variant="contained"
    >
      Log in
    </LoadingButton>
  );
}
