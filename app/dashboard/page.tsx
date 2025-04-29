'use client'

import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

import { ChartCategoryExpense } from '@/app/dashboard/chart-category-expense'
import { ChartCategoryIncome } from '@/app/dashboard/chart-category-income'
import { ChartTotalTransaction } from '@/app/dashboard/chart-total-transaction'
import { SectionCards } from '@/app/dashboard/section-cards'
import HeaderContent from '@/components/header-content'
import { TransactionHistory } from '@/components/transaction-history'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  fetchTransactions,
  getMonthlyComparison,
  getTransactionHistory
} from '@/services/transaction-service'
import { Transaction } from '@/types/transaction'

export default function Page() {
  const { data: session, status }: any = useSession()

  const {
    data: results,
    isPending,
    isFetching
  } = useQuery({ queryKey: ['transactions'], queryFn: fetchTransactions })

  const isLoading = isPending || isFetching || status === 'loading'
  if (isLoading) return <p>Loading...</p>

  const filteredData = results.filter((v: any) => v.userId === session?.user.id)
  const sortedData = filteredData.sort((a: any, b: any) => a.date.localeCompare(b.date))

  const summary = getMonthlyComparison(sortedData as Transaction[])
  const transactions = getTransactionHistory(filteredData as Transaction[])

  return (
    <div className="@container/main relative flex flex-1 flex-col gap-2">
      <HeaderContent />
      <div className="static z-10 mt-20 flex flex-col gap-4 py-4 md:py-6">
        <SectionCards data={summary} />

        <div className="px-4 lg:px-6">
          <ChartTotalTransaction />

          <div className="mt-4 grid flex-1 scroll-mt-20 items-start gap-4 lg:grid-cols-2">
            <ChartCategoryIncome />
            <ChartCategoryExpense />
          </div>

          <div className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Riwayat Transaksi</CardTitle>
                <CardDescription>Transaksi terbaru Anda</CardDescription>
              </CardHeader>
              <CardContent>
                <TransactionHistory transactions={transactions} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
