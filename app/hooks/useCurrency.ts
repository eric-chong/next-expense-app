import numeral from 'numeral';

export default function useCurrency() {
  const formatCurrency = (amount: number) => numeral(amount).format('$0,0.00');

  return { formatCurrency };
}
