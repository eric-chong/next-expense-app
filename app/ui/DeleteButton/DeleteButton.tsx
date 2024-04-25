import React, { useRef, useState } from 'react';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { Box, Button, IconButton, Popover, Typography } from '@mui/material';

interface IDeleteButton {
  disabled: boolean;
  onDelete: () => void;
}

export default function DeleteButton({ disabled, onDelete }: IDeleteButton) {
  const anchorEl = useRef(null);
  const [confirmationOpen, setConfirmationOpen] = useState<boolean>(false);

  return (
    <>
      <IconButton
        aria-label="Delete"
        disabled={disabled}
        size="small"
        onClick={() => setConfirmationOpen((open) => !open)}
        ref={anchorEl}
      >
        <DeleteIcon />
      </IconButton>
      <Popover
        open={confirmationOpen}
        anchorEl={anchorEl.current}
        onClose={() => setConfirmationOpen(false)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box
          padding="1rem"
          display="flex"
          gap="1rem"
          flexDirection="column"
          maxWidth="15rem"
        >
          <Typography variant="subtitle1">
            Are you sure you want to delete this item?
          </Typography>
          <Box display="flex" gap="0.5rem">
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setConfirmationOpen(false);
                onDelete();
              }}
              size="small"
            >
              Delete
            </Button>
            <Button onClick={() => setConfirmationOpen(false)} size="small">
              Cancel
            </Button>
          </Box>
        </Box>
      </Popover>
    </>
  );
}
