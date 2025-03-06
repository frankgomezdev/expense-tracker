import getIncomeExpense from "@/app/actions/getIncomeExpense"
import { addCommas } from "@/lib/utils";

  
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }
  
  export default async function IncomeExpense() {
    const { income = 0, expense = 0 } = await getIncomeExpense();

    const stats = [
        { name: 'Income', value: `$${addCommas(income)}`, change: '', changeType: 'positive' },
        { name: 'Expenses', value: `$${addCommas(expense)}`, change: '', changeType: 'negative' },
      ];

    return (
      <div>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((item) => (
          <div key={item.name} className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm sm:p-6">
            <dt className="truncate text-sm font-medium text-gray-500">{item.name}</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
    )
  }
  