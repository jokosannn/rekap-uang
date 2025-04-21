import { IconError404Off } from '@tabler/icons-react'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { ArrowDown, ArrowUp } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import data from '@/constants/transaction.json'
import { cn } from '@/lib/utils'
import { getTransactionHistory } from '@/services/transaction-service'
import { Transaction } from '@/types/transaction'

import { Button } from './ui/button'

type IProps = {
  transactions: Transaction[]
}

export function TransactionHistory({ transactions }: IProps) {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="flex w-full justify-center">
        <Button variant="ghost" disabled>
          <IconError404Off />
          Data tidak ada
        </Button>
      </div>
    )
  }

  return (
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
  )
}
