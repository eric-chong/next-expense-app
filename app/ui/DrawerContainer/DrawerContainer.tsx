import { DrawerContext } from '@/app/spa/providers/DrawerProvider';
import { Box, Drawer, DrawerProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ReactNode, useCallback, useContext } from 'react';
import DrawerHeader from './DrawerHeader';

export default function DrawerContainer({
  children,
  drawerProps = {},
  title = '',
}: {
  children: ReactNode | string;
  drawerProps?: DrawerProps;
  title?: string;
}) {
  const { isOpen, setIsOpen: setDrawerIsOpen } = useContext(DrawerContext);
  const theme = useTheme();
  const isMediumUp = useMediaQuery(theme.breakpoints.up('md'));

  const handleClose = useCallback(() => {
    setDrawerIsOpen((isOpen: boolean) => !isOpen);
  }, [setDrawerIsOpen]);

  return (
    <Drawer
      anchor={isMediumUp ? 'right' : 'bottom'}
      open={isOpen}
      onClose={handleClose}
      {...drawerProps}
      PaperProps={{ sx: { maxHeight: { xs: '60%', sm: '60%', md: '100%' } } }}
    >
      <Box minWidth={{ xs: 'auto', sm: 'auto', md: '40rem' }}>
        <DrawerHeader title={title} onClose={() => setDrawerIsOpen(false)} />
        {children}
      </Box>
    </Drawer>
  );
}
