// import { UTCDate } from '@date-fns/utc';
const { UTCDate } = require('@date-fns/utc');

// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: 'clu62znt2000008l429qz1cwu',
    name: 'Demo User',
    email: 'user@nextmail.com',
    password: '123456',
  },
];

const budgets = [
  {
    id: 'clu6301bl000108l49gkx2lfv',
    startDate: new UTCDate(new Date('2023-01-01')),
    endDate: new UTCDate(new Date('2023-12-31')),
    userId: users[0].id,
  },
  {
    id: 'clu6307ed000208l44nbx198p',
    startDate: new UTCDate(new Date('2024-01-01')),
    endDate: new UTCDate(new Date('2024-12-31')),
    userId: users[0].id,
  },
];

const mortgageBudgetItem = {
  id: 'clu630j7a000308l4gw7pdazq',
  name: 'Mortgage',
  description: 'Mortgage payment',
  amount: 377443,
  budgetId: budgets[1].id,
  userId: users[0].id,
};
const carInsuranceBudgetItem = {
  id: 'clu630sic000008l7013jfn6m',
  name: 'Car Insurance',
  description: 'Car insurance monthly set aside',
  amount: 16000,
  budgetId: budgets[1].id,
  userId: users[0].id,
};
const gasBudgetItem = {
  id: 'clu6312w7000208l774ur8gl0',
  name: 'Gas',
  description: 'Gas fill up',
  amount: 44000,
  budgetId: budgets[1].id,
  userId: users[0].id,
};
const mealOutBudgetItem = {
  id: 'clu6318ss000308l70nbdfdx6',
  name: 'Meal Out',
  description: 'Meal out at restaurants',
  amount: 85000,
  budgetId: budgets[1].id,
  userId: users[0].id,
};
const propertyTaxBudgetItem = {
  id: 'clu631g2i000408l79elgb1dz',
  name: 'Property Tax',
  description: 'Property tax monthly set aside',
  amount: 36000,
  budgetId: budgets[1].id,
  userId: users[0].id,
};
const bcHydroBudgetItem = {
  id: 'clu631l75000508l72wey3un0',
  name: 'BC Hydro',
  description: 'BC Hydro payment',
  amount: 6500,
  budgetId: budgets[1].id,
  userId: users[0].id,
};
const fortisBudgetItem = {
  id: 'clu631q44000608l7dqx4ax81',
  name: 'Fortis',
  description: 'Fortis BC payment',
  amount: 10000,
  budgetId: budgets[1].id,
  userId: users[0].id,
};
const shawBudgetItem = {
  id: 'clu631vvk000708l74ixu5nfr',
  name: 'Shaw',
  description: 'Shaw internet payment',
  amount: 8400,
  budgetId: budgets[1].id,
  userId: users[0].id,
};
const groceryBudgetItem = {
  id: 'clu632324000808l730r86mbs',
  name: 'Grocery',
  description: 'Grocery shopping',
  amount: 30000,
  budgetId: budgets[1].id,
  userId: users[0].id,
};
const violinBudgetItem = {
  id: 'clu63293x000908l73mla4gvj',
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
    id: 'clu632l9d000a08l7cocj86zl',
    date: new UTCDate(new Date('2024-02-01')),
    amount: 16000,
    description: null,
    budgetItemId: carInsuranceBudgetItem.id,
    userId: users[0].id,
  },
  {
    id: 'clu632qdk000b08l77jsw87o0',
    date: new UTCDate(new Date('2024-02-01')),
    amount: 36000,
    description: null,
    budgetItemId: propertyTaxBudgetItem.id,
    userId: users[0].id,
  },
  {
    id: 'clu632wck000c08l7431fhzr6',
    date: new UTCDate(new Date('2024-02-01')),
    amount: 22467,
    description: null,
    budgetItemId: fortisBudgetItem.id,
    userId: users[0].id,
  },
  {
    id: 'clu6333a4000d08l771rd9vby',
    date: new UTCDate(new Date('2024-02-01')),
    amount: 5795,
    description: 'YY birthday cake',
    budgetItemId: mealOutBudgetItem.id,
    userId: users[0].id,
  },
  {
    id: 'clu63385x000e08l7a5hsdm2u',
    date: new UTCDate(new Date('2024-02-01')),
    amount: 4242,
    description: 'Walmart',
    budgetItemId: groceryBudgetItem.id,
    userId: users[0].id,
  },
  {
    id: 'clu633f5t000f08l78jihgkhy',
    date: new UTCDate(new Date('2024-02-02')),
    amount: 1776,
    description: 'Lost in 50s',
    budgetItemId: mealOutBudgetItem.id,
    userId: users[0].id,
  },
  {
    id: 'clu633r61000h08l75i8dgyjf',
    date: new UTCDate(new Date('2024-02-03')),
    amount: 8400,
    description: 'Shaw',
    budgetItemId: shawBudgetItem.id,
    userId: users[0].id,
  },
  {
    id: 'clu633zfi000i08l7fyk1chf3',
    date: new UTCDate(new Date('2024-02-02')),
    amount: 4300,
    description: 'Congee noodles house',
    budgetItemId: mealOutBudgetItem.id,
    userId: users[0].id,
  },
  {
    id: 'clu6347jh000j08l7gp5qazt2',
    date: new UTCDate(new Date('2024-02-03')),
    amount: 1900,
    description: 'Maxim',
    budgetItemId: mealOutBudgetItem.id,
    userId: users[0].id,
  },
  {
    id: 'clu634epw000k08l7eh8i3dol',
    date: new UTCDate(new Date('2024-02-03')),
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
