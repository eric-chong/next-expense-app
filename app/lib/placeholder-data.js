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
    start_date: '2023-01-01',
    end_date: '2023-12-31',
    user_id: users[0].id,
  },
  {
    id: 'f2e4d51b-ec94-4a72-bdc0-7d37c0dd3ea5',
    start_date: '2024-01-01',
    end_date: '2024-12-31',
    user_id: users[0].id,
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
    date: '2024-02-01',
    amount: 16000,
    description: null,
    budgetItemId: carInsuranceBudgetItem.id,
    userId: users[0].id,
  },
  {
    id: 'a9d9de4b-0811-4f11-83fd-6d1a59e6a595',
    date: '2024-02-01',
    amount: 36000,
    description: null,
    budgetItemId: propertyTaxBudgetItem.id,
    userId: users[0].id,
  },
  {
    id: '2532852b-a074-43a2-8538-f9da738b437a',
    date: '2024-02-01',
    amount: 22467,
    description: null,
    budgetItemId: fortisBudgetItem.id,
    userId: users[0].id,
  },
  {
    id: 'b1c55332-949e-4d77-94c5-27a1bdf9866b',
    date: '2024-02-01',
    amount: 5795,
    description: 'YY birthday cake',
    budgetItemId: mealOutBudgetItem.id,
    userId: users[0].id,
  },
  {
    id: '493a685b-2b1d-42a6-bed5-6555109fcc3f',
    date: '2024-02-01',
    amount: 4242,
    description: 'Walmart',
    budgetItemId: groceryBudgetItem.id,
    userId: users[0].id,
  },
  {
    id: '01389294-7018-4f2a-95fb-eb1b5d5350b8',
    date: '2024-02-02',
    amount: 1776,
    description: 'Lost in 50s',
    budgetItemId: mealOutBudgetItem.id,
    userId: users[0].id,
  },
  {
    id: '1d710aeb-bcd2-423b-87d3-d303503a315c',
    date: '2024-02-03',
    amount: 8400,
    description: 'Shaw',
    budgetItemId: shawBudgetItem.id,
    userId: users[0].id,
  },
  {
    id: 'd994401d-c8cb-421a-a4a5-77aac3b13f07',
    date: '2024-02-02',
    amount: 4300,
    description: 'Congee noodles house',
    budgetItemId: mealOutBudgetItem.id,
    userId: users[0].id,
  },
  {
    id: '9f0043b6-3c49-4591-8a20-60ca201dabaa',
    date: '2024-02-03',
    amount: 1900,
    description: 'Maxim',
    budgetItemId: mealOutBudgetItem.id,
    userId: users[0].id,
  },
  {
    id: '92735887-afec-495b-946c-6feeaca0e689',
    date: '2024-02-03',
    amount: 1500,
    description: "McDonald's",
    budgetItemId: mealOutBudgetItem.id,
    userId: users[0].id,
  },
];

// TODO: Remove these placeholder data when clean up
const customers = [
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    image_url: '/customers/delba-de-oliveira.png',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    image_url: '/customers/lee-robinson.png',
  },
  {
    id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
    name: 'Hector Simpson',
    email: 'hector@simpson.com',
    image_url: '/customers/hector-simpson.png',
  },
  {
    id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
    name: 'Steven Tey',
    email: 'steven@tey.com',
    image_url: '/customers/steven-tey.png',
  },
  {
    id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
    name: 'Steph Dietz',
    email: 'steph@dietz.com',
    image_url: '/customers/steph-dietz.png',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Michael Novotny',
    email: 'michael@novotny.com',
    image_url: '/customers/michael-novotny.png',
  },
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    image_url: '/customers/evil-rabbit.png',
  },
  {
    id: '126eed9c-c90c-4ef6-a4a8-fcf7408d3c66',
    name: 'Emil Kowalski',
    email: 'emil@kowalski.com',
    image_url: '/customers/emil-kowalski.png',
  },
  {
    id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    name: 'Amy Burns',
    email: 'amy@burns.com',
    image_url: '/customers/amy-burns.png',
  },
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    name: 'Balazs Orban',
    email: 'balazs@orban.com',
    image_url: '/customers/balazs-orban.png',
  },
];

const invoices = [
  {
    customer_id: customers[0].id,
    amount: 15795,
    status: 'pending',
    date: '2022-12-06',
  },
  {
    customer_id: customers[1].id,
    amount: 20348,
    status: 'pending',
    date: '2022-11-14',
  },
  {
    customer_id: customers[4].id,
    amount: 3040,
    status: 'paid',
    date: '2022-10-29',
  },
  {
    customer_id: customers[3].id,
    amount: 44800,
    status: 'paid',
    date: '2023-09-10',
  },
  {
    customer_id: customers[5].id,
    amount: 34577,
    status: 'pending',
    date: '2023-08-05',
  },
  {
    customer_id: customers[7].id,
    amount: 54246,
    status: 'pending',
    date: '2023-07-16',
  },
  {
    customer_id: customers[6].id,
    amount: 666,
    status: 'pending',
    date: '2023-06-27',
  },
  {
    customer_id: customers[3].id,
    amount: 32545,
    status: 'paid',
    date: '2023-06-09',
  },
  {
    customer_id: customers[4].id,
    amount: 1250,
    status: 'paid',
    date: '2023-06-17',
  },
  {
    customer_id: customers[5].id,
    amount: 8546,
    status: 'paid',
    date: '2023-06-07',
  },
  {
    customer_id: customers[1].id,
    amount: 500,
    status: 'paid',
    date: '2023-08-19',
  },
  {
    customer_id: customers[5].id,
    amount: 8945,
    status: 'paid',
    date: '2023-06-03',
  },
  {
    customer_id: customers[2].id,
    amount: 8945,
    status: 'paid',
    date: '2023-06-18',
  },
  {
    customer_id: customers[0].id,
    amount: 8945,
    status: 'paid',
    date: '2023-10-04',
  },
  {
    customer_id: customers[2].id,
    amount: 1000,
    status: 'paid',
    date: '2022-06-05',
  },
];

const revenue = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3700 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 2800 },
  { month: 'Nov', revenue: 3000 },
  { month: 'Dec', revenue: 4800 },
];

module.exports = {
  users,
  budgets,
  budgetItems,
  expenseItems,

  // TODO: remove these place holder data when clean up
  customers,
  invoices,
  revenue,
};
