'use client'

import { IconDotsVertical } from '@tabler/icons-react'
import { ColumnDef } from '@tanstack/react-table'
import { z } from 'zod'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { cn, formatRupiah } from '@/lib/utils'

import { schema } from './data-table'
import TableCellViewer from './table-cell-viewer'

export const columns: ColumnDef<z.infer<typeof schema>>[] = [
  // {
  //   id: 'drag',
  //   header: () => null,
  //   cell: ({ row }) => <DragHandle id={row.original.id} />
  // },
  // {
  //   id: 'select',
  //   header: ({ table }) => (
  //     <div className="flex items-center justify-center">
  //       <Checkbox
  //         checked={
  //           table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
  //         }
  //         onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
  //         aria-label="Select all"
  //       />
  //     </div>
  //   ),
  //   cell: ({ row }) => (
  //     <div className="flex items-center justify-center">
  //       <Checkbox
  //         checked={row.getIsSelected()}
  //         onCheckedChange={value => row.toggleSelected(!!value)}
  //         aria-label="Select row"
  //       />
  //     </div>
  //   ),
  //   enableSorting: false,
  //   enableHiding: false
  // },
  {
    accessorKey: 'index',
    header: () => {
      return <Button variant="ghost">No</Button>
    },
    cell: ({ row }) => <div className="ml-4 capitalize">{row.index + 1}</div>,
    accessorFn: (_, rowIndex) => rowIndex + 1 // Hitung indeks secara otomatis
  },
  {
    accessorKey: 'date',
    header: 'Tanggal',
    cell: ({ row }) => {
      return <TableCellViewer item={row.original} />
      // return (
      //   <div className="w-32">{format(new Date(row.original.date), 'dd MMMM yyyy', { locale: id })}</div>
      // )
    },

    enableHiding: false
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => (
      <div className="">
        <Badge
          variant={row.original.type === 'Income' ? 'default' : 'destructive'}
          className={cn('px-1.5', { 'bg-green-500': row.original.type === 'Income' })}
        >
          {row.original.type}
        </Badge>
      </div>
    )
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground">
        {row.original.category}
      </Badge>
    )
  },
  {
    accessorKey: 'paymentMethod',
    header: 'Metode'
  },
  {
    accessorKey: 'amount',
    header: 'Nominal',
    cell: ({ row }) => <span>{formatRupiah(Number(row.original.amount))}</span>
  },
  {
    accessorKey: 'description',
    header: 'Keterangan'
  },
  {
    id: 'actions',
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
            size="icon"
          >
            <IconDotsVertical />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Make a copy</DropdownMenuItem>
          <DropdownMenuItem>Favorite</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
]
