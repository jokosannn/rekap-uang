'use client'

import * as React from 'react'

import { Table } from '@tanstack/react-table'
import { addDays, format } from 'date-fns'
import { CalendarIcon, Download, X } from 'lucide-react'
import { DateRange } from 'react-day-picker'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'

import { DataTableFacetedFilter } from './data-table-faceted-filter'
import { DataTableViewOptions } from './data-table-view-options'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2025, 0, 1),
    to: addDays(new Date(2025, 1, 1), 27)
  })
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

  return (
    <div className="flex flex-col items-start justify-between gap-4 md:flex-row">
      <div className="flex w-full flex-1 flex-col items-start justify-start gap-4">
        <div className="flex w-full shrink-0 gap-2">
          <Input
            placeholder="Filter tasks..."
            value={(table.getColumn('description')?.getFilterValue() as string) ?? ''}
            onChange={event => table.getColumn('description')?.setFilterValue(event.target.value)}
            className="max-w-md"
          />
          <DataTableViewOptions table={table} />
        </div>
        <div className="flex flex-wrap gap-2">
          {table.getColumn('type') && (
            <DataTableFacetedFilter column={table.getColumn('type')} title="Type" options={types} />
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
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <X />
            </Button>
          )}
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
            <PopoverContent className="flex w-auto flex-col space-y-2 p-2" align="start">
              <Select
                onValueChange={value =>
                  setDate({
                    from: new Date(),
                    to: addDays(new Date(), parseInt(value))
                  })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="0">Today</SelectItem>
                  <SelectItem value="1">Tomorrow</SelectItem>
                  <SelectItem value="3">In 3 days</SelectItem>
                  <SelectItem value="7">In a week</SelectItem>
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
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <Button>
          <Download />
        </Button>
      </div>
      {/* <DataTableViewOptions table={table} /> */}
    </div>
  )
}
