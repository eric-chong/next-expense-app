import { fetchBudgetItems, fetchBudgets } from '@/app/data/budgets';
import useGetBudget from '@/app/hooks/useGetBudget';
import BudgetItemList from '@/app/ui/budgets/BudgetItemList';
import BudgetNavigator from '@/app/ui/budgets/BudgetNavigator';
import { lusitana } from '@/app/ui/fonts';

export default async function Page() {
  const userId = '410544b2-4001-4271-9855-fec4b6a6442a';
  const budgets = await fetchBudgets(userId);
  const { getCurrentBudget } = useGetBudget();
  const currentBudget = getCurrentBudget(budgets, new Date());
  // const currentBudget = useGetBudget(budgets, '2023-10-22');

  const budgetItems = currentBudget
    ? await fetchBudgetItems(userId, currentBudget.id)
    : [];

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Budgets
      </h1>
      {currentBudget ? (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* <Card title="Collected" value={totalPaidInvoices} type="collected" /> */}
            {/* <Card title="Pending" value={totalPendingInvoices} type="pending" /> */}
            {/* <Card title="Total Invoices" value={numberOfInvoices} type="invoices" /> */}
            {/* <Card
      title="Total Customers"
      value={numberOfCustomers}
      type="customers"
    /> */}
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-1 lg:grid-cols-8">
            <BudgetNavigator budgets={budgets} />
            <BudgetItemList budgetItems={budgetItems} />

            {/* <RevenueChart revenue={revenue} /> */}
            {/* <LatestInvoices latestInvoices={latestInvoices} /> */}
          </div>
        </>
      ) : (
        <div>There is no budget setup for this date</div>
      )}
    </main>
  );
}
