'use client'

import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { cn, formatRupiah } from '@/lib/utils'

import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { Transaction } from './schema'
import TableCellViewer from './table-cell-viewer'

export const columns: ColumnDef<Transaction>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="mr-4 translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'date',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tanggal" />,
    // cell: ({ row }) => {
    //   return (
    //     <span className="truncate font-medium">
    //       {format(new Date(row.original.date), 'dd MMMM yyyy', { locale: id })}
    //     </span>
    //   )
    // },
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
        <div>
          <Badge
            variant={isIncome ? 'default' : 'destructive'}
            className={cn('px-1.5', { 'bg-green-500': isIncome })}
          >
            {row.original.type}
          </Badge>
        </div>
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
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground">
        {row.original.category}
      </Badge>
    ),
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
    cell: ({ row }) => <span>{formatRupiah(Number(row.original.amount))}</span>
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
