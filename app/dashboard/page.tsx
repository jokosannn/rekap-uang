import { TrendingUp } from 'lucide-react'

import { ChartCategoryExpense } from '@/components/chart-category-expense'
import { ChartCategoryIncome } from '@/components/chart-category-income'
import { ChartTotalTransaction } from '@/components/chart-total-transaction'
import { SectionCards } from '@/components/section-cards'
import { TransactionHistory } from '@/components/transaction-history'
import data from '@/constants/transaction.json'
import { getMonthlyComparison } from '@/lib/utils'
import { Transaction } from '@/types/transaction'

export default function Page() {
  const summary = getMonthlyComparison(data as Transaction[])

  return (
    <div className="@container/main relative flex flex-1 flex-col gap-2">
      <div className="from-primary/10 to-card bg-card absolute top-0 right-0 left-0 z-0 h-[180px] w-full rounded-2xl bg-gradient-to-t px-4 lg:px-6">
        <div className="font-bricolage mt-6 flex items-center gap-2">
          <TrendingUp className="size-12" />
          <div className="flex flex-col">
            <span className="text-lg font-medium">Hai,</span>
            <span className="text-2xl font-bold">Joko Santoso</span>
          </div>
        </div>
      </div>
      <div className="static z-10 mt-20 flex flex-col gap-4 py-4 md:py-6">
        <SectionCards data={summary} />

        <div className="px-4 lg:px-6">
          <ChartTotalTransaction data={summary} />

          <div className="mt-4 grid flex-1 scroll-mt-20 items-start gap-4 lg:grid-cols-2">
            <ChartCategoryExpense />
            <ChartCategoryIncome />
          </div>

          <div className="mt-4">
            <TransactionHistory />
          </div>
        </div>
      </div>
    </div>
  )
}
