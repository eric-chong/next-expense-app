import { Box, Typography } from '@mui/material';
import NavigatorSkeleton from './navigator';
import TableSkeleton from './table';

export default function ExpensesPageSkeleton() {
  return (
    <Box display="flex" flexDirection="column" gap="1rem">
      <Typography variant="h5">Expenses</Typography>
      <NavigatorSkeleton />

      <Box
        display="flex"
        gap="1rem"
        sx={{ flexDirection: { xs: 'column', sm: 'column', md: 'row' } }}
      >
        <Box flexGrow="1">
          <TableSkeleton
            columns={[
              { name: 'Date', width: '30%' },
              { name: 'Amount', width: '30%' },
              { name: 'Description', width: '40%' },
            ]}
            numberOfRows={6}
          />
        </Box>
        <Box flexBasis="40%">
          <TableSkeleton
            columns={[
              { name: 'Budget Item', width: '40%' },
              { name: 'Used', width: '30%' },
              { name: 'Balance', width: '30%' },
            ]}
            numberOfRows={6}
          />
        </Box>
      </Box>
    </Box>
  );
}
