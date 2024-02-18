import { isAfter, isBefore, isSameDay } from 'date-fns';
import { Budget } from '@/app/types';

export default function useGetBudget() {
  const getCurrentBudget = (budgets: Array<Budget>, date: Date | string) => {
    return budgets.find((budget) => {
      const isSameDayOrAfterStartDate =
        isSameDay(date, budget.startDate) || isAfter(date, budget.startDate);
      const isSameDayOrBeforeEndDate =
        isSameDay(date, budget.endDate) || isBefore(date, budget.endDate);
      return (
        isSameDayOrAfterStartDate &&
        (isSameDayOrBeforeEndDate || budget.endDate === null)
      );
    });
  };

  return {
    getCurrentBudget,
  };
}
