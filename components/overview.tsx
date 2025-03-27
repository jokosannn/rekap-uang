'use client'

import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, XAxis, YAxis } from 'recharts'

import { useIsMobile } from '@/hooks/use-mobile'

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart'

const formatRupiah = (number: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number)
}

const formatNumber = (number: number) => {
  if (number >= 1_000_000) {
    return (number / 1_000_000).toFixed(1).replace('.0', '') + 'jt'
  } else if (number >= 1_000) {
    return (number / 1_000).toFixed(1).replace('.0', '') + 'k'
  }
  return number === 0 ? (
    number.toString()
  ) : (
    <span className="whitespace-nowrap">{number.toString()}</span>
  )
}

const data = [
  { month: 'Jan', expense: 250000, income: 1000000 },
  { month: 'Feb', expense: 320000, income: 1000000 },
  { month: 'Mar', expense: 15000, income: 1000000 },
  { month: 'Apr', expense: 400000, income: 520000 },
  { month: 'May', expense: 28000, income: 1500000 },
  { month: 'Jun', expense: 330000, income: 1000000 },
  { month: 'Jul', expense: 210000, income: 1000000 },
  { month: 'Aug', expense: 37000, income: 1300000 },
  { month: 'Sep', expense: 1000000, income: 1100000 },
  { month: 'Oct', expense: 340000, income: 1600000 },
  { month: 'Nov', expense: 220000, income: 1900000 },
  { month: 'Dec', expense: 31000, income: 1800000 }
]

const chartConfig = {
  income: {
    label: 'Income',
    color: 'var(--color-chart-1)'
  },
  expense: {
    label: 'Expense',
    color: 'var(--color-chart-2)'
  },
  label: {
    color: 'var(--background)'
  }
} satisfies ChartConfig

// const chartConfig = {
//   visitors: {
//     label: 'Visitors'
//   },
//   desktop: {
//     label: 'Expense',
//     color: 'var(--color-chart-1)'
//   },
//   mobile: {
//     label: 'Income',
//     color: 'var(--color-chart-2)'
//   }
// } satisfies ChartConfig

export function Overview() {
  return (
    <ResponsiveContainer width="100%">
      <ChartContainer config={chartConfig}>
        <BarChart
          accessibilityLayer
          data={data}
          layout="vertical"
          // margin={{
          //   right: 16
          // }}
        >
          <CartesianGrid horizontal={false} />
          <YAxis
            dataKey="month"
            type="category"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={value => value.slice(0, 3)}
            hide
          />
          <XAxis dataKey="income" type="number" hide />
          <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
          <Bar dataKey="income" layout="vertical" fill="var(--color-income)" radius={4}>
            <LabelList
              dataKey="month"
              position="insideLeft"
              offset={8}
              className="fill-foreground"
              fontSize={12}
            />
            <LabelList
              dataKey="income"
              position="right"
              offset={8}
              className="fill-foreground"
              fontSize={12}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </ResponsiveContainer>
  )
}
