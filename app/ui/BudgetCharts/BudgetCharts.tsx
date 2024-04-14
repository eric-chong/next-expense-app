import { BudgetItem, BudgetSummaryData } from '@/app/types';
import { Box } from '@mui/material';
import BudgetAllocationPieChart from './BudgetAllocationPieChart';
import BudgetExpenseTrends from './BudgetExpenseTrends';

interface IBudgetCharts {
  budgetItems: Array<BudgetItem>;
  summaryData: BudgetSummaryData;
}
export default function BudgetCharts({
  budgetItems,
  summaryData,
}: IBudgetCharts) {
  return (
    <Box display="flex" flexDirection="column">
      <BudgetAllocationPieChart budgetItems={budgetItems} />
      <BudgetExpenseTrends
        budgetItems={budgetItems}
        summaryData={summaryData}
      />
    </Box>
  );
}
