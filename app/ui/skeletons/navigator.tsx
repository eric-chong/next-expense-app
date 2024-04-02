'use client';

import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ShimmerBox } from './ShimmerBox';

export default function NavigatorSkeleton() {
  const theme = useTheme();
  return (
    <Box position="relative" display="flex" gap="1rem">
      <Box display="flex" flexGrow="1" justifyContent="flex-end">
        <ShimmerBox
          width="2.25rem"
          height="2.25rem"
          bgcolor={theme.palette.grey[100]}
          marginBottom="1rem"
          borderRadius="2rem"
        />
      </Box>
      <Box lineHeight="2.25rem">
        <ShimmerBox
          width="9rem"
          height="2.25rem"
          bgcolor={theme.palette.grey[100]}
          marginBottom="1rem"
          borderRadius="0.375rem"
        />
      </Box>
      <Box display="flex" flexGrow="1" justifyContent="flex-start">
        <ShimmerBox
          width="2.25rem"
          height="2.25rem"
          bgcolor={theme.palette.grey[100]}
          marginBottom="1rem"
          borderRadius="2rem"
        />
      </Box>
    </Box>
  );
}
