export type BudgetItem = {
  id: string;
  name: string;
  description: string;
  amount: number;
  budgetId: string;
  userId: string;
};

export type NewBudgetItem = Pick<
  BudgetItem,
  'name' | 'amount' | 'description' | 'budgetId'
>;
