import { addDays, addYears, isAfter, isBefore, subDays } from 'date-fns';
import { Budget, NewBudget } from '@/app/types';

export function fillBudgetsWithNewPeriod(
  date: Date,
  budgets: Array<Budget>,
): Array<Budget | NewBudget> {
  return budgets.reduce(
    (accumulator: (Budget | NewBudget)[], current: Budget, index: number) => {
      const isFirstItem = index === 0;
      const isLastItem = index === budgets.length - 1;
      const isBeforeCurrentStartDate = isBefore(date, current.startDate);
      const isAfterCurrentEndDate = current.endDate
        ? isAfter(date, current.endDate)
        : false;
      const isBeforeNextStartDate = !isLastItem
        ? isBefore(date, budgets[index + 1].startDate)
        : false;
      if (isFirstItem && isBeforeCurrentStartDate) {
        const newBudget: NewBudget = {
          startDate: date,
          endDate: subDays(current.startDate, 1),
        };
        accumulator.push(newBudget);
        accumulator.push(current);
      } else if (isLastItem && current.endDate && isAfterCurrentEndDate) {
        const newBudget: NewBudget = {
          startDate: addDays(current.endDate, 1),
          endDate: addYears(current.endDate, 1),
        };
        accumulator.push(current);
        accumulator.push(newBudget);
      } else if (
        isAfterCurrentEndDate &&
        current.endDate &&
        isBeforeNextStartDate
      ) {
        const newBudget: NewBudget = {
          startDate: addDays(current.endDate, 1),
          endDate: subDays(budgets[index + 1].startDate, 1),
        };
        accumulator.push(current);
        accumulator.push(newBudget);
      } else {
        accumulator.push(current);
      }
      return accumulator;
    },
    [],
  );
}
