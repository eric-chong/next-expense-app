'use client';

import { Box } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

const shimmer = keyframes`
  100% {
    transform: translateX(100%);
  }
`;

export const ShimmerBox = styled(Box)(({ theme }) => ({
  '&:after': {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    transform: 'translateX(-100%)',
    backgroundImage: `linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.2) 20%,
      rgba(255, 255, 255, 0.5) 60%,
      rgba(255, 255, 255, 0)
    )`,
    animation: `${shimmer} 2s infinite`,
    content: '""',
  },
}));
