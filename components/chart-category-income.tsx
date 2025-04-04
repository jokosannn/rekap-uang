'use client'

import * as React from 'react'

import { TrendingUp } from 'lucide-react'
import { Bar, BarChart, Label, LabelList, Pie, PieChart, XAxis, YAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import { formatNumber } from '@/lib/utils'

const chartData = [
  { kategori: 'gaji', visitors: 1000000, fill: 'var(--color-gaji)' },
  { kategori: 'sideHustle', visitors: 200000, fill: 'var(--color-sideHustle)' },
  { kategori: 'bonus', visitors: 50000, fill: 'var(--color-bonus)' },
  { kategori: 'investasi', visitors: 0, fill: 'var(--color-investasi)' },
  { kategori: 'lainya', visitors: 100000, fill: 'var(--color-lainya)' }
]

const chartConfig = {
  visitors: {
    label: 'Visitors'
  },
  gaji: {
    label: 'Gaji',
    color: 'hsl(var(--chart-1))'
  },
  investasi: {
    label: 'Investasi',
    color: 'hsl(var(--chart-2))'
  },
  bonus: {
    label: 'Bonus',
    color: 'hsl(var(--chart-3))'
  },
  sideHustle: {
    label: 'Sampingan',
    color: 'hsl(var(--chart-4))'
  },
  lainya: {
    label: 'Lainya',
    color: 'hsl(var(--chart-5))'
  }
} satisfies ChartConfig

export function ChartCategoryIncome() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Mixed</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[200px] w-full">
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
            <XAxis dataKey="visitors" type="number" hide />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="visitors" layout="vertical" radius={5}>
              <LabelList
                dataKey="visitors"
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
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
