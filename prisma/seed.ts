const {
  budgets,
  budgetItems,
  expenseItems,
  users,
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function deleteAllData() {
  try {
    const deleteExpenseItems = prisma.expenseItem.deleteMany();
    const deleteBudgetItems = prisma.budgetItem.deleteMany();
    const deleteBudgets = prisma.budget.deleteMany();
    const deleteUsers = prisma.user.deleteMany();

    // The transaction runs synchronously so deleteUsers must run last.
    await prisma.$transaction([
      deleteExpenseItems,
      deleteBudgetItems,
      deleteBudgets,
      deleteUsers,
    ]);

    console.log('Deleted data successfully');
  } catch (e) {
    console.log(`Error deleting data": ${e}`);
  }
}

async function seedUsers() {
  try {
    const usersToCreate = await Promise.all(
      users.map(async (user: any) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return {
          ...user,
          password: hashedPassword,
        };
      }),
    );
    const createdUsers = await prisma.user.createMany({
      data: usersToCreate,
      skipDuplicates: true,
    });
    console.log(`Seeded "User": ${createdUsers.count} records`);
  } catch (e) {
    console.log(`Error Seeding "User": ${e}`);
  }
}

async function seedBudgets() {
  try {
    const createdBudgets = await prisma.budget.createMany({
      data: budgets,
      skipDuplicates: true,
    });
    console.log(`Seeded "Budget": ${createdBudgets.count} records`);
  } catch (e) {
    console.log(`Error Seeding "Budget": ${e}`);
  }
}

async function seedBudgetItems() {
  try {
    const createdBudgetItems = await prisma.budgetItem.createMany({
      data: budgetItems,
      skipDuplicates: true,
    });
    console.log(`Seeded "BudgetItem": ${createdBudgetItems.count} records`);
  } catch (e) {
    console.log(`Error Seeding "BudgetItem": ${e}`);
  }
}

async function seedExpenseItems() {
  try {
    const createdExpenseItems = await prisma.expenseItem.createMany({
      data: expenseItems,
      skipDuplicates: true,
    });
    console.log(`Seeded "ExpenseItem": ${createdExpenseItems.count} records`);
  } catch (e) {
    console.log(`Error Seeding "ExpenseItem": ${e}`);
  }
}

async function main() {
  await deleteAllData();
  await seedUsers();
  await seedBudgets();
  await seedBudgetItems();
  await seedExpenseItems();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
