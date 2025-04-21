'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ArrowDown, ArrowUp } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { cn, formatRupiah } from '@/lib/utils'

import { DataTableColumnHeader } from './data-table-column-header'
import { Transaction } from './schema'
import TableCellViewer from './table-cell-viewer'

export const columns: ColumnDef<Transaction>[] = [
  // {
  //   id: 'select',
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
  //       }
  //       onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={value => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="mr-4 translate-y-[2px]"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false
  // },
  {
    accessorKey: 'date',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tanggal" />,
    cell: ({ row }) => {
      return <TableCellViewer item={row.original} />
    }
  },
  {
    accessorKey: 'type',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tipe" />,
    cell: ({ row }) => {
      const isIncome = row.original.type === 'Income'

      return (
        <Badge
          variant={isIncome ? 'outline' : 'secondary'}
          className={cn(
            'rounded-full',
            isIncome
              ? 'border-emerald-200 bg-emerald-50 text-emerald-500 dark:border-emerald-700 dark:bg-emerald-950 dark:text-emerald-400'
              : 'border-rose-200 bg-rose-50 text-rose-500 dark:border-rose-700 dark:bg-rose-950 dark:text-rose-400'
          )}
        >
          {isIncome ? 'Pemasukan' : 'Pengeluaran'}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableSorting: false
  },
  {
    accessorKey: 'category',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Kategori" />,
    cell: ({ row }) => <span>{row.original.category}</span>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableSorting: false
  },
  {
    accessorKey: 'paymentMethod',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Pembayaran" />,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableSorting: false
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nominal" />,
    cell: ({ row }) => {
      return (
        <div
          className={`flex items-center gap-1 ${
            row.original.type === 'Income' ? 'text-emerald-500' : 'text-rose-500'
          }`}
        >
          <span className="whitespace-nowrap">{formatRupiah(Number(row.original.amount))}</span>
          {row.original.type === 'Income' ? (
            <ArrowUp className="size-4" />
          ) : (
            <ArrowDown className="size-4" />
          )}
        </div>
      )
    }
  },
  {
    accessorKey: 'description',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Keterangan" />,
    enableSorting: false
  }
  // {
  //   id: 'actions',
  //   cell: ({ row }) => <DataTableRowActions row={row} />
  // }
]
