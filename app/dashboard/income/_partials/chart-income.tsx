'use client'

import * as React from 'react'

import { differenceInDays, format, subDays } from 'date-fns'
import { id } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { DateRange } from 'react-day-picker'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts'

import { Badge } from '@/components/ui/badge'
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import data from '@/constants/transaction.json'
import { cn, formatNumber } from '@/lib/utils'
import { getMonthlyCategoryTransactions } from '@/services/transaction-service'
import { getTransactionHistory } from '@/services/transaction-service'
import { Transaction } from '@/types/transaction'

function filterIncomeTransactions(data: Transaction[]) {
  const transactionMap = data.reduce<Record<string, { date: string; pemasukan: number }>>((acc, tx) => {
    if (new Date(tx.date) <= new Date() && tx.type === 'Income') {
      const formattedDate = format(new Date(tx.date), 'yyyy-MM-dd')
      acc[formattedDate] = acc[formattedDate] || { date: formattedDate, pemasukan: 0 }
      acc[formattedDate].pemasukan += tx.amount
    }
    return acc
  }, {})

  return Object.values(transactionMap).sort((a, b) => a.date.localeCompare(b.date))
}

function formatDateRangeDiff(date: DateRange | undefined): number {
  if (!date?.from || !date?.to) return 0
  const diff = differenceInDays(date.to, date.from)
  return diff
}

const chartDefault = [
  { kategori: 'gaji', total: 0, fill: 'var(--color-gaji)' },
  { kategori: 'sampingan', total: 0, fill: 'var(--color-sampingan)' },
  { kategori: 'bonus', total: 0, fill: 'var(--color-bonus)' },
  { kategori: 'investasi', total: 0, fill: 'var(--color-investasi)' },
  { kategori: 'lainya', total: 0, fill: 'var(--color-lainya)' }
]

const chartConfig = {
  visitors: {
    label: 'Visitors'
  },
  pemasukan: {
    label: 'Pemasukan',
    color: 'hsl(var(--chart-1))'
  }
} satisfies ChartConfig

const chartConfigCategory = {
  total: {
    label: 'Total'
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
  sampingan: {
    label: 'Sampingan',
    color: 'hsl(var(--chart-4))'
  },
  lainya: {
    label: 'Lainya',
    color: 'hsl(var(--chart-5))'
  }
} satisfies ChartConfig

export function ChartIncome() {
  const firstDate = new Date([...data].sort((a, b) => a.date.localeCompare(b.date))[0].date)

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date()
  })

  const startTimeLabel = date?.from && format(new Date(date?.from), 'dd MMMM yyyy', { locale: id })
  const endTimeLabel = date?.to && format(new Date(date?.to), 'dd MMMM yyyy', { locale: id })
  const days = formatDateRangeDiff(date)

  // console.log(startTimeLabel, endTimeLabel)

  const [timeRange, setTimeRange] = React.useState<number>(30)

  const chartData = React.useMemo(() => filterIncomeTransactions(data as Transaction[]), [data])
  const filteredData = React.useMemo(() => {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - timeRange)
    return chartData.filter(item => new Date(item.date) >= startDate)
  }, [chartData, timeRange])

  React.useEffect(() => {
    const diff = formatDateRangeDiff(date)
    setTimeRange(diff)
  }, [date])

  const summary = getMonthlyCategoryTransactions(data as Transaction[], date)
  const chartDataCategory = chartDefault.map(tx => {
    const found = summary.find(s => s.kategori === tx.kategori)
    return {
      ...tx,
      total: found ? found.total : 0
    }
  })

  const transactions = getTransactionHistory(data as Transaction[], date, 'Income').slice(0, 5)

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
                  disabled={date => date > new Date() || date < new Date(firstDate)}
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </CardHeader>
      <CardContent className="border-b px-2 pt-4 pb-6 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart accessibilityLayer data={filteredData}>
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
            Menampilkan 5 transaksi terbaru periode {startTimeLabel}{' '}
            {endTimeLabel ? `- ${endTimeLabel}` : ''} ({days === 0 ? '1' : days} days)
          </div>
        </div>

        <div className="-mx-6 overflow-x-auto px-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Tanggal</TableHead>
                <TableHead className="table-cell">Tipe</TableHead>
                <TableHead className="table-cell">Kategori</TableHead>
                <TableHead className="table-cell">Jumlah</TableHead>
                <TableHead>Keterangan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map(transaction => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">
                    {format(new Date(transaction.date), 'dd MMMM yyyy', { locale: id })}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={transaction.type === 'Income' ? 'outline' : 'secondary'}
                      className={cn(
                        'rounded-full',
                        transaction.type === 'Income'
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-500 dark:border-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'border-rose-200 bg-rose-50 text-rose-500 dark:border-rose-700 dark:bg-rose-950 dark:text-rose-300'
                      )}
                    >
                      {transaction.type === 'Income' ? 'Pemasukan' : 'Pengeluaran'}
                    </Badge>
                  </TableCell>
                  <TableCell className="table-cell">{transaction.category}</TableCell>
                  <TableCell>
                    <div
                      className={`flex items-center gap-1 ${
                        transaction.type === 'Income' ? 'text-emerald-500' : 'text-rose-500'
                      }`}
                    >
                      <span className="whitespace-nowrap">
                        Rp {transaction.amount.toLocaleString('id-ID')}
                      </span>
                      {transaction.type === 'Income' ? (
                        <ArrowDown className="h-4 w-4" />
                      ) : (
                        <ArrowUp className="h-4 w-4" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
