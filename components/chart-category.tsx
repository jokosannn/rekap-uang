'use client'

import * as React from 'react'

import { TrendingUp } from 'lucide-react'
import { Label, Pie, PieChart } from 'recharts'

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

const chartData = [
  { kategori: 'makanan', visitors: 275000, fill: 'var(--color-makanan)' },
  { kategori: 'transportasi', visitors: 200000, fill: 'var(--color-transportasi)' },
  { kategori: 'belanja', visitors: 287000, fill: 'var(--color-belanja)' },
  { kategori: 'hiburan', visitors: 173000, fill: 'var(--color-hiburan)' },
  { kategori: 'tagihan', visitors: 190000, fill: 'var(--color-tagihan)' },
  { kategori: 'lainya', visitors: 10000, fill: 'var(--color-lainya)' }
]

const chartConfig = {
  visitors: {
    label: 'Visitors'
  },
  makanan: {
    label: 'Makanan',
    color: 'hsl(var(--chart-1))'
  },
  transportasi: {
    label: 'Transportasi',
    color: 'hsl(var(--chart-2))'
  },
  belanja: {
    label: 'Belanja',
    color: 'hsl(var(--chart-3))'
  },
  hiburan: {
    label: 'Hiburan',
    color: 'hsl(var(--chart-4))'
  },
  tagihan: {
    label: 'Tagihan',
    color: 'hsl(var(--chart-5))'
  },
  lainya: {
    label: 'Lainya',
    color: 'hsl(var(--primary))'
  }
} satisfies ChartConfig

export function ChartCategory() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
  }, [])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pengeluaran Bulanan</CardTitle>
        <CardDescription>Pengeluaran berdasarkan kategori bulan ini</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="visitors" nameKey="kategori" innerRadius={0} strokeWidth={5}>
              {/* <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    )
                  }
                }}
              /> */}
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="kategori" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
