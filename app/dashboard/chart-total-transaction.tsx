'use client'

import * as React from 'react'

import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

import LoadingSpinner from '@/components/loading-spinner'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import { formatNumber } from '@/lib/utils'
import { fetchTransactions, filterCurrentMonthTransactions } from '@/services/transaction-service'
import { Transaction } from '@/types/transaction'

export const description = 'An interactive area chart'

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
  const { data: session, status }: any = useSession()

  const {
    data: results,
    isPending,
    isFetching
  } = useQuery({ queryKey: ['transactions'], queryFn: fetchTransactions })

  const isLoading = isPending || isFetching || status === 'loading'
  if (isLoading) return <LoadingSpinner />

  const data = results.filter((v: any) => v.userId === session?.user.id)

  const chartData = filterCurrentMonthTransactions(data as Transaction[])
  const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig | 'all'>('all')

  const total = React.useMemo(
    () => ({
      income: chartData.reduce((acc, curr) => acc + curr.income, 0),
      expense: chartData.reduce((acc, curr) => acc + curr.expense, 0)
    }),
    [chartData]
  )

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total Transaksi</CardTitle>
        <CardDescription>Menampilkan total transaksi selama 1 bulan terakhir</CardDescription>
      </CardHeader>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="grid grid-cols-3">
          {(['income', 'expense'] as const).map(chart => {
            // const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="data-[active=true]:bg-muted/50 relative z-30 flex flex-1 cursor-pointer flex-col justify-center gap-2 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-muted-foreground text-xs">{chartConfig[chart].label}</span>
                <span className="truncate text-lg leading-none font-bold sm:text-2xl">
                  Rp {formatNumber(total[chart])}
                </span>
              </button>
            )
          })}
          <button
            data-active={activeChart === 'all'}
            className="data-[active=true]:bg-muted/50 relative z-30 flex flex-1 cursor-pointer flex-col justify-start gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
            onClick={() => setActiveChart('all')}
          >
            <span className="truncate text-lg leading-none font-bold sm:text-2xl">All</span>
          </button>
        </div>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 16
            }}
          >
            <defs>
              <linearGradient id="fillIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-income)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-income)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-expense)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-expense)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={value => {
                const date = new Date(value)
                return date.toLocaleDateString(navigator.language, {
                  month: 'short',
                  day: 'numeric'
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={value => {
                    return new Date(value).toLocaleDateString(navigator.language, {
                      month: 'short',
                      day: 'numeric'
                    })
                  }}
                  indicator="dot"
                />
              }
            />

            {activeChart !== 'all' && (
              <Area
                dataKey={activeChart}
                stroke={`var(--color-${activeChart})`}
                type="natural"
                fill={`url(#fill${activeChart === 'expense' ? 'Expense' : 'Income'})`}
                stackId="a"
              />
            )}
            {activeChart === 'all' && (
              <Area
                dataKey="expense"
                stroke="var(--color-expense)"
                type="natural"
                fill="url(#fillExpense)"
                stackId="a"
              />
            )}
            {activeChart === 'all' && (
              <Area
                dataKey="income"
                stroke="var(--color-income)"
                type="natural"
                fill="url(#fillIncome)"
                stackId="a"
              />
            )}

            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
