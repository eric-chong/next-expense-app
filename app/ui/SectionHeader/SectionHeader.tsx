import { ReactNode } from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

interface ISectionHeader {
  children: ReactNode;
}

const TypographySc = styled(Typography)(({ theme }) => ({
  marginBottom: '0.5rem',
}));

export default function SectionHeader({ children }: ISectionHeader) {
  return <TypographySc variant="h6">{children}</TypographySc>;
}
