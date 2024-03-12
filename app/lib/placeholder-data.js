import { UTCDate as Date } from '@date-fns/utc';

// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'Demo User',
    email: 'user@nextmail.com',
    password: '123456',
  },
];

const budgets = [
  {
    id: 'f1927dc7-8453-4948-846a-ab07cad5aa02',
    startDate: new Date('2023-01-01'),
    endDate: new Date('2023-12-31'),
    userId: users[0].id,
  },
  {
    id: 'f2e4d51b-ec94-4a72-bdc0-7d37c0dd3ea5',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    userId: users[0].id,
  },
];

const mortgageBudgetItem = {
  id: 'd3d4c1c9-c58b-4f0c-a653-894c80d8312f',
  name: 'Mortgage',
  description: 'Mortgage payment',
  amount: 377443,
  budgetId: budgets[1].id,
  userId: users[0].id,
};
const carInsuranceBudgetItem = {
  id: 'a298600f-8f57-4742-b59f-967b2a0b0ecd',
  name: 'Car Insurance',
  description: 'Car insurance monthly set aside',
  amount: 16000,
  budgetId: budgets[1].id,
  userId: users[0].id,
};
const gasBudgetItem = {
  id: 'c8901b26-bd00-4ac5-aa3c-421ac178a80a',
  name: 'Gas',
  description: 'Gas fill up',
  amount: 44000,
  budgetId: budgets[1].id,
  userId: users[0].id,
};
const mealOutBudgetItem = {
  id: 'f0d1daac-f598-40c2-82a6-9da2d233e71a',
  name: 'Meal Out',
  description: 'Meal out at restaurants',
  amount: 85000,
  budgetId: budgets[1].id,
  userId: users[0].id,
};
const propertyTaxBudgetItem = {
  id: '8aa91e25-41d6-4ec2-a4d0-a3e9a431f059',
  name: 'Property Tax',
  description: 'Property tax monthly set aside',
  amount: 36000,
  budgetId: budgets[1].id,
  userId: users[0].id,
};
const bcHydroBudgetItem = {
  id: '6eed184e-ef3d-4d12-b8b6-6c74a0a471ac',
  name: 'BC Hydro',
  description: 'BC Hydro payment',
  amount: 6500,
  budgetId: budgets[1].id,
  userId: users[0].id,
};
const fortisBudgetItem = {
  id: 'b59124ce-1468-4416-a80d-92a56d89afbd',
  name: 'Fortis',
  description: 'Fortis BC payment',
  amount: 10000,
  budgetId: budgets[1].id,
  userId: users[0].id,
};
const shawBudgetItem = {
  id: 'baa40fb1-f597-43de-ac8c-d4a3a16ede83',
  name: 'Shaw',
  description: 'Shaw internet payment',
  amount: 8400,
  budgetId: budgets[1].id,
  userId: users[0].id,
};
const groceryBudgetItem = {
  id: 'dd5b348f-8c3c-4a7a-b823-e0f94028c82d',
  name: 'Grocery',
  description: 'Grocery shopping',
  amount: 30000,
  budgetId: budgets[1].id,
  userId: users[0].id,
};
const violinBudgetItem = {
  id: '34d6b7ea-fbd7-45e6-ba50-23735dd6580b',
  name: 'Violin',
  amount: 50000,
  budgetId: budgets[1].id,
  userId: users[0].id,
};

const budgetItems = [
  mortgageBudgetItem,
  carInsuranceBudgetItem,
  gasBudgetItem,
  mealOutBudgetItem,
  propertyTaxBudgetItem,
  bcHydroBudgetItem,
  fortisBudgetItem,
  shawBudgetItem,
  groceryBudgetItem,
  violinBudgetItem,
];

const expenseItems = [
  {
    id: 'b28b040b-4d87-4d3b-9015-bf1778421315',
    date: new Date('2024-02-01'),
    amount: 16000,
    description: null,
    budgetItemId: carInsuranceBudgetItem.id,
    userId: users[0].id,
  },
  {
    id: 'a9d9de4b-0811-4f11-83fd-6d1a59e6a595',
    date: new Date('2024-02-01'),
    amount: 36000,
    description: null,
    budgetItemId: propertyTaxBudgetItem.id,
    userId: users[0].id,
  },
  {
    id: '2532852b-a074-43a2-8538-f9da738b437a',
    date: new Date('2024-02-01'),
    amount: 22467,
    description: null,
    budgetItemId: fortisBudgetItem.id,
    userId: users[0].id,
  },
  {
    id: 'b1c55332-949e-4d77-94c5-27a1bdf9866b',
    date: new Date('2024-02-01'),
    amount: 5795,
    description: 'YY birthday cake',
    budgetItemId: mealOutBudgetItem.id,
    userId: users[0].id,
  },
  {
    id: '493a685b-2b1d-42a6-bed5-6555109fcc3f',
    date: new Date('2024-02-01'),
    amount: 4242,
    description: 'Walmart',
    budgetItemId: groceryBudgetItem.id,
    userId: users[0].id,
  },
  {
    id: '01389294-7018-4f2a-95fb-eb1b5d5350b8',
    date: new Date('2024-02-02'),
    amount: 1776,
    description: 'Lost in 50s',
    budgetItemId: mealOutBudgetItem.id,
    userId: users[0].id,
  },
  {
    id: '1d710aeb-bcd2-423b-87d3-d303503a315c',
    date: new Date('2024-02-03'),
    amount: 8400,
    description: 'Shaw',
    budgetItemId: shawBudgetItem.id,
    userId: users[0].id,
  },
  {
    id: 'd994401d-c8cb-421a-a4a5-77aac3b13f07',
    date: new Date('2024-02-02'),
    amount: 4300,
    description: 'Congee noodles house',
    budgetItemId: mealOutBudgetItem.id,
    userId: users[0].id,
  },
  {
    id: '9f0043b6-3c49-4591-8a20-60ca201dabaa',
    date: new Date('2024-02-03'),
    amount: 1900,
    description: 'Maxim',
    budgetItemId: mealOutBudgetItem.id,
    userId: users[0].id,
  },
  {
    id: '92735887-afec-495b-946c-6feeaca0e689',
    date: new Date('2024-02-03'),
    amount: 1500,
    description: "McDonald's",
    budgetItemId: mealOutBudgetItem.id,
    userId: users[0].id,
  },
];

module.exports = {
  users,
  budgets,
  budgetItems,
  expenseItems,
};
