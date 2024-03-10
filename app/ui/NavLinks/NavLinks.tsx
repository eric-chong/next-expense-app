'use client';

import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PaymentIcon from '@mui/icons-material/Payment';
import WalletIcon from '@mui/icons-material/Wallet';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { usePathname } from 'next/navigation';
import { signOut } from '@/app/actions/auth';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  {
    name: 'Budgets',
    href: '/budgets/current',
    icon: WalletIcon,
    activeMatcher: /^\/budgets\/.*$/,
  },
  { name: 'Expenses', href: '/expenses', icon: PaymentIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const activeIndex =
    links.findIndex(
      (link) =>
        pathname === link.href ||
        (link.activeMatcher && pathname.match(link.activeMatcher)),
    ) || 0;

  return (
    <Box
      sx={{
        borderRight: { md: 1 },
        borderBottom: { xs: 1, sm: 1, md: 0 },
        borderColor: 'divider',
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: { xs: 'row', sm: 'row', md: 'column' },
      }}
    >
      <Tabs
        orientation={isSmallScreen ? 'horizontal' : 'vertical'}
        value={activeIndex}
        sx={{ padding: { md: '0.5rem 0' }, flexGrow: 1 }}
      >
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Tab
              key={link.name}
              href={link.href}
              icon={<LinkIcon />}
              iconPosition="start"
              label={link.name}
              sx={{ minHeight: '60px', justifyContent: 'flex-start' }}
            />
          );
        })}
      </Tabs>
      <Tabs
        orientation={isSmallScreen ? 'horizontal' : 'vertical'}
        value={false}
      >
        <Tab
          label="Sign Out"
          icon={<ExitToAppIcon />}
          iconPosition="start"
          onClick={async () => await signOut()}
          sx={{ minHeight: '60px', justifyContent: 'flex-start' }}
        />
      </Tabs>
    </Box>
  );
}
