import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { mangoFusionPalette } from '@mui/x-charts/colorPalettes';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import useCurrency from '@/app/hooks/useCurrency';

interface IAllocationPieChart {
  data: Array<any>;
  total: number;
}
export default function AllocationPieChart({
  data,
  total,
}: IAllocationPieChart) {
  const { formatCurrency } = useCurrency();

  const theme = useTheme();
  const isMediumUp = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <PieChart
      colors={mangoFusionPalette}
      series={[
        {
          data,
          arcLabel: (item) =>
            `${item.label} (${((item.value / total) * 100).toFixed(0)}%)`,
          arcLabelMinAngle: 45,
          valueFormatter: ({ value }) => formatCurrency(value),
          cx: isMediumUp ? 250 : 200,
          cy: isMediumUp ? 200 : 150,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
        },
      ]}
      height={isMediumUp ? 400 : 300}
      width={isMediumUp ? 500 : 400}
      slotProps={{ legend: { hidden: true } }}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
        },
      }}
    />
  );
}
