import React from 'react'

import HeaderContent from '@/components/header-content'
import { Card, CardContent } from '@/components/ui/card'
import data from '@/constants/transaction.json'

import { columns } from './colums'
import { DataTable } from './date-table'

export default function TransactionPage() {
  return (
    <div className="@container/main relative flex flex-1 flex-col gap-2">
      <HeaderContent />
      <div className="static z-10 mt-20 px-4 py-4 md:py-6 lg:px-6">
        <Card className="@container/card">
          <CardContent>
            <DataTable
              data={data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())}
              columns={columns}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
