'use client'

import { Bar, BarChart, LabelList, ResponsiveContainer, XAxis, YAxis } from 'recharts'

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import { formatNumber } from '@/lib/utils'

const chartData = [
  { month: 'January', expense: 250000 },
  { month: 'February', expense: 305000 },
  { month: 'March', expense: 237000 },
  { month: 'April', expense: 73000 },
  { month: 'May', expense: 10000 },
  { month: 'June', expense: 214000 },
  { month: 'July', expense: 1250000 },
  { month: 'August', expense: 225000 },
  { month: 'September', expense: 240000 },
  { month: 'October', expense: 275000 },
  { month: 'November', expense: 260000 },
  { month: 'December', expense: 1000 }
]

const chartConfig = {
  expense: {
    label: 'Expense',
    color: 'var(--color-chart-1)'
  }
} satisfies ChartConfig

export function OverviewExpense() {
  return (
    <ResponsiveContainer width="100%">
      <ChartContainer config={chartConfig} className="aspect-auto h-[450px] w-full">
        <BarChart
          accessibilityLayer
          data={chartData}
          layout="vertical"
          margin={{
            left: -20,
            right: 30
          }}
        >
          <XAxis type="number" dataKey="expense" hide />
          <YAxis
            dataKey="month"
            type="category"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={value => value.slice(0, 3)}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Bar dataKey="expense" layout="vertical" fill="var(--color-expense)" radius={8}>
            <LabelList
              dataKey="expense"
              position="right"
              offset={8}
              className="fill-foreground"
              fontSize={12}
              formatter={(value: number) => formatNumber(value)}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </ResponsiveContainer>
  )
}
