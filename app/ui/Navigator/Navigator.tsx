import { ReactNode } from 'react';
import { Box, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material/';

interface INavigator {
  children: string | ReactNode;
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
}
export default function Navigator({
  children,
  hasNext,
  hasPrev,
  onNext,
  onPrev,
}: INavigator) {
  return (
    <Box display="flex" gap="1rem">
      <Box display="flex" flexGrow="1" justifyContent="flex-end">
        <IconButton
          aria-label="Previous"
          size="small"
          disabled={!hasPrev}
          onClick={onPrev}
        >
          <ChevronLeft />
        </IconButton>
      </Box>
      <Box lineHeight="2.15rem">{children}</Box>
      <Box display="flex" flexGrow="1" justifyContent="flex-start">
        <IconButton
          aria-label="Next"
          size="small"
          disabled={!hasNext}
          onClick={onNext}
        >
          <ChevronRight />
        </IconButton>
      </Box>
    </Box>
  );
}
