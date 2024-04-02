'use client';

import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import { ShimmerBox } from './ShimmerBox';

interface ITable {
  columns: Array<{ name: string; width: string }>;
  numberOfRows: number;
}

const Table = styled('table')(({ theme }) => ({
  color: theme.palette.grey[900],
  minWidth: '100%',
}));

const THead = styled(`thead`)(({ theme }) => ({
  fontWeight: 400,
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  textAlign: 'left',
  borderRadius: '0.5rem',
}));

const TBody = styled('tbody')`
  background-color: white;
`;

const TR = styled('tr')`
  height: 3rem;
`;

const TD = styled('td')`
  padding: 0.75rem;
`;
const Cell = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  height: '1.5rem',
}));

const TH = styled('th')<{ width: string }>(({ width }) => ({
  fontWeight: 500,
  padding: '0.75rem 1.25rem',
  width,
}));

export default function TableSkeleton({ columns, numberOfRows }: ITable) {
  const theme = useTheme();

  return (
    <Box position="relative">
      <ShimmerBox
        bgcolor={theme.palette.grey[50]}
        borderRadius="0.5rem"
        padding="0.5rem"
        sx={{ md: { paddingTop: 0 } }}
      >
        <Table>
          <THead>
            <tr>
              {columns.map((column, index: number) => (
                <TH key={index} width={column.width} scope="col">
                  {column.name}
                </TH>
              ))}
            </tr>
          </THead>
          <TBody>
            {Array.from(Array(numberOfRows).keys()).map((value) => (
              <TR key={value}>
                {columns.map((column, index: number) => (
                  <TD key={index}>
                    <Cell />
                  </TD>
                ))}
              </TR>
            ))}
          </TBody>
        </Table>
      </ShimmerBox>
    </Box>
  );
}
