import {
  IconCoin,
  IconMinus,
  IconMoneybagMinus,
  IconMoneybagPlus,
  IconPlus,
  IconTrendingDown,
  IconTrendingUp,
  IconWallet
} from '@tabler/icons-react'
import { ArrowDown, ArrowUp, DollarSign, Wallet } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { formatRupiah } from '@/lib/utils'

export function SectionCards() {
  return (
    // <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
    //   <Card className="@container/card">
    //     <CardHeader>
    //       <CardDescription>Total Saldo</CardDescription>
    //       <CardTitle className="truncate text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
    //         {formatRupiah(75350000)}
    //       </CardTitle>
    //       <div className="text-muted-foreground line-clamp-1 flex gap-2 text-sm">
    //         <span className="text-destructive">-20,1%</span> dari bulan lalu{' '}
    //         <IconTrendingDown className="size-4" />
    //       </div>
    //       <CardAction>
    //         <IconCoin strokeWidth={1.5} />
    //       </CardAction>
    //     </CardHeader>
    //   </Card>
    //   {/* <Card className="@container/card">
    //     <CardHeader>
    //       <CardDescription>Tabungan</CardDescription>
    //       <CardTitle className="truncate text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
    //         {formatRupiah(4350000)}
    //       </CardTitle>
    //       <div className="text-muted-foreground line-clamp-1 flex gap-2 text-sm">
    //         <span className="text-green-600">+20,1%</span> dari bulan lalu{' '}
    //         <IconTrendingUp className="size-4" />
    //       </div>
    //       <CardAction>
    //         <IconWallet strokeWidth={1.5} />
    //       </CardAction>
    //     </CardHeader>
    //   </Card> */}
    //   <Card className="@container/card">
    //     <CardHeader>
    //       <CardDescription>Pemasukan</CardDescription>
    //       <CardTitle className="truncate text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
    //         {formatRupiah(3500000)}
    //       </CardTitle>
    //       <div className="text-muted-foreground line-clamp-1 flex gap-2 text-sm">
    //         <span className="text-green-600">+20,1%</span> dari bulan lalu
    //         <IconTrendingUp className="size-4" />
    //       </div>
    //       <CardAction>
    //         <IconMoneybagPlus strokeWidth={1.5} />
    //       </CardAction>
    //     </CardHeader>
    //   </Card>
    //   <Card className="@container/card">
    //     <CardHeader>
    //       <CardDescription>Pengeluaran</CardDescription>
    //       <CardTitle className="truncate text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
    //         {formatRupiah(750000)}
    //       </CardTitle>
    //       <div className="text-muted-foreground line-clamp-1 flex gap-2 text-sm">
    //         <span className="text-destructive">-20,1%</span> dari bulan lalu{' '}
    //         <IconTrendingDown className="size-4" />
    //       </div>
    //       <CardAction>
    //         <IconMoneybagMinus strokeWidth={1.5} />
    //       </CardAction>
    //     </CardHeader>
    //   </Card>
    // </div>
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @3xl/main:grid-cols-3">
      <Card className="gap-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Saldo</CardTitle>
          <Wallet className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold sm:text-2xl">{formatRupiah(753500000)}</div>
          <p className="text-muted-foreground text-xs">Semua rekening dan kas</p>
        </CardContent>
      </Card>
      <Card className="gap-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pemasukan Bulan Ini</CardTitle>
          {/* <ArrowUp className="h-4 w-4 text-emerald-500" /> */}
          <IconMoneybagPlus className="h-4 w-4 text-emerald-500" />
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
          {/* <ArrowDown className="h-4 w-4 text-rose-500" /> */}
          <IconMoneybagMinus className="h-4 w-4 text-rose-500" />
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
