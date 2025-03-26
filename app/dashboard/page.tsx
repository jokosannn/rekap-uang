import { IconInnerShadowTop } from '@tabler/icons-react'

import { ChartAreaInteractive } from '@/components/chart-area-interactive'
import { DataTable } from '@/components/data-table'
import { Overview } from '@/components/overview'
import { RecentTransaction } from '@/components/recent-transaction'
import { SectionCards } from '@/components/section-cards'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import data from './data.json'

export default function Page() {
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
      <div className="static z-10 mt-20 flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <SectionCards />

        <div className="px-4 lg:px-6">
          <ChartAreaInteractive />
          <div className="mt-6 grid flex-1 scroll-mt-20 items-start gap-6 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Transaksi Terakhir</CardTitle>
                <CardDescription>5 transaksi bulan ini.</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentTransaction />
              </CardContent>
            </Card>
          </div>
          {/* <Card className="col-span-3 mt-6">
            <CardHeader>
              <CardTitle>Transaksi Terakhir</CardTitle>
              <CardDescription>5 transaksi bulan ini.</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentTransaction />
            </CardContent>
          </Card> */}
        </div>
        {/* <DataTable data={data} /> */}
      </div>
    </div>
  )
}
