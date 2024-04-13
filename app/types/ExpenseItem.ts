export type ExpenseItem = {
  id: string;
  date: string;
  description: string;
  amount: number;
  budgetItemId: string;
  userId: string;
};

export type NewExpenseItem = Pick<
  ExpenseItem,
  'date' | 'amount' | 'description' | 'budgetItemId'
>;

export type SubtotalByMonthBudgetItem = {
  month: string;
  budgetItemId: string;
  subtotal: number;
};

export type SubtotalByMonth = {
  month: string;
  budgetItemId: string;
  subtotal: number;
};

export type SummaryData = {
  byMonth: Array<SubtotalByMonth>;
  byMonthAndBudgetItem: Array<SubtotalByMonthBudgetItem>;
};
