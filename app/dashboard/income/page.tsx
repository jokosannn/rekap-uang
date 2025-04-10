'use client'

import * as React from 'react'

import { differenceInDays, format, subDays } from 'date-fns'
import { TrendingUp } from 'lucide-react'
import { DateRange } from 'react-day-picker'

import { ChartCategoryIncome } from '@/components/chart-category-income'
import data from '@/constants/transaction.json'
import { Transaction } from '@/types/transaction'

import { ChartIncome } from './_partials/chart-income'

function filterIncomeTransactions(data: Transaction[]) {
  const transactionMap: Record<string, { date: string; pemasukan: number }> = {}

  data.forEach(tx => {
    const txDate = new Date(tx.date)
    if (txDate <= new Date()) {
      const formattedDate = format(txDate, 'yyyy-MM-dd')

      if (!transactionMap[formattedDate]) {
        transactionMap[formattedDate] = {
          date: formattedDate,
          pemasukan: 0
        }
      }

      if (tx.date === tx.date) {
        transactionMap[formattedDate].pemasukan += tx.amount
      }
    } else {
      return
    }
  })
  return Object.values(transactionMap).sort((a, b) => a.date.localeCompare(b.date))
}

function formatDateRangeDiff(date: DateRange | undefined): number {
  if (!date?.from || !date?.to) return 0
  const diff = differenceInDays(date.to, date.from)
  return diff
}

export default function IncomePage() {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date()
  })
  const [timeRange, setTimeRange] = React.useState<number>(30)

  const chartData = filterIncomeTransactions(data as Transaction[])

  React.useEffect(() => {
    const diff = formatDateRangeDiff(date)
    setTimeRange(diff)
  }, [date])

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
      <div className="static z-10 mt-20 space-y-4 px-4 py-4 md:py-6 lg:px-6">
        <ChartIncome />
      </div>
    </div>
  )
}
