'use client'

import * as React from 'react'

import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

import HeaderContent from '@/components/header-content'
import { fetchTransactions } from '@/services/transaction-service'

import { ChartIncome } from './chart-income'

export default function IncomePage() {
  const { data: session, status }: any = useSession()

  const {
    data: results,
    isPending,
    isFetching
  } = useQuery({ queryKey: ['transactions'], queryFn: fetchTransactions })

  const isLoading = isPending || isFetching || status === 'loading'
  if (isLoading) return <p>Loading...</p>

  const filteredData = results.filter((v: any) => v.userId === session?.user.id)

  return (
    <div className="@container/main relative flex flex-1 flex-col gap-2">
      <HeaderContent />
      <div className="static z-10 mt-20 space-y-4 px-4 py-4 md:py-6 lg:px-6">
        <ChartIncome data={filteredData} />
      </div>
    </div>
  )
}
