import useCurrency from '@/app/hooks/useCurrency';
import { StyledBalanceText } from '@/app/ui/StyledBalanceText';

interface IBudgetItemBalance {
  value: number;
}

export default function BudgetItemBalance({ value }: IBudgetItemBalance) {
  const { formatCurrency } = useCurrency();
  return (
    <StyledBalanceText alert={value < 0}>
      {formatCurrency(value)}
    </StyledBalanceText>
  );
}
