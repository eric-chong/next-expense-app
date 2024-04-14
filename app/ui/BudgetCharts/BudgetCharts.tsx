import { BudgetItem, BudgetSummaryData } from '@/app/types';
import { Box, styled } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import BudgetAllocationPieChart from './BudgetAllocationPieChart';
import BudgetExpenseTrends from './BudgetExpenseTrends';

import 'swiper/css';
import 'swiper/css/pagination';

const SwiperContainer = styled(Swiper)(({ theme }) => ({
  width: '100%',
  height: '400px',
}));

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
        <SwiperContainer
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
        </SwiperContainer>
      )}
    </Box>
  );
}
