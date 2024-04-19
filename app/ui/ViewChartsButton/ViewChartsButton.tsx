import { Button } from '@mui/material';
import InsightsIcon from '@mui/icons-material/Insights';
import { useCallback, useContext } from 'react';
import { DrawerContext } from '@/app/spa/providers/DrawerProvider';

interface IViewChartsButton {
  disabled: boolean;
}
export default function ViewChartsButton({ disabled }: IViewChartsButton) {
  const { setIsOpen: setDrawerOpen } = useContext(DrawerContext);

  const handleClick = useCallback(() => {
    setDrawerOpen((isOpen: boolean) => !isOpen);
  }, [setDrawerOpen]);

  return (
    <Button
      disabled={disabled}
      variant="outlined"
      startIcon={<InsightsIcon />}
      size="small"
      fullWidth
      onClick={handleClick}
    >
      View charts
    </Button>
  );
}
