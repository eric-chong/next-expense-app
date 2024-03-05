import { isAfter, isBefore, isSameDay } from 'date-fns';
import { Budget } from '@/app/types';

const budgetDateMatcherFn = (budget: Budget, date: Date | string) => {
  const isSameDayOrAfterStartDate =
    isSameDay(date, budget.startDate) || isAfter(date, budget.startDate);
  const isSameDayOrBeforeEndDate =
    budget.endDate === null ||
    isSameDay(date, budget.endDate) ||
    isBefore(date, budget.endDate);

  console.log('isSameDay', isSameDay(new Date('2024-03-04'), ''));
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
  console.log('isSameDay', isSameDay(new Date('2024-03-04'), ''));
  console.log('isSameDay', isBefore(new Date('2024-03-04'), ''));
  return budgets.find((budget) => budgetIdMatcherFn(budget, budgetId));
};

export const getBudgetIndexById = (
  budgets: Array<Budget>,
  budgetId: string,
) => {
  return budgets.findIndex((budget) => budgetIdMatcherFn(budget, budgetId));
};
