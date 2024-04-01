import { styled } from '@mui/material/styles';

interface IStyledBalanceText {
  alert?: boolean;
}

export const StyledBalanceText = styled('div')<IStyledBalanceText>(
  ({ theme, alert = false }) => ({
    color: alert ? theme.palette.error.dark : theme.palette.success.main,
  }),
);
