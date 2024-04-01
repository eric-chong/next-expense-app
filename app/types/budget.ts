export type Budget = {
  id: string;
  startDate: Date;
  endDate: Date;
  userId: string;
};

export type NewBudget = Pick<Budget, 'startDate' | 'endDate'>;

export default Budget;
