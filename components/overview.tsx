'use client'

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts'

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
  { name: 'Jan', expense: 250000, income: 1000000 },
  { name: 'Feb', expense: 320000, income: 1000000 },
  { name: 'Mar', expense: 15000, income: 1000000 },
  { name: 'Apr', expense: 400000, income: 520000 },
  { name: 'May', expense: 28000, income: 1500000 },
  { name: 'Jun', expense: 330000, income: 1000000 },
  { name: 'Jul', expense: 210000, income: 1000000 },
  { name: 'Aug', expense: 37000, income: 1300000 },
  { name: 'Sep', expense: 1000000, income: 1100000 },
  { name: 'Oct', expense: 340000, income: 1600000 },
  { name: 'Nov', expense: 220000, income: 1900000 },
  { name: 'Dec', expense: 31000, income: 1800000 }
]

const chartConfig = {
  visitors: {
    label: 'Visitors'
  },
  desktop: {
    label: 'Expense',
    color: 'var(--color-chart-1)'
  },
  mobile: {
    label: 'Income',
    color: 'var(--color-chart-2)'
  }
} satisfies ChartConfig

export function Overview() {
  const isMobile = useIsMobile()

  return (
    <ResponsiveContainer width="100%">
      <ChartContainer config={chartConfig}>
        <BarChart data={data} accessibilityLayer>
          <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />

          <YAxis
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={value => `Rp ${formatNumber(value)}`}
          />

          <ChartTooltip
            defaultIndex={isMobile ? -1 : 10}
            content={<ChartTooltipContent className="w-[200px] capitalize" />}
          />

          <Bar dataKey="expense" fill="var(--color-mobile)" radius={4} />
          <Bar dataKey="income" fill="var(--color-desktop)" radius={4} />
        </BarChart>
      </ChartContainer>
    </ResponsiveContainer>
  )
}
