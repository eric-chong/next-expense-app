import { isAfter, isBefore, isSameDay } from 'date-fns';
import { Budget } from '@/app/types';

const budgetDateMatcherFn = (budget: Budget, date: Date | string) => {
  const isSameDayOrAfterStartDate =
    isSameDay(date, budget.startDate) || isAfter(date, budget.startDate);
  const isSameDayOrBeforeEndDate =
    isSameDay(date, budget.endDate) || isBefore(date, budget.endDate);
  return (
    isSameDayOrAfterStartDate &&
    (isSameDayOrBeforeEndDate || budget.endDate === null)
  );
};

export const getBudgetByDate = (
  budgets: Array<Budget>,
  date: Date | string,
) => {
  return budgets.find((budget) => budgetDateMatcherFn(budget, date));
};

const budgetIdMatcherFn = (budget: Budget, budgetId: string) =>
  budget.id === budgetId;

export const getBudgetById = (budgets: Array<Budget>, budgetId: string) => {
  return budgets.find((budget) => budgetIdMatcherFn(budget, budgetId));
};

export const getBudgetIndexById = (
  budgets: Array<Budget>,
  budgetId: string,
) => {
  return budgets.findIndex((budget) => budgetIdMatcherFn(budget, budgetId));
};
