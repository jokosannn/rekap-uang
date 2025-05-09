import {
  IconMoneybagMinus,
  IconMoneybagPlus,
  IconTrendingDown,
  IconTrendingUp
} from '@tabler/icons-react'
import { Wallet } from 'lucide-react'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { cn, formatRupiah } from '@/lib/utils'
import { Summary } from '@/types/summary'

type IProps = {
  data: Summary
}

export function SectionCards({ data }: IProps) {
  const percentageIncome = data.current.income.percentageChange
  const percentageExpnse = data.current.expense.percentageChange
  const isUpIncome = data.current.income.percentageChange >= 0
  const isUpExpense = data.current.expense.percentageChange >= 0

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @3xl/main:grid-cols-3">
      <Card className="gap-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
          <CardTitle className="text-sm font-medium">Total Saldo</CardTitle>
          <Wallet className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold sm:text-2xl">
            {formatRupiah(data.balance.currentBalance)}
          </div>
        </CardContent>
        <CardFooter className="mt-2 flex-col items-start text-sm">
          <p
            className={cn(
              'flex items-center gap-1 text-xs',
              data.balance.percentageChange >= 0 ? 'text-emerald-500' : 'text-rose-500'
            )}
          >
            {data.balance.percentageChange >= 0 ? (
              <IconTrendingUp className="h-3 w-3" />
            ) : (
              <IconTrendingDown className="h-3 w-3" />
            )}

            <span>{data.balance.percentageChange}% dari bulan lalu</span>
          </p>
          <div className="text-muted-foreground text-xs">
            Bulan lalu {formatRupiah(data.balance.prevBalance)}
          </div>
        </CardFooter>
      </Card>
      <Card className="gap-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
          <CardTitle className="text-sm font-medium">Pemasukan Bulan Ini</CardTitle>
          <IconMoneybagPlus className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold sm:text-2xl">{formatRupiah(data.current.income.value)}</div>
        </CardContent>
        <CardFooter className="mt-2 flex-col items-start text-sm">
          <p
            className={cn(
              'flex items-center gap-1 text-xs',
              !isUpIncome ? 'text-rose-500' : 'text-emerald-500'
            )}
          >
            {!isUpExpense ? (
              <IconTrendingUp className="h-3 w-3" />
            ) : (
              <IconTrendingDown className="h-3 w-3" />
            )}

            <span>{percentageIncome}% dari bulan lalu</span>
          </p>
          <div className="text-muted-foreground text-xs">
            Bulan lalu {formatRupiah(data.previous.income)}
          </div>
        </CardFooter>
      </Card>
      <Card className="gap-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
          <CardTitle className="text-sm font-medium">Pengeluaran Bulan Ini</CardTitle>
          <IconMoneybagMinus className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold sm:text-2xl">{formatRupiah(data.current.expense.value)}</div>
        </CardContent>
        <CardFooter className="mt-2 flex-col items-start text-sm">
          <p
            className={cn(
              'flex items-center gap-1 text-xs',
              isUpExpense ? 'text-rose-500' : 'text-emerald-500'
            )}
          >
            {isUpExpense ? (
              <IconTrendingUp className="h-3 w-3" />
            ) : (
              <IconTrendingDown className="h-3 w-3" />
            )}
            <span>{percentageExpnse}% dari bulan lalu</span>
          </p>
          <div className="text-muted-foreground text-xs">
            Bulan lalu {formatRupiah(data.previous.expense)}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
