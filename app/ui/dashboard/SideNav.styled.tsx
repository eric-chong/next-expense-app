import { styled } from '@mui/material/styles';
import Link from 'next/link';

export const LogoLink = styled(Link)(({ theme }) => ({
  width: '100%',
  height: '4.5rem',
  padding: '1rem',
  backgroundColor: theme.palette.primary.dark,
}));
