'use client'

import { Table } from '@tanstack/react-table'
import { X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { DataTableFacetedFilter } from './data-table-faceted-filter'
import { DataTableViewOptions } from './data-table-view-options'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
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
    <div className="flex items-start justify-between gap-4">
      <div className="flex flex-1 flex-col items-start justify-start gap-2 lg:flex-row">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn('description')?.getFilterValue() as string) ?? ''}
          onChange={event => table.getColumn('description')?.setFilterValue(event.target.value)}
          className="h-8 max-w-sm"
        />
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
      <DataTableViewOptions table={table} />
    </div>
  )
}
