'use client'

import * as React from 'react'

import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, XAxis } from 'recharts'

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useIsMobile } from '@/hooks/use-mobile'

export const description = 'An interactive area chart'

const chartData = [
  { date: '2024-04-01', income: 2, expense: 6 },
  { date: '2024-04-02', income: 1, expense: 7 },
  { date: '2024-04-03', income: 1, expense: 4 },
  { date: '2024-04-04', income: 3, expense: 0 },
  { date: '2024-04-05', income: 6, expense: 4 },
  { date: '2024-04-06', income: 5, expense: 7 },
  { date: '2024-04-07', income: 9, expense: 8 },
  { date: '2024-04-08', income: 2, expense: 2 },
  { date: '2024-04-09', income: 0, expense: 9 },
  { date: '2024-04-10', income: 7, expense: 2 },
  { date: '2024-04-11', income: 5, expense: 4 },
  { date: '2024-04-12', income: 9, expense: 1 },
  { date: '2024-04-13', income: 3, expense: 8 },
  { date: '2024-04-14', income: 2, expense: 2 },
  { date: '2024-04-15', income: 4, expense: 1 },
  { date: '2024-04-16', income: 7, expense: 7 },
  { date: '2024-04-17', income: 7, expense: 6 },
  { date: '2024-04-18', income: 3, expense: 7 },
  { date: '2024-04-19', income: 6, expense: 8 },
  { date: '2024-04-20', income: 6, expense: 1 },
  { date: '2024-04-21', income: 5, expense: 8 },
  { date: '2024-04-22', income: 8, expense: 0 },
  { date: '2024-04-23', income: 2, expense: 0 },
  { date: '2024-04-24', income: 6, expense: 2 },
  { date: '2024-04-25', income: 1, expense: 3 },
  { date: '2024-04-26', income: 2, expense: 2 },
  { date: '2024-04-27', income: 0, expense: 9 },
  { date: '2024-04-28', income: 7, expense: 7 },
  { date: '2024-04-29', income: 8, expense: 4 },
  { date: '2024-04-30', income: 1, expense: 0 },
  { date: '2024-05-01', income: 2, expense: 9 },
  { date: '2024-05-02', income: 5, expense: 2 },
  { date: '2024-05-03', income: 1, expense: 3 },
  { date: '2024-05-04', income: 2, expense: 4 },
  { date: '2024-05-05', income: 6, expense: 9 },
  { date: '2024-05-06', income: 8, expense: 4 },
  { date: '2024-05-07', income: 1, expense: 6 },
  { date: '2024-05-08', income: 7, expense: 5 },
  { date: '2024-05-09', income: 3, expense: 2 },
  { date: '2024-05-10', income: 2, expense: 8 },
  { date: '2024-05-11', income: 8, expense: 3 },
  { date: '2024-05-12', income: 8, expense: 9 },
  { date: '2024-05-13', income: 3, expense: 1 },
  { date: '2024-05-14', income: 9, expense: 1 },
  { date: '2024-05-15', income: 7, expense: 8 },
  { date: '2024-05-16', income: 0, expense: 9 },
  { date: '2024-05-17', income: 5, expense: 5 },
  { date: '2024-05-18', income: 6, expense: 5 },
  { date: '2024-05-19', income: 6, expense: 9 },
  { date: '2024-05-20', income: 6, expense: 0 },
  { date: '2024-05-21', income: 6, expense: 0 },
  { date: '2024-05-22', income: 6, expense: 4 },
  { date: '2024-05-23', income: 4, expense: 4 },
  { date: '2024-05-24', income: 0, expense: 0 },
  { date: '2024-05-25', income: 4, expense: 3 },
  { date: '2024-05-26', income: 0, expense: 0 },
  { date: '2024-05-27', income: 4, expense: 1 },
  { date: '2024-05-28', income: 5, expense: 4 },
  { date: '2024-05-29', income: 2, expense: 1 },
  { date: '2024-05-30', income: 4, expense: 1 },
  { date: '2024-05-31', income: 5, expense: 9 },
  { date: '2024-06-01', income: 2, expense: 4 },
  { date: '2024-06-02', income: 4, expense: 4 },
  { date: '2024-06-03', income: 5, expense: 9 },
  { date: '2024-06-04', income: 9, expense: 2 },
  { date: '2024-06-05', income: 0, expense: 5 },
  { date: '2024-06-06', income: 0, expense: 1 },
  { date: '2024-06-07', income: 0, expense: 5 },
  { date: '2024-06-08', income: 7, expense: 2 },
  { date: '2024-06-09', income: 8, expense: 4 },
  { date: '2024-06-10', income: 7, expense: 2 },
  { date: '2024-06-11', income: 4, expense: 5 },
  { date: '2024-06-12', income: 3, expense: 5 },
  { date: '2024-06-13', income: 4, expense: 5 },
  { date: '2024-06-14', income: 9, expense: 8 },
  { date: '2024-06-15', income: 7, expense: 8 },
  { date: '2024-06-16', income: 9, expense: 3 },
  { date: '2024-06-17', income: 4, expense: 2 },
  { date: '2024-06-18', income: 3, expense: 4 },
  { date: '2024-06-19', income: 5, expense: 7 },
  { date: '2024-06-20', income: 8, expense: 5 },
  { date: '2024-06-21', income: 5, expense: 4 },
  { date: '2024-06-22', income: 7, expense: 0 },
  { date: '2024-06-23', income: 2, expense: 0 },
  { date: '2024-06-24', income: 9, expense: 5 },
  { date: '2024-06-25', income: 5, expense: 5 },
  { date: '2024-06-26', income: 5, expense: 7 },
  { date: '2024-06-27', income: 6, expense: 5 },
  { date: '2024-06-28', income: 5, expense: 4 },
  { date: '2024-06-29', income: 9, expense: 2 },
  { date: '2024-06-30', income: 5, expense: 0 }
]

const chartConfig = {
  visitors: {
    label: 'Visitors'
  },
  income: {
    label: 'Income',
    color: 'var(--color-chart-1)'
  },
  expense: {
    label: 'Expense',
    color: 'var(--color-chart-2)'
  }
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState('30d')
  const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig | 'all'>('all')

  const total = React.useMemo(
    () => ({
      income: chartData.reduce((acc, curr) => acc + curr.income, 0),
      expense: chartData.reduce((acc, curr) => acc + curr.expense, 0)
    }),
    []
  )

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange('7d')
    }
  }, [isMobile])

  const filteredData = chartData.filter(item => {
    const date = new Date(item.date)
    const referenceDate = new Date('2024-06-30')
    let daysToSubtract = 90
    if (timeRange === '30d') {
      daysToSubtract = 30
    } else if (timeRange === '7d') {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total Transaksi</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total selama {timeRange === '7d' ? '7 Hari' : timeRange === '30d' ? '1 bulan' : '3 bulan'}{' '}
            terakhir
          </span>
          <span className="@[540px]/card:hidden">
            Total selama {timeRange === '7d' ? '7 Hari' : timeRange === '30d' ? '1 bulan' : '3 bulan'}{' '}
            terakhir
          </span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">3 bulan terakhir</ToggleGroupItem>
            <ToggleGroupItem value="30d">1 bulan terakhir</ToggleGroupItem>
            <ToggleGroupItem value="7d">7 hari terakhir</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                3 bulan terakhir
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                1 bulan terakhir
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                7 hari terakhir
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        {/* <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Bar Chart - Interactive</CardTitle>
          <CardDescription>Showing total visitors for the last 3 months</CardDescription>
        </div> */}
        <div className="grid grid-cols-3">
          {['income', 'expense'].map(key => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="data-[active=true]:bg-muted/50 relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-muted-foreground text-xs">{chartConfig[chart].label}</span>
                <span className="text-lg leading-none font-bold sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            )
          })}
          <button
            data-active={activeChart === 'all'}
            className="data-[active=true]:bg-muted/50 relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
            onClick={() => setActiveChart('all')}
          >
            <span className="text-muted-foreground text-xs">All</span>
            <span className="text-lg leading-none font-bold sm:text-3xl">
              {(total['expense'] + total['income']).toLocaleString()}
            </span>
          </button>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <LineChart
            accessibilityLayer
            data={filteredData}
            margin={{
              left: 12,
              right: 12
            }}
          >
            {/* <defs>
              <linearGradient id="fillincome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-income)" stopOpacity={1.0} />
                <stop offset="95%" stopColor="var(--color-income)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillexpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-expense)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-expense)" stopOpacity={0.1} />
              </linearGradient>
            </defs> */}
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
              // <Area
              //   dataKey={activeChart}
              //   type="natural"
              //   fill={activeChart === 'expense' ? 'url(#fillexpense)' : 'url(#fillincome)'}
              //   stroke={`var(--color-${activeChart})`}
              //   stackId="a"
              // />
              // <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} radius={4} />
              <Line
                dataKey={activeChart}
                type="linear"
                stroke={`var(--color-${activeChart})`}
                strokeWidth={2}
                dot={false}
              />
            )}
            {activeChart === 'all' && (
              // <Area
              //   dataKey="expense"
              //   type="natural"
              //   fill="url(#fillexpense)"
              //   stroke="var(--color-expense)"
              //   stackId="a"
              // />
              // <Bar dataKey="expense" fill="var(--color-expense)" radius={4} />
              <Line
                dataKey="expense"
                type="linear"
                stroke="var(--color-expense)"
                strokeWidth={2}
                dot={false}
              />
            )}
            {activeChart === 'all' && (
              // <Area
              //   dataKey="income"
              //   type="natural"
              //   fill="url(#fillincome)"
              //   stroke="var(--color-income)"
              //   stackId="a"
              // />
              // <Bar dataKey="income" fill="var(--color-income)" radius={4} />
              <Line
                dataKey="income"
                type="linear"
                stroke="var(--color-income)"
                strokeWidth={2}
                dot={false}
              />
            )}
          </LineChart>
          {/* <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillincome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-income)" stopOpacity={1.0} />
                <stop offset="95%" stopColor="var(--color-income)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillexpense" x1="0" y1="0" x2="0" y2="1">
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
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              defaultIndex={isexpense ? -1 : 10}
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
            <Area
              dataKey="expense"
              type="natural"
              fill="url(#fillexpense)"
              stroke="var(--color-expense)"
              stackId="a"
            />
            <Area
              dataKey="income"
              type="natural"
              fill="url(#fillincome)"
              stroke="var(--color-income)"
              stackId="a"
            />
          </AreaChart> */}
          {/* <BarChart accessibilityLayer data={filteredData}>
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
              defaultIndex={isexpense ? -1 : 10}
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
            <Bar dataKey="income" fill="var(--color-income)" radius={4} />
            <Bar dataKey="expense" fill="var(--color-expense)" radius={4} />
          </BarChart> */}
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
