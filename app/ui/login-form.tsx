'use client';

import { useFormState, useFormStatus } from 'react-dom';
import {
  Box,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ErrorIcon from '@mui/icons-material/Error';
import KeyIcon from '@mui/icons-material/Key';
import LoginIcon from '@mui/icons-material/Login';
import { authenticate } from '@/app/actions/auth';
import { lusitana } from '@/app/ui/fonts';

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  const status = useFormStatus();

  return (
    <form action={dispatch} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Please log in to continue.
        </h1>
        <div className="w-full">
          <Box display="flex" flexDirection="column" gap="16px">
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
        </div>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ErrorIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <LoadingButton
      className="bg-blue-500" // temporary using tailwind color
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
