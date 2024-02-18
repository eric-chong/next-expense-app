const { db } = require('@vercel/postgres');
const {
  budgets,
  budgetItems,
  expenseItems,
  invoices,
  customers,
  revenue,
  users,
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await client.sql`DROP TABLE IF EXISTS users`;

    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedBudgets(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await client.sql`DROP TABLE IF EXISTS budgets`;

    // Create the "budgets" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS budgets (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        start_date VARCHAR(10) NOT NULL,
        end_date VARCHAR(10),
        user_id UUID NOT NULL
      );
    `;

    console.log(`Created "budgets" table`);

    // Insert data into the "budgets" table
    const insertedBudgets = await Promise.all(
      budgets.map(
        (budget) => client.sql`
        INSERT INTO budgets (id, start_date, end_date, user_id)
        VALUES (${budget.id}, ${budget.start_date}, ${budget.end_date}, ${budget.user_id})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedBudgets.length} budgets`);

    return {
      createTable,
      budgets: insertedBudgets,
    };
  } catch (error) {
    console.error('Error seeding budgets:', error);
    throw error;
  }
}

async function seedBudgetItems(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await client.sql`DROP TABLE IF EXISTS budget_items`;

    // Create the "budgetItems" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS budget_items (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description VARCHAR(255),
        amount decimal NOT NULL,
        budget_id UUID NOT NULL,
        user_id UUID NOT NULL
      );
    `;

    console.log(`Created "budget_items" table`);

    // Insert data into the "budget_items" table
    const insertedBudgetItems = await Promise.all(
      budgetItems.map(
        (budgetItem) => client.sql`
        INSERT INTO budget_items (id, name, description, amount, budget_id, user_id)
        VALUES (${budgetItem.id}, ${budgetItem.name}, ${budgetItem.description}, ${budgetItem.amount}, ${budgetItem.budgetId}, ${budgetItem.userId})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedBudgetItems.length} budget_items`);

    return {
      createTable,
      budgetItems: insertedBudgetItems,
    };
  } catch (error) {
    console.error('Error seeding budget_items:', error);
    throw error;
  }
}

async function seedExpenseItems(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await client.sql`DROP TABLE IF EXISTS expense_items`;

    // Create the "expense_items" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS expense_items (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        date VARCHAR(10) NOT NULL,
        amount decimal NOT NULL,
        description VARCHAR(255),
        budget_item_id UUID NOT NULL,
        user_id UUID NOT NULL
      );
    `;

    console.log(`Created "expense_items" table`);

    // Insert data into the "expense_items" table
    const insertedExpenseItems = await Promise.all(
      expenseItems.map(
        (expenseItem) =>
          client.sql`
            INSERT INTO expense_items (id, date, amount, description, budget_item_id, user_id)
            VALUES (${expenseItem.id}, ${expenseItem.date}, ${expenseItem.amount}, ${expenseItem.description}, ${expenseItem.budgetItemId}, ${expenseItem.userId})
            ON CONFLICT (id) DO NOTHING;
          `,
      ),
    );

    console.log(`Seeded ${insertedExpenseItems.length} expense_items`);

    return {
      createTable,
      expenseItems: insertedExpenseItems,
    };
  } catch (error) {
    console.error('Error seeding budget_items:', error);
    throw error;
  }
}

async function seedInvoices(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "invoices" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS invoices (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    customer_id UUID NOT NULL,
    amount INT NOT NULL,
    status VARCHAR(255) NOT NULL,
    date DATE NOT NULL
  );
`;

    console.log(`Created "invoices" table`);

    // Insert data into the "invoices" table
    const insertedInvoices = await Promise.all(
      invoices.map(
        (invoice) => client.sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedInvoices.length} invoices`);

    return {
      createTable,
      invoices: insertedInvoices,
    };
  } catch (error) {
    console.error('Error seeding invoices:', error);
    throw error;
  }
}

async function seedCustomers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "customers" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS customers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        image_url VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "customers" table`);

    // Insert data into the "customers" table
    const insertedCustomers = await Promise.all(
      customers.map(
        (customer) => client.sql`
        INSERT INTO customers (id, name, email, image_url)
        VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedCustomers.length} customers`);

    return {
      createTable,
      customers: insertedCustomers,
    };
  } catch (error) {
    console.error('Error seeding customers:', error);
    throw error;
  }
}

async function seedRevenue(client) {
  try {
    // Create the "revenue" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS revenue (
        month VARCHAR(4) NOT NULL UNIQUE,
        revenue INT NOT NULL
      );
    `;

    console.log(`Created "revenue" table`);

    // Insert data into the "revenue" table
    const insertedRevenue = await Promise.all(
      revenue.map(
        (rev) => client.sql`
        INSERT INTO revenue (month, revenue)
        VALUES (${rev.month}, ${rev.revenue})
        ON CONFLICT (month) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedRevenue.length} revenue`);

    return {
      createTable,
      revenue: insertedRevenue,
    };
  } catch (error) {
    console.error('Error seeding revenue:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedBudgets(client);
  await seedBudgetItems(client);
  await seedExpenseItems(client);

  // TODO: remove these seed function when cleanup
  // await seedCustomers(client);
  // await seedInvoices(client);
  // await seedRevenue(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
