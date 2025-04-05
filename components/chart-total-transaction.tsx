'use client'

import * as React from 'react'

import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import data from '@/constants/transaction.json'
import { useIsMobile } from '@/hooks/use-mobile'
import { filterCurrentMonthTransactions, formatNumber } from '@/lib/utils'
import { Transaction } from '@/types/transaction'

export const description = 'An interactive area chart'

// const chartData = [
//   { date: '2024-06-01', income: 0, expense: 15000 },
//   { date: '2024-06-02', income: 0, expense: 15000 },
//   { date: '2024-06-03', income: 0, expense: 15000 },
//   { date: '2024-06-04', income: 0, expense: 15000 },
//   { date: '2024-06-05', income: 1000000, expense: 15000 },
//   { date: '2024-06-06', income: 0, expense: 15000 },
//   { date: '2024-06-07', income: 0, expense: 15000 },
//   { date: '2024-06-08', income: 0, expense: 15000 },
//   { date: '2024-06-09', income: 0, expense: 15000 },
//   { date: '2024-06-10', income: 0, expense: 15000 },
//   { date: '2024-06-11', income: 0, expense: 15000 },
//   { date: '2024-06-12', income: 0, expense: 15000 },
//   { date: '2024-06-13', income: 200000, expense: 15000 },
//   { date: '2024-06-14', income: 0, expense: 15000 },
//   { date: '2024-06-15', income: 0, expense: 15000 },
//   { date: '2024-06-16', income: 0, expense: 150000 },
//   { date: '2024-06-17', income: 0, expense: 15000 },
//   { date: '2024-06-18', income: 0, expense: 15000 },
//   { date: '2024-06-19', income: 0, expense: 15000 },
//   { date: '2024-06-20', income: 0, expense: 15000 },
//   { date: '2024-06-21', income: 0, expense: 15000 },
//   { date: '2024-06-22', income: 0, expense: 15000 },
//   { date: '2024-06-23', income: 0, expense: 15000 },
//   { date: '2024-06-24', income: 0, expense: 15000 },
//   { date: '2024-06-25', income: 200000, expense: 15000 },
//   { date: '2024-06-26', income: 0, expense: 15000 },
//   { date: '2024-06-27', income: 0, expense: 15000 },
//   { date: '2024-06-28', income: 0, expense: 15000 },
//   { date: '2024-06-29', income: 0, expense: 15000 },
//   { date: '2024-06-30', income: 0, expense: 15000 }
// ]

const chartData = filterCurrentMonthTransactions(data as Transaction[])

const chartConfig = {
  income: {
    label: 'Income',
    color: 'var(--color-chart-1)'
  },
  expense: {
    label: 'Expense',
    color: 'var(--color-chart-2)'
  }
} satisfies ChartConfig

export function ChartTotalTransaction() {
  const isMobile = useIsMobile()
  const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig | 'all'>('all')

  const total = React.useMemo(
    () => ({
      income: chartData.reduce((acc, curr) => acc + curr.income, 0),
      expense: chartData.reduce((acc, curr) => acc + curr.expense, 0)
    }),
    []
  )

  const totalTransaksi = React.useMemo(
    () => ({
      income: chartData.filter(item => item.income),
      expense: chartData.filter(item => item.expense)
    }),
    []
  )

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total Transaksi</CardTitle>
        <CardDescription>Menampilkan total transaksi selama 1 bulan terakhir</CardDescription>
      </CardHeader>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="grid grid-cols-3">
          {['income', 'expense'].map(key => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="data-[active=true]:bg-muted/50 relative z-30 flex flex-1 flex-col justify-center gap-2 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-muted-foreground text-xs">{chartConfig[chart].label}</span>
                <span className="truncate text-lg leading-none font-bold sm:text-2xl">
                  Rp {formatNumber(total[key as keyof typeof total])}
                </span>
                <span className="text-xs leading-none font-medium sm:text-sm">
                  {totalTransaksi[key as keyof typeof total].length} Transaksi
                </span>
              </button>
            )
          })}
          <button
            data-active={activeChart === 'all'}
            className="data-[active=true]:bg-muted/50 relative z-30 flex flex-1 flex-col justify-start gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
            onClick={() => setActiveChart('all')}
          >
            <span className="text-muted-foreground text-xs">All</span>
            <span className="text-xs leading-none font-medium sm:text-sm">
              {totalTransaksi['expense'].length + totalTransaksi['income'].length} Transaksi
            </span>
          </button>
        </div>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={value => {
                const date = new Date(value)
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              defaultIndex={isMobile ? -1 : 10}
              content={
                <ChartTooltipContent
                  labelFormatter={value => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            {activeChart !== 'all' && (
              <Line
                dataKey={activeChart}
                type="monotone"
                stroke={`var(--color-${activeChart})`}
                strokeWidth={2}
                dot={false}
              />
            )}
            {activeChart === 'all' && (
              <Line
                dataKey="expense"
                type="monotone"
                stroke="var(--color-expense)"
                strokeWidth={2}
                dot={false}
              />
            )}
            {activeChart === 'all' && (
              <Line
                dataKey="income"
                type="monotone"
                stroke="var(--color-income)"
                strokeWidth={2}
                dot={false}
              />
            )}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
