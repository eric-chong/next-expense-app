'use client';

import { Box } from '@mui/material';
import NavLinks from '@/app/ui/dashboard/nav-links';
import Logo from '@/app/ui/Logo';
import * as sc from './SideNav.styled';

export default function SideNav() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <sc.LogoLink href="/">
        <Logo />
      </sc.LogoLink>
      <Box sx={{ flexGrow: 1 }}>
        <NavLinks />
      </Box>
    </Box>
  );
}
