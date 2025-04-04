import { IconMoneybagMinus, IconMoneybagPlus } from '@tabler/icons-react'
import { ArrowUp, Wallet } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatRupiah } from '@/lib/utils'

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @3xl/main:grid-cols-3">
      <Card className="gap-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Saldo</CardTitle>
          <Wallet className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold sm:text-2xl">{formatRupiah(753500000)}</div>
          <p className="flex items-center gap-1 text-xs text-emerald-500">
            <ArrowUp className="h-3 w-3" />
            <span>12.5% dari bulan lalu</span>
          </p>
        </CardContent>
      </Card>
      <Card className="gap-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pemasukan Bulan Ini</CardTitle>
          <IconMoneybagPlus className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold sm:text-2xl">{formatRupiah(1350000)}</div>
          <p className="flex items-center gap-1 text-xs text-emerald-500">
            <ArrowUp className="h-3 w-3" />
            <span>12.5% dari bulan lalu</span>
          </p>
        </CardContent>
      </Card>
      <Card className="gap-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pengeluaran Bulan Ini</CardTitle>
          <IconMoneybagMinus className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold sm:text-2xl">{formatRupiah(550000)}</div>
          <p className="flex items-center gap-1 text-xs text-rose-500">
            <ArrowUp className="h-3 w-3" />
            <span>8.1% dari bulan lalu</span>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
