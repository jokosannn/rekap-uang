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

import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Saldo</CardDescription>
          <CardTitle className="truncate text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            Rp 70.250.000
          </CardTitle>
          <div className="text-muted-foreground line-clamp-1 flex gap-2 text-sm">
            <span className="text-destructive">-20,1%</span> dari bulan lalu{' '}
            <IconTrendingDown className="size-4" />
          </div>
          <CardAction>
            <IconCoin strokeWidth={1.5} />
          </CardAction>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Tabungan</CardDescription>
          <CardTitle className="truncate text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            Rp 7.250.000
          </CardTitle>
          <div className="text-muted-foreground line-clamp-1 flex gap-2 text-sm">
            <span className="text-green-600">+20,1%</span> dari bulan lalu{' '}
            <IconTrendingUp className="size-4" />
          </div>
          <CardAction>
            <IconWallet strokeWidth={1.5} />
          </CardAction>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Pemasukan</CardDescription>
          <CardTitle className="truncate text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            Rp 2.000.000
          </CardTitle>
          <div className="text-muted-foreground line-clamp-1 flex gap-2 text-sm">
            <span className="text-green-600">+20,1%</span> dari bulan lalu
            <IconTrendingUp className="size-4" />
          </div>
          <CardAction>
            <IconMoneybagPlus strokeWidth={1.5} />
          </CardAction>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Pengeluaran</CardDescription>
          <CardTitle className="truncate text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            Rp 800.000
          </CardTitle>
          <div className="text-muted-foreground line-clamp-1 flex gap-2 text-sm">
            <span className="text-destructive">-20,1%</span> dari bulan lalu{' '}
            <IconTrendingDown className="size-4" />
          </div>
          <CardAction>
            <IconMoneybagMinus strokeWidth={1.5} />
          </CardAction>
        </CardHeader>
      </Card>
    </div>
  )
}
