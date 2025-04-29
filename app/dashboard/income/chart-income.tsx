'use client'

import * as React from 'react'

import { format, subDays } from 'date-fns'
import { id } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import { DateRange } from 'react-day-picker'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts'

import { TransactionHistory } from '@/components/transaction-history'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn, formatNumber, formatRupiah } from '@/lib/utils'
import {
  filterTransactions,
  formatDateRangeDiff,
  getMonthlyCategoryTransactions
} from '@/services/transaction-service'
import { getTransactionHistory } from '@/services/transaction-service'
import { Transaction } from '@/types/transaction'

const chartDefault = [
  { kategori: 'gaji', total: 0, fill: 'var(--color-gaji)' },
  { kategori: 'sampingan', total: 0, fill: 'var(--color-sampingan)' },
  { kategori: 'bonus', total: 0, fill: 'var(--color-bonus)' },
  { kategori: 'investasi', total: 0, fill: 'var(--color-investasi)' },
  { kategori: 'lainnya', total: 0, fill: 'var(--color-lainnya)' }
]

const chartConfig = {
  pemasukan: {
    label: 'Pemasukan',
    color: 'var(--chart-1)'
  }
} satisfies ChartConfig

const chartConfigCategory = {
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
  lainnya: {
    label: 'Lainnya',
    color: 'var(--chart-5)'
  }
} satisfies ChartConfig

export function ChartIncome({ data }: { data: any }) {
  const [timeRange, setTimeRange] = React.useState<number>(30)
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date()
  })

  const startTimeLabel = date?.from && format(new Date(date?.from), 'dd MMMM yyyy', { locale: id }) // label date from
  const endTimeLabel = date?.to && format(new Date(date?.to), 'dd MMMM yyyy', { locale: id }) // label date to
  const days = formatDateRangeDiff(date) // jumlah hari

  // chart
  const chartData = React.useMemo(() => filterTransactions(data as Transaction[], 'Income'), [data])
  const filteredData = React.useMemo(() => {
    const now = new Date()
    const startDate = date?.from ?? new Date(now.getFullYear(), now.getMonth(), 1)
    const endDate = date?.to ?? (date ? startDate : now)

    return chartData.filter(item => {
      const txDate = new Date(item.date)
      const isSameDay =
        !date?.to &&
        date &&
        txDate.getFullYear() === startDate.getFullYear() &&
        txDate.getMonth() === startDate.getMonth() &&
        txDate.getDate() === startDate.getDate()

      const isInRange = txDate >= startDate && txDate <= endDate

      return isSameDay || isInRange
    })
  }, [chartData, timeRange, date])

  React.useEffect(() => {
    const diff = formatDateRangeDiff(date)
    setTimeRange(diff)
  }, [date])

  // category
  const summary = getMonthlyCategoryTransactions(data as Transaction[], 'Income', date)
  const chartDataCategory = chartDefault.map(tx => {
    const found = summary.find(s => s.kategori === tx.kategori)
    return {
      ...tx,
      total: found ? found.total : 0
    }
  })

  // history
  const transactions = getTransactionHistory(data as Transaction[], date, 'Income')

  // total
  const total = React.useMemo(
    () => filteredData.reduce((acc, curr) => acc + curr.pemasukan, 0),
    [filteredData]
  )

  return (
    <Card className="@container/card">
      <CardHeader className="flex flex-col items-center gap-2 space-y-0 border-b sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Pemasukan Anda</CardTitle>
          <CardDescription>
            Menampilkan total pemasukan periode {startTimeLabel}{' '}
            {endTimeLabel ? `- ${endTimeLabel}` : ''} ({days === 0 ? '1' : days} days)
          </CardDescription>
        </div>
        <div className={cn('grid gap-2')}>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={'outline'}
                className={cn(
                  'w-full max-w-xs justify-start truncate text-left font-normal',
                  !date && 'text-muted-foreground'
                )}
              >
                <CalendarIcon />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                    </>
                  ) : (
                    format(date.from, 'LLL dd, y')
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="flex w-auto flex-col space-y-2 p-2" align="end">
              <Select
                onValueChange={value =>
                  setDate({
                    from: subDays(new Date(), parseInt(value)),
                    to: new Date()
                  })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="0">Hari ini</SelectItem>
                  <SelectItem value="1">Kemarin</SelectItem>
                  <SelectItem value="7">7 hari terakhir</SelectItem>
                  <SelectItem value="30">1 bulan terakhir</SelectItem>
                </SelectContent>
              </Select>

              <div className="rounded-md border">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                  disabled={date => date > new Date()}
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </CardHeader>
      <CardHeader>
        <div className="grid sm:grid-cols-2 md:grid-cols-3">
          <button
            data-active={true}
            className="data-[active=true]:bg-muted/50 relative z-30 flex flex-1 flex-col justify-start gap-2 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
          >
            <span className="text-muted-foreground text-xs">Total</span>
            <span className="truncate text-lg leading-none font-bold sm:text-2xl">
              {formatRupiah(total)}
            </span>
          </button>
        </div>
      </CardHeader>
      <CardContent className="border-b px-2 pt-4 pb-6 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart
            accessibilityLayer
            data={filteredData}
            margin={{
              left: 20,
              right: 40
            }}
          >
            <defs>
              <linearGradient id="fillPemasukan" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-pemasukan)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-pemasukan)" stopOpacity={0.1} />
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
              dataKey="pemasukan"
              type="natural"
              fill="url(#fillPemasukan)"
              stroke="var(--color-pemasukan)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardContent className="space-y-6 border-b px-2 pt-4 pb-6 sm:px-6 sm:pt-6">
        <div className="flex w-full flex-col items-center justify-center gap-1 text-center">
          <div className="leading-none font-semibold">Pemasukan Bulanan</div>
          <div className="text-muted-foreground text-sm">
            Pemasukan berdasarkan sumber periode {startTimeLabel}{' '}
            {endTimeLabel ? `- ${endTimeLabel}` : ''} ({days === 0 ? '1' : days} days)
          </div>
        </div>
        <ChartContainer config={chartConfigCategory} className="max-h-[250px] w-full">
          <BarChart
            accessibilityLayer
            data={chartDataCategory}
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
              tickFormatter={value =>
                chartConfigCategory[value as keyof typeof chartConfigCategory]?.label
              }
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
      <CardContent className="space-y-6 px-2 pt-4 sm:px-6 sm:pt-6">
        <div className="flex w-full flex-col items-center justify-center gap-1 text-center">
          <div className="leading-none font-semibold">Riwayat Transaksi Pemasukan</div>
          <div className="text-muted-foreground text-sm">
            Menampilkan max 5 transaksi terbaru periode {startTimeLabel}{' '}
            {endTimeLabel ? `- ${endTimeLabel}` : ''} ({days === 0 ? '1' : days} days)
          </div>
        </div>

        <TransactionHistory transactions={transactions} />
      </CardContent>
    </Card>
  )
}
