'use client'

import * as React from 'react'

import { IconFilter } from '@tabler/icons-react'
import { Table } from '@tanstack/react-table'
import { format, subDays } from 'date-fns'
import { CalendarIcon, X } from 'lucide-react'
import { DateRange } from 'react-day-picker'

import { TransactionForm } from '@/components/transaction-form'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'

import { DataTableFacetedFilter } from './data-table-faceted-filter'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isMobile = useIsMobile()

  const [date, setDate] = React.useState<DateRange | undefined>(undefined)
  const isFiltered = table.getState().columnFilters.length > 0

  const payments = [...new Set(table.options.data.map((v: any) => v.paymentMethod))].map(item => ({
    label: item,
    value: item
  }))

  const types = [...new Set(table.options.data.map((v: any) => v.type))].map(item => ({
    label: item,
    value: item
  }))

  const category = [...new Set(table.options.data.map((v: any) => v.category))].map(item => ({
    label: item,
    value: item
  }))

  React.useEffect(() => {
    if (date?.from && date?.to) {
      table.getColumn('date')?.setFilterValue({
        from: date.from,
        to: date.to
      })
    } else if (date?.from && !date.to) {
      table.getColumn('date')?.setFilterValue({
        from: date.from,
        to: date.from
      })
    } else {
      table.getColumn('date')?.setFilterValue(undefined)
    }
  }, [date])

  return (
    <div className="flex flex-col items-start justify-between gap-4 lg:flex-row">
      <div className="flex w-full flex-1 flex-col items-start justify-start gap-4">
        <div className="flex w-full shrink-0 gap-2">
          <Input
            placeholder="Cari Transaksi"
            value={(table.getColumn('description')?.getFilterValue() as string) ?? ''}
            onChange={event => table.getColumn('description')?.setFilterValue(event.target.value)}
            className="max-w-xl"
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button className="justify-start">
                <span className="hidden md:block">Filters</span>
                <IconFilter />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-fit" align="end">
              <div className="grid gap-2">
                {table.getColumn('type') && (
                  <DataTableFacetedFilter
                    column={table.getColumn('type')}
                    title="Type"
                    options={types}
                  />
                )}
                {table.getColumn('category') && (
                  <DataTableFacetedFilter
                    column={table.getColumn('category')}
                    title="Kategori"
                    options={category}
                  />
                )}
                {table.getColumn('paymentMethod') && (
                  <DataTableFacetedFilter
                    column={table.getColumn('paymentMethod')}
                    title="Pembayaran"
                    options={payments}
                  />
                )}
                {isFiltered && (
                  <Button
                    variant="destructive"
                    onClick={() => table.resetColumnFilters()}
                    className="h-8 px-2 lg:px-3"
                  >
                    Reset
                    <X />
                  </Button>
                )}
              </div>
            </PopoverContent>
          </Popover>
          {/* <DataTableViewOptions table={table} /> */}
        </div>
      </div>
      <div className="flex items-center gap-2">
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
            <PopoverContent
              className="flex w-auto flex-col space-y-2 p-2"
              align={isMobile ? 'start' : 'end'}
            >
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
        <TransactionForm />
      </div>
    </div>
  )
}
