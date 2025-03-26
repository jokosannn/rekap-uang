import React from 'react'

import { IconInnerShadowTop } from '@tabler/icons-react'

import { DataTable } from '@/components/data-table'
import { Card } from '@/components/ui/card'

import data from '../data.json'

export default function TransactionPage() {
  return (
    <div className="@container/main relative flex flex-1 flex-col gap-2">
      <div className="from-primary/10 to-card bg-card absolute top-0 right-0 left-0 z-0 h-[180px] w-full rounded-2xl bg-gradient-to-t px-4 lg:px-6">
        <div className="font-bricolage mt-6 flex items-center gap-2">
          <IconInnerShadowTop className="size-12" />
          <div className="flex flex-col">
            <span className="text-lg font-medium">Hai,</span>
            <span className="text-2xl font-bold">Joko Santoso</span>
          </div>
        </div>
      </div>
      <div className="static z-10 mt-20 px-4 py-4 md:py-6 lg:px-6">
        <Card className="@container/card">
          <DataTable data={data} />
        </Card>
      </div>
    </div>
  )
}
