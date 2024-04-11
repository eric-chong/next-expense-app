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

  const handleClose = useCallback(() => {
    setDrawerIsOpen((isOpen: boolean) => !isOpen);
  }, [setDrawerIsOpen]);

  const isMediumUp = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Drawer
      anchor={isMediumUp ? 'right' : 'bottom'}
      open={isOpen}
      onClose={handleClose}
      {...drawerProps}
      PaperProps={{ sx: { maxHeight: { xs: '50%', sm: '50%', md: '100%' } } }}
    >
      <Box minWidth="40rem">
        <DrawerHeader title={title} onClose={() => setDrawerIsOpen(false)} />
        {children}
      </Box>
    </Drawer>
  );
}
