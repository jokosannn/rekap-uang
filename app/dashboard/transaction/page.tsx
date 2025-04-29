'use client'

import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

import HeaderContent from '@/components/header-content'
import { Card, CardContent } from '@/components/ui/card'
import { fetchTransactions } from '@/services/transaction-service'

import { columns } from './colums'
import { DataTable } from './date-table'

export default function TransactionPage() {
  const { data: session, status }: any = useSession()

  const {
    data: results,
    isPending,
    isFetching
  } = useQuery({ queryKey: ['transactions'], queryFn: fetchTransactions })

  const isLoading = isPending || isFetching || status === 'loading'
  if (isLoading) return <p>Loading...</p>

  const filteredData = results
    .filter((v: any) => v.userId === session?.user.id)
    .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="@container/main relative flex flex-1 flex-col gap-2">
      <HeaderContent />
      <div className="static z-10 mt-20 px-4 py-4 md:py-6 lg:px-6">
        <Card className="@container/card">
          <CardContent>
            <DataTable data={filteredData} columns={columns} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
