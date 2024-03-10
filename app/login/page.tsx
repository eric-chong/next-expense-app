import { Box, Card, CardContent } from '@mui/material';
import LogoHeader from '@/app/ui/LogoHeader';
import LoginForm from '@/app/ui/login-form';

export default function LoginPage() {
  return (
    <main>
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Card sx={{ marginTop: '1rem', flexBasis: '400px' }} variant="outlined">
          <CardContent
            sx={{
              padding: 0,
              '&:last-child': {
                paddingBottom: 0,
              },
            }}
          >
            <LogoHeader />
            <LoginForm />
          </CardContent>
        </Card>
      </Box>
    </main>
  );
}
