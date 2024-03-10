import Box from '@mui/material/Box';
import SideNav from '@/app/ui/SideNav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'column', md: 'row' },
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ flexBasis: { md: '16rem' } }}>
        <SideNav />
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          padding: { sm: '1.5rem', md: '3rem' },
          overflowY: { md: 'auto' },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
