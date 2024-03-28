import { isAfter, isBefore, isSameDay } from 'date-fns';
import { Budget, NewBudget } from '@/app/types';

const budgetDateMatcherFn = (budget: Budget, date: Date | string) => {
  const isSameDayOrAfterStartDate =
    isSameDay(date, budget.startDate) || isAfter(date, budget.startDate);
  const isSameDayOrBeforeEndDate =
    budget.endDate === null ||
    isSameDay(date, budget.endDate) ||
    isBefore(date, budget.endDate);

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

const budgetIdMatcherFn = (
  budget: Budget | NewBudget,
  budgetId: string | undefined,
) => (budget as Budget).id === budgetId;

export const getBudgetById = (budgets: Array<Budget>, budgetId: string) => {
  return budgets.find((budget) => budgetIdMatcherFn(budget, budgetId));
};

export const getBudgetIndexById = (
  budgets: Array<Budget | NewBudget>,
  budgetId: string | undefined,
) => {
  return budgets.findIndex((budget) => budgetIdMatcherFn(budget, budgetId));
};
