'use client'

import * as React from 'react'

import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { Bar, BarChart, LabelList, XAxis, YAxis } from 'recharts'

import LoadingSpinner from '@/components/loading-spinner'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { formatNumber, formatRupiah } from '@/lib/utils'
import { fetchTransactions, getMonthlyCategoryTransactions } from '@/services/transaction-service'
import { Transaction } from '@/types/transaction'

const chartDefault = [
  { kategori: 'jajan', total: 0, fill: 'var(--color-jajan)' },
  { kategori: 'transportasi', total: 0, fill: 'var(--color-transportasi)' },
  { kategori: 'belanja', total: 0, fill: 'var(--color-belanja)' },
  { kategori: 'hiburan', total: 0, fill: 'var(--color-hiburan)' },
  { kategori: 'lainnya', total: 0, fill: 'var(--color-lainnya)' }
]

const chartConfig = {
  total: {
    label: 'Total'
  },
  jajan: {
    label: 'Jajan',
    color: 'var(--chart-1)'
  },
  transportasi: {
    label: 'Transportasi',
    color: 'var(--chart-2)'
  },
  belanja: {
    label: 'Belanja',
    color: 'var(--chart-3)'
  },
  hiburan: {
    label: 'Hiburan',
    color: 'var(--chart-4)'
  },
  lainnya: {
    label: 'Lainnya',
    color: 'var(--chart-5)'
  }
} satisfies ChartConfig

export function ChartCategoryExpense() {
  const { data: session, status }: any = useSession()

  const {
    data: results,
    isPending,
    isFetching
  } = useQuery({ queryKey: ['transactions'], queryFn: fetchTransactions })

  const isLoading = isPending || isFetching || status === 'loading'
  if (isLoading) return <LoadingSpinner />

  const data = results.filter((v: any) => v.userId === session?.user.id)

  const summary = getMonthlyCategoryTransactions(data as Transaction[], 'Expense')
  const chartData = chartDefault.map(tx => {
    const found = summary.find(s => s.kategori === tx.kategori)
    return {
      ...tx,
      total: found ? found.total : 0
    }
  })

  const total = React.useMemo(() => chartData.reduce((acc, curr) => acc + curr.total, 0), [chartData])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pengeluaran Bulanan</CardTitle>
        <CardDescription>Pengeluaran berdasarkan kategori bulan ini</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[250px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 28,
              right: 50
            }}
          >
            <YAxis
              dataKey="kategori"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={value => chartConfig[value as keyof typeof chartConfig]?.label}
            />
            <XAxis dataKey="total" type="number" hide />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="total" layout="vertical" radius={5}>
              <LabelList
                dataKey="total"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
                formatter={(v: number) => formatNumber(v)}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Total pengeluaran bulan ini <span className="font-bold underline">{formatRupiah(total)}</span>
        </div>
      </CardFooter>
    </Card>
  )
}
