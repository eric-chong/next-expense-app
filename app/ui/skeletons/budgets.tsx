import { Box, Typography } from '@mui/material';
import NavigatorSkeleton from './navigator';
import TableSkeleton from './table';

export default function BudgetPageSkeleton() {
  return (
    <Box display="flex" flexDirection="column" gap="1rem">
      <Typography variant="h5">Budgets</Typography>
      <NavigatorSkeleton />

      <Box
        display="flex"
        gap="1rem"
        sx={{ flexDirection: { xs: 'column', sm: 'column', md: 'row' } }}
      >
        <Box flexGrow="1">
          <TableSkeleton
            columns={[
              { name: 'Name', width: '30%' },
              { name: 'Amount', width: '30%' },
              { name: 'Description', width: '40%' },
            ]}
            numberOfRows={6}
          />
        </Box>
        <Box maxWidth={{ xs: '100%', sm: '100%', md: '400px' }}>
          <TableSkeleton
            columns={[
              { name: 'Budget Item', width: '40%' },
              { name: 'Month', width: '30%' },
              { name: 'Month', width: '30%' },
            ]}
            numberOfRows={6}
          />
        </Box>
      </Box>
    </Box>
  );
}
