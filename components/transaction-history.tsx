import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { ArrowDown, ArrowUp, MoreHorizontal, Search } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const transactions = [
  {
    id: '1',
    date: '2023-04-01',
    description: 'Gaji Bulanan',
    category: 'Pemasukan',
    amount: 6500000,
    type: 'income'
  },
  {
    id: '2',
    date: '2023-04-02',
    description: 'Belanja Bulanan',
    category: 'Makanan',
    amount: 850000,
    type: 'expense'
  },
  {
    id: '3',
    date: '2023-04-05',
    description: 'Bayar Listrik',
    category: 'Tagihan',
    amount: 450000,
    type: 'expense'
  },
  {
    id: '4',
    date: '2023-04-10',
    description: 'Proyek Freelance',
    category: 'Pemasukan',
    amount: 1200000,
    type: 'income'
  },
  {
    id: '5',
    date: '2023-04-15',
    description: 'Makan di Restoran',
    category: 'Makanan',
    amount: 250000,
    type: 'expense'
  }
]

export function TransactionHistory() {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Riwayat Transaksi</CardTitle>
            <CardDescription>Transaksi terbaru Anda</CardDescription>
          </div>
          {/* <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-auto">
              <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
              <Input
                type="search"
                placeholder="Cari transaksi..."
                className="bg-background w-full appearance-none pl-8 shadow-none sm:w-[200px]"
              />
            </div>
          </div> */}
        </div>
      </CardHeader>
      <CardContent>
        <div className="-mx-6 overflow-x-auto px-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Tanggal</TableHead>
                <TableHead>Deskripsi</TableHead>
                <TableHead className="hidden sm:table-cell">Kategori</TableHead>
                <TableHead className="text-right">Jumlah</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map(transaction => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">
                    {format(new Date(transaction.date), 'dd MMMM yyyy', { locale: id })}
                  </TableCell>
                  <TableCell>
                    {transaction.description}
                    <div className="mt-1 sm:hidden">
                      <Badge
                        variant={transaction.type === 'income' ? 'outline' : 'secondary'}
                        className={
                          transaction.type === 'income'
                            ? 'border-emerald-200 bg-emerald-50 text-emerald-500'
                            : ''
                        }
                      >
                        {transaction.category}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge
                      variant={transaction.type === 'income' ? 'outline' : 'secondary'}
                      className={
                        transaction.type === 'income'
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-500'
                          : ''
                      }
                    >
                      {transaction.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div
                      className={`flex items-center justify-end gap-1 ${
                        transaction.type === 'income' ? 'text-emerald-500' : 'text-rose-500'
                      }`}
                    >
                      {transaction.type === 'income' ? (
                        <ArrowUp className="h-4 w-4" />
                      ) : (
                        <ArrowDown className="h-4 w-4" />
                      )}
                      <span className="whitespace-nowrap">
                        Rp {transaction.amount.toLocaleString('id-ID')}
                      </span>
                    </div>
                  </TableCell>
                  {/* <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Hapus</DropdownMenuItem>
                        <DropdownMenuItem>Lihat Detail</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
