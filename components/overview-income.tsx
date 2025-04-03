'use client'

import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, XAxis, YAxis } from 'recharts'

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import { formatNumber } from '@/lib/utils'

const chartData = [
  { month: 'January', income: 1000000 },
  { month: 'February', income: 3050000 },
  { month: 'March', income: 2370000 },
  { month: 'April', income: 730000 },
  { month: 'May', income: 1000000 },
  { month: 'June', income: 2140000 }
  // { month: 'July', income: 1250000 },
  // { month: 'August', income: 2250000 },
  // { month: 'September', income: 2400000 },
  // { month: 'October', income: 2750000 },
  // { month: 'November', income: 2600000 },
  // { month: 'December', income: 1000000 }
]

const chartConfig = {
  income: {
    label: 'Income',
    color: 'var(--color-chart-2)'
  }
} satisfies ChartConfig

export function OverviewIncome() {
  return (
    <ResponsiveContainer width="100%">
      <ChartContainer config={chartConfig} className="aspect-auto h-[350px] w-full">
        {/* <BarChart
          accessibilityLayer
          data={chartData}
          layout="vertical"
          margin={{
            left: -20,
            right: 30
          }}
        >
          <XAxis type="number" dataKey="income" hide />
          <YAxis
            dataKey="month"
            type="category"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={value => value.slice(0, 3)}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Bar dataKey="income" layout="vertical" fill="var(--color-income)" radius={8}>
            <LabelList
              dataKey="income"
              position="right"
              offset={8}
              className="fill-foreground"
              fontSize={12}
              formatter={(value: number) => formatNumber(value)}
            />
          </Bar>
        </BarChart> */}
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={value => value.slice(0, 3)}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Bar dataKey="income" fill="var(--color-income)" radius={8} />
        </BarChart>
      </ChartContainer>
    </ResponsiveContainer>
  )
}
