import { sum } from 'mathjs';
import numeral from 'numeral';

export default function useCurrency() {
  const formatCurrency = (amount: number) => numeral(amount).format('$0,0.00');

  const sumAndFormatCurrency = (values: Array<number>) =>
    formatCurrency(sum(values));

  return { formatCurrency, sumAndFormatCurrency };
}
