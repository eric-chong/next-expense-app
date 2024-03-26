'use client';

import { useState, MouseEventHandler } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import {
  Alert,
  Box,
  FormControl,
  Link,
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

const GoogleIcon = () => {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none">
      <g fillRule="evenodd" clipRule="evenodd">
        <path
          d="M20.64 12.2c0-.63-.06-1.25-.16-1.84H12v3.49h4.84a4.14 4.14 0 0 1-1.8 2.71v2.26h2.92a8.78 8.78 0 0 0 2.68-6.61z"
          fill="#4285F4"
        ></path>
        <path
          d="M12 21a8.6 8.6 0 0 0 5.96-2.18l-2.91-2.26a5.41 5.41 0 0 1-8.09-2.85h-3v2.33A9 9 0 0 0 12 21z"
          fill="#34A853"
        ></path>
        <path
          d="M6.96 13.71a5.41 5.41 0 0 1 0-3.42V7.96h-3a9 9 0 0 0 0 8.08l3-2.33z"
          fill="#FBBC05"
        ></path>
        <path
          d="M12 6.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58A9 9 0 0 0 3.96 7.96l3 2.33A5.36 5.36 0 0 1 12 6.6z"
          fill="#EA4335"
        ></path>
      </g>
    </svg>
  );
};

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  const [showCredentialForm, setShowCredentialForm] = useState<boolean>(false);

  return (
    <form action={dispatch}>
      <Box padding="2rem">
        <Typography variant="subtitle1" gutterBottom>
          Please sign in to continue.
        </Typography>

        <Box display="flex" flexDirection="column" gap="16px" width="100%">
          <GoogleLoginButton
            onClick={() => {
              const formData = new FormData();
              formData.append('provider', 'google');
              dispatch(formData);
            }}
          />

          <Box display="flex" justifyContent="center">
            <Link
              href="#"
              onClick={() => setShowCredentialForm((value) => !value)}
              variant="body2"
            >
              Or sign in with email and password
            </Link>
          </Box>
          {showCredentialForm && (
            <>
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
            </>
          )}
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

function GoogleLoginButton({
  onClick,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  const [pending, setPending] = useState<boolean>(false);
  return (
    <LoadingButton
      disabled={pending}
      loading={pending}
      startIcon={<GoogleIcon />}
      onClick={(e) => {
        setPending(true);
        onClick(e);
      }}
      variant="outlined"
    >
      Sign in with Google
    </LoadingButton>
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
      variant="outlined"
    >
      Log in
    </LoadingButton>
  );
}
