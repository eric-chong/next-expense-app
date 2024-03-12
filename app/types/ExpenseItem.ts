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
