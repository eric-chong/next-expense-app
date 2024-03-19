import { styled } from '@mui/material/styles';
import useCurrency from '@/app/hooks/useCurrency';

interface IBudgetItemBalance {
  value: number;
}

const BudgetItemBalanceSc = styled('div')<IBudgetItemBalance>(
  ({ theme, value }) => ({
    color: value < 0 ? theme.palette.error.dark : theme.palette.success.main,
  }),
);

export default function BudgetItemBalance({ value }: IBudgetItemBalance) {
  const { formatCurrency } = useCurrency();
  return (
    <BudgetItemBalanceSc value={value}>
      {formatCurrency(value)}
    </BudgetItemBalanceSc>
  );
}
