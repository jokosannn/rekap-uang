import { IconInnerShadowTop } from '@tabler/icons-react'

import { ChartAreaInteractive } from '@/components/chart-area-interactive'
import { DataTable } from '@/components/data-table'
import { RecentTransaction } from '@/components/recent-transaction'
import { SectionCards } from '@/components/section-cards'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import data from './data.json'

export default function Page() {
  return (
    <div className="relative flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="from-primary/10 to-card bg-card absolute top-0 right-0 left-0 z-0 h-[180px] w-full rounded-2xl bg-gradient-to-t px-4 lg:px-6">
        <div className="font-bricolage mt-6 flex items-center gap-2">
          <IconInnerShadowTop className="size-12" />
          <div className="flex flex-col">
            <span className="text-lg font-medium">Hai,</span>
            <span className="text-2xl font-bold">Joko Santoso</span>
          </div>
        </div>
      </div>

      <div className="static z-10 pt-20">
        <SectionCards />
      </div>

      <div className="static z-10 px-4 lg:px-6">
        <ChartAreaInteractive />
        <Card className="col-span-3 mt-6">
          <CardHeader>
            <CardTitle>Transaksi Terakhir</CardTitle>
            <CardDescription>5 transaksi bulan ini.</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentTransaction />
          </CardContent>
        </Card>
      </div>
      {/* <DataTable data={data} /> */}
    </div>
  )
}
