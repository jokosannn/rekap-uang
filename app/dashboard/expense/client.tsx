'use client'

import * as React from 'react'

import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

import HeaderContent from '@/components/header-content'
import LoadingSpinner from '@/components/loading-spinner'
import { fetchTransactions } from '@/services/transaction-service'

import { ChartExpense } from './chart-expense'

export default function ExpenseClientPage() {
  const { data: session, status }: any = useSession()

  const {
    data: results,
    isPending,
    isFetching
  } = useQuery({ queryKey: ['transactions'], queryFn: fetchTransactions })

  const isLoading = isPending || isFetching || status === 'loading'
  if (isLoading) return <LoadingSpinner />

  const filteredData = results.filter((v: any) => v.userId === session?.user.id)

  return (
    <div className="@container/main relative flex flex-1 flex-col gap-2">
      <HeaderContent />
      <div className="static z-10 mt-20 space-y-4 px-4 py-4 md:py-6 lg:px-6">
        <ChartExpense data={filteredData} />
      </div>
    </div>
  )
}
