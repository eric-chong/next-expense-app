import { isAfter, isBefore, isSameDay } from 'date-fns';
import { Budget } from '@/app/types';

export default function useGetBudget() {
  const budgetMatcherFn = (budget: Budget, date: Date | string) => {
    const isSameDayOrAfterStartDate =
      isSameDay(date, budget.startDate) || isAfter(date, budget.startDate);
    const isSameDayOrBeforeEndDate =
      isSameDay(date, budget.endDate) || isBefore(date, budget.endDate);
    return (
      isSameDayOrAfterStartDate &&
      (isSameDayOrBeforeEndDate || budget.endDate === null)
    );
  };

  const getBudget = (budgets: Array<Budget>, date: Date | string) => {
    return budgets.find((budget) => budgetMatcherFn(budget, date));
  };

  const getBudgetIndex = (budgets: Array<Budget>, date: Date | string) => {
    return budgets.findIndex((budget) => budgetMatcherFn(budget, date));
  };

  return {
    getBudget,
    getBudgetIndex,
  };
}
