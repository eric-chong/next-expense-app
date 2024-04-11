import { BudgetItem } from '@/app/types';
import { Box, Typography } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import useChartColors from '../hooks/useChartColors';

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = (value: any) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent } = value;

  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

interface IBudgetCharts {
  budgetItems: Array<BudgetItem>;
}
export default function BudgetCharts({ budgetItems }: IBudgetCharts) {
  const { getColor } = useChartColors();
  return (
    <Box
      display="flex"
      flexDirection="column"
      padding="1rem"
      alignItems="center"
    >
      <Typography variant="subtitle1" sx={{ fontSize: '1.25rem' }}>
        Budget items allocation
      </Typography>
      <PieChart width={500} height={450}>
        <Pie
          data={budgetItems}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={200}
          dataKey="amount"
        >
          {budgetItems.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getColor(index)} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </Box>
  );
}
