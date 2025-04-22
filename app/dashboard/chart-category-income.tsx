'use client'

import * as React from 'react'

import { Bar, BarChart, LabelList, XAxis, YAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import data from '@/constants/transaction.json'
import { formatNumber, formatRupiah } from '@/lib/utils'
import { getMonthlyCategoryTransactions } from '@/services/transaction-service'
import { Transaction } from '@/types/transaction'

const chartDefault = [
  { kategori: 'gaji', total: 0, fill: 'var(--color-gaji)' },
  { kategori: 'sampingan', total: 0, fill: 'var(--color-sampingan)' },
  { kategori: 'bonus', total: 0, fill: 'var(--color-bonus)' },
  { kategori: 'investasi', total: 0, fill: 'var(--color-investasi)' },
  { kategori: 'lainya', total: 0, fill: 'var(--color-lainya)' }
]

const chartConfig = {
  total: {
    label: 'Total'
  },
  gaji: {
    label: 'Gaji',
    color: 'var(--chart-1)'
  },
  investasi: {
    label: 'Investasi',
    color: 'var(--chart-2)'
  },
  bonus: {
    label: 'Bonus',
    color: 'var(--chart-3)'
  },
  sampingan: {
    label: 'Sampingan',
    color: 'var(--chart-4)'
  },
  lainya: {
    label: 'Lainya',
    color: 'var(--chart-5)'
  }
} satisfies ChartConfig

export function ChartCategoryIncome() {
  const summary = getMonthlyCategoryTransactions(data as Transaction[])
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
        <CardTitle>Pemasukan Bulanan</CardTitle>
        <CardDescription>Pemasukan berdasarkan sumber bulan ini</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[250px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 20,
              right: 40
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
          Total pemasukan bulan ini <span className="font-bold underline">{formatRupiah(total)}</span>
        </div>
      </CardFooter>
    </Card>
  )
}
