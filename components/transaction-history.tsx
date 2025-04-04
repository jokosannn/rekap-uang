import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { ArrowDown, ArrowUp } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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
        <CardTitle>Riwayat Transaksi</CardTitle>
        <CardDescription>Transaksi terbaru Anda</CardDescription>
      </CardHeader>
      <CardContent>
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
                      variant={transaction.type === 'income' ? 'outline' : 'secondary'}
                      className={
                        transaction.type === 'income'
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-500 capitalize'
                          : 'capitalize'
                      }
                    >
                      {transaction.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="table-cell">{transaction.category}</TableCell>
                  <TableCell>
                    <div
                      className={`flex items-center gap-1 ${
                        transaction.type === 'income' ? 'text-emerald-500' : 'text-rose-500'
                      }`}
                    >
                      <span className="whitespace-nowrap">
                        Rp {transaction.amount.toLocaleString('id-ID')}
                      </span>
                      {transaction.type === 'income' ? (
                        <ArrowUp className="h-4 w-4" />
                      ) : (
                        <ArrowDown className="h-4 w-4" />
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
