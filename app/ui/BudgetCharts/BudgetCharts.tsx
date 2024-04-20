import { BudgetItem, BudgetSummaryData } from '@/app/types';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import DrawerSwiperContainer from '@/app/ui/DrawerSwiperContainer';
import BudgetAllocationPieChart from './BudgetAllocationPieChart';
import BudgetExpenseTrends from './BudgetExpenseTrends';

import 'swiper/css';
import 'swiper/css/pagination';

interface IBudgetCharts {
  budgetItems: Array<BudgetItem>;
  summaryData: BudgetSummaryData;
}

export default function BudgetCharts({
  budgetItems,
  summaryData,
}: IBudgetCharts) {
  const theme = useTheme();
  const isMediumUp = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box display="flex" flexDirection="column">
      {isMediumUp ? (
        <>
          <BudgetAllocationPieChart budgetItems={budgetItems} />
          <BudgetExpenseTrends
            budgetItems={budgetItems}
            summaryData={summaryData}
          />
        </>
      ) : (
        <DrawerSwiperContainer
          pagination={{ clickable: true }}
          modules={[Pagination]}
        >
          <SwiperSlide>
            <BudgetAllocationPieChart budgetItems={budgetItems} />
          </SwiperSlide>
          <SwiperSlide>
            <BudgetExpenseTrends
              budgetItems={budgetItems}
              summaryData={summaryData}
            />
          </SwiperSlide>
        </DrawerSwiperContainer>
      )}
    </Box>
  );
}
