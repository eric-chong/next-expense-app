// import { UTCDate } from '@date-fns/utc';
const { UTCDate } = require('@date-fns/utc');
const { isBefore } = require('date-fns');

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

const groceriesBudgetItem = {
  id: 'clu630j7a000308l4gw7pdazq',
  name: 'Groceries',
  description: 'Monthly grocery budget',
  amount: 20000,
  budgetId: budgets[1].id,
  userId: users[0].id,
};
const rentBudgetItem = {
  id: 'clu630sic000008l7013jfn6m',
  name: 'Rent',
  description: 'Monthly rent payment',
  amount: 120000,
  budgetId: budgets[1].id,
  userId: users[0].id,
};
const utilitiesBudgetItem = {
  id: 'clu6312w7000208l774ur8gl0',
  name: 'Utilities',
  description: 'Electricity, water, and internet bills',
  amount: 15000,
  budgetId: budgets[1].id,
  userId: users[0].id,
};
const transportationBudgetItem = {
  id: 'clu6318ss000308l70nbdfdx6',
  name: 'Transportation',
  description: 'Public transportation or gas expenses',
  amount: 10000,
  budgetId: budgets[1].id,
  userId: users[0].id,
};
const diningOutBudgetItem = {
  id: 'clu631g2i000408l79elgb1dz',
  name: 'Dining Out',
  description: 'Eating out at restaurants',
  amount: 15000,
  budgetId: budgets[1].id,
  userId: users[0].id,
};
const entertainmentBudgetItem = {
  id: 'clu631l75000508l72wey3un0',
  name: 'Entertainment',
  description: 'Movies, concerts, and other leisure activities',
  amount: 10000,
  budgetId: budgets[1].id,
  userId: users[0].id,
};
const healthFitnessBudgetItem = {
  id: 'clu631q44000608l7dqx4ax81',
  name: 'Health & Fitness',
  description: 'Gym membership or fitness classes',
  amount: 5000,
  budgetId: budgets[1].id,
  userId: users[0].id,
};
const clothingBudgetItem = {
  id: 'clu631vvk000708l74ixu5nfr',
  name: 'Clothing',
  description: 'Clothing and accessories expenses',
  amount: 7500,
  budgetId: budgets[1].id,
  userId: users[0].id,
};
const savingsBudgetItem = {
  id: 'clu632324000808l730r86mbs',
  name: 'Savings',
  description: 'Monthly savings goal',
  amount: 50000,
  budgetId: budgets[1].id,
  userId: users[0].id,
};
const miscellaneousBudgetItem = {
  id: 'clu63293x000908l73mla4gvj',
  name: 'Miscellaneous',
  description: 'Unexpected or miscellaneous expenses',
  amount: 10000,
  budgetId: budgets[1].id,
  userId: users[0].id,
};

const budgetItems = [
  groceriesBudgetItem,
  rentBudgetItem,
  utilitiesBudgetItem,
  transportationBudgetItem,
  diningOutBudgetItem,
  entertainmentBudgetItem,
  healthFitnessBudgetItem,
  clothingBudgetItem,
  savingsBudgetItem,
  miscellaneousBudgetItem,
];

const expenseItems = [
  {
    id: 'cksp4wrkx000101mr5j7iqhdo',
    date: new UTCDate(new Date('2024-02-05')),
    amount: 4500,
    budgetItemId: groceriesBudgetItem.id,
    description: 'Weekly grocery shopping',
    userId: users[0].id,
  },
  {
    id: 'cksp4wrkx000201mri8f8dzzf',
    date: new UTCDate(new Date('2024-02-10')),
    amount: 2500,
    budgetItemId: diningOutBudgetItem.id,
    description: 'Lunch with friends',
    userId: users[0].id,
  },
  {
    id: 'cksp4wrkx000301mru2dd96v4',
    date: new UTCDate(new Date('2024-02-15')),
    amount: 12000,
    budgetItemId: transportationBudgetItem.id,
    description: 'Gasoline refill',
    userId: users[0].id,
  },
  {
    id: 'cksp4wrkx000401mrubg16m9a',
    date: new UTCDate(new Date('2024-02-01')),
    amount: 110000,
    budgetItemId: rentBudgetItem.id,
    description: 'Monthly rent payment',
    userId: users[0].id,
  },
  {
    id: 'cksp4wrkx000501mrh8vycw0x',
    date: new UTCDate(new Date('2024-02-20')),
    amount: 3000,
    budgetItemId: clothingBudgetItem.id,
    description: 'New pair of jeans',
    userId: users[0].id,
  },
  {
    id: 'cksp4wrkx000601mrmbyux02n',
    date: new UTCDate(new Date('2024-02-25')),
    amount: 2000,
    budgetItemId: healthFitnessBudgetItem.id,
    description: 'Yoga class',
    userId: users[0].id,
  },
  {
    id: 'cksp4wrkx000701mru6x4k5sz',
    date: new UTCDate(new Date('2024-02-28')),
    amount: 8000,
    budgetItemId: utilitiesBudgetItem.id,
    description: 'Internet and electricity bill',
    userId: users[0].id,
  },
  {
    id: 'cksp4wrkx000801mruwdkyyhs',
    date: new UTCDate(new Date('2024-03-26')),
    amount: 6830,
    budgetItemId: groceriesBudgetItem.id,
    description: 'Superstore groceries',
    userId: users[0].id,
  },
  {
    id: 'cksp4wrkx000901mruus1ap5v',
    date: new UTCDate(new Date('2024-03-05')),
    amount: 6800,
    budgetItemId: diningOutBudgetItem.id,
    description: 'Dinner with family',
    userId: users[0].id,
  },
  {
    id: 'cksp4wrkx000a01mrvgey07rw',
    date: new UTCDate(new Date('2024-02-01')),
    amount: 15000,
    budgetItemId: transportationBudgetItem.id,
    description: 'Public transportation pass',
    userId: users[0].id,
  },

  {
    id: 'cksp4wrkx000b01mrvmlqeeb6',
    date: new UTCDate(new Date('2024-03-01')),
    amount: 110000,
    budgetItemId: rentBudgetItem.id,
    description: 'Monthly rent payment',
    userId: users[0].id,
  },
  {
    id: 'cksp4wrkx000c01mrw1is39pa',
    date: new UTCDate(new Date('2024-03-15')),
    amount: 4500,
    budgetItemId: clothingBudgetItem.id,
    description: 'T-shirt purchase',
    userId: users[0].id,
  },
  {
    id: 'cksp4wrkx000d01mrweie5t3r',
    date: new UTCDate(new Date('2024-02-01')),
    amount: 3500,
    budgetItemId: healthFitnessBudgetItem.id,
    description: 'Gym membership',
    userId: users[0].id,
  },
  {
    id: 'cksp4wrkx000e01mrwhsx1k3i',
    date: new UTCDate(new Date('2024-03-20')),
    amount: 8700,
    budgetItemId: utilitiesBudgetItem.id,
    description: 'Water and electricity bill',
    userId: users[0].id,
  },
  {
    id: 'cksp4wrkx000f01mrw5xosn2w',
    date: new UTCDate(new Date('2024-02-14')),
    amount: 3754,
    budgetItemId: groceriesBudgetItem.id,
    description: 'Snacks',
    userId: users[0].id,
  },
  {
    id: 'cksp4wrkx000g01mrwfnldu9y',
    date: new UTCDate(new Date('2024-03-28')),
    amount: 3600,
    budgetItemId: diningOutBudgetItem.id,
    description: 'Lunch at a cafe',
    userId: users[0].id,
  },
  {
    id: 'cksp4wrkx000h01mrwhjl6p8i',
    date: new UTCDate(new Date('2024-02-25')),
    amount: 7800,
    budgetItemId: transportationBudgetItem.id,
    description: 'Gasoline refill',
    userId: users[0].id,
  },
  {
    id: 'cksp4wrkx000i01mrwroq1m3w',
    date: new UTCDate(new Date('2024-02-12')),
    amount: 4207,
    budgetItemId: groceriesBudgetItem.id,
    description: 'Walmart groceries',
    userId: users[0].id,
  },
  {
    id: 'cksp4wrkx000j01mrwzw7qqx1',
    date: new UTCDate(new Date('2024-02-28')),
    amount: 4500,
    budgetItemId: diningOutBudgetItem.id,
    description: 'Keg',
    userId: users[0].id,
  },
  {
    id: 'cksp4wrkx000k01mrwtrvr4et',
    date: new UTCDate(new Date('2024-02-10')),
    amount: 600,
    budgetItemId: transportationBudgetItem.id,
    description: 'Parking meter',
    userId: users[0].id,
  },
  {
    id: 'cksp4wrkx000l01mrwk1xv5z2',
    date: new UTCDate(new Date('2024-02-12')),
    amount: 12533,
    budgetItemId: miscellaneousBudgetItem.id,
    description: 'Amazon',
    userId: users[0].id,
  },
  {
    id: 'cksp4wrkx000m01mrwbmg9r1v',
    date: new UTCDate(new Date('2024-03-15')),
    amount: 9500,
    budgetItemId: clothingBudgetItem.id,
    description: 'Soccer jersey',
    userId: users[0].id,
  },
  {
    id: 'cksp4wrkx000n01mrw1xxjhxw',
    date: new UTCDate(new Date('2024-03-01')),
    amount: 3500,
    budgetItemId: healthFitnessBudgetItem.id,
    description: 'Gym membership',
    userId: users[0].id,
  },
  {
    id: 'cksp4wrkx000o01mrwo6fxymr',
    date: new UTCDate(new Date('2024-02-20')),
    amount: 7500,
    budgetItemId: utilitiesBudgetItem.id,
    description: 'Water and electricity bill',
    userId: users[0].id,
  },
  {
    id: 'cksp4wrkx000p01mrw60vg1n8',
    date: new UTCDate(new Date('2024-03-25')),
    amount: 1844,
    budgetItemId: groceriesBudgetItem.id,
    description: 'Snacks',
    userId: users[0].id,
  },
  {
    id: 'cksp4wrkx000q01mrwb9zyfo4',
    date: new UTCDate(new Date('2024-02-28')),
    amount: 3300,
    budgetItemId: diningOutBudgetItem.id,
    description: 'Lunch at a cafe',
    userId: users[0].id,
  },
  {
    id: 'cksp4wrkx000r01mrwvl9x5f3',
    date: new UTCDate(new Date('2024-03-30')),
    amount: 8505,
    budgetItemId: transportationBudgetItem.id,
    description: 'Gasoline refill',
    userId: users[0].id,
  },
  {
    id: 'cksp4wrkx000s01mrw3ij4vfi',
    date: new UTCDate(new Date('2024-03-02')),
    amount: 4000,
    budgetItemId: groceriesBudgetItem.id,
    description: 'Fresh produce and groceries',
    userId: users[0].id,
  },
  {
    id: 'cksp4wrkx000t01mrwg4qggv2',
    date: new UTCDate(new Date('2024-02-15')),
    amount: 1675,
    budgetItemId: diningOutBudgetItem.id,
    description: 'McDonalds',
    userId: users[0].id,
  },
  {
    id: 'cksp4wrkx000u01mrwunm2avc',
    date: new UTCDate(new Date('2024-02-17')),
    amount: 3600,
    budgetItemId: transportationBudgetItem.id,
    description: 'Uber',
    userId: users[0].id,
  },
].sort((a, b) => isBefore(a, b));

module.exports = {
  users,
  budgets,
  budgetItems,
  expenseItems,
};
