import { format } from 'date-fns'
import { DateRange } from 'react-day-picker'

import { Transaction } from '@/types/transaction'

export function getMonthlyComparison(transactions: any[]) {
  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()

  const previousMonthDate = new Date(currentYear, currentMonth - 1)
  const previousMonth = previousMonthDate.getMonth()
  const previousYear = previousMonthDate.getFullYear()

  const summary = {
    current: { income: { value: 0, transactionCount: 0 }, expense: { value: 0, transactionCount: 0 } },
    previous: { income: 0, expense: 0 },
    percentageChange: {
      income: 0,
      expense: 0
    }
  }

  transactions.forEach(tx => {
    const txDate = new Date(tx.date)
    const month = txDate.getMonth()
    const year = txDate.getFullYear()
    const amount = tx.amount

    // Hitung bulan sebelumnya
    if (month === previousMonth && year === previousYear) {
      if (tx.type === 'Income') summary.previous.income += amount
      else if (tx.type === 'Expense') summary.previous.expense += amount
    }
  })

  const currentTransaction = filterCurrentMonthTransactions(transactions)
  currentTransaction.forEach(tx => {
    summary.current.income.transactionCount++
    summary.current.income.value += tx.income
    summary.current.expense.transactionCount++
    summary.current.expense.value += tx.expense
  })

  // Hitung persentase perubahan Income dan Expense
  const calcPercentage = (current: number, previous: number): number => {
    if (previous === 0) return current === 0 ? 0 : 100
    return ((current - previous) / previous) * 100
  }

  const floorTo2Decimal = (value: number) => Math.floor(value * 100) / 100

  summary.percentageChange.income = floorTo2Decimal(
    calcPercentage(summary.current.income.value, summary.previous.income)
  )

  summary.percentageChange.expense = floorTo2Decimal(
    calcPercentage(summary.current.expense.value, summary.previous.expense)
  )

  return summary
}

export function filterCurrentMonthTransactions(transactions: Transaction[]) {
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  const transactionMap: Record<string, { date: string; income: number; expense: number }> = {}

  transactions.forEach(tx => {
    const txDate = new Date(tx.date)
    if (txDate >= startOfMonth && txDate <= now) {
      const formattedDate = format(txDate, 'yyyy-MM-dd')

      if (!transactionMap[formattedDate]) {
        transactionMap[formattedDate] = {
          date: formattedDate,
          income: 0,
          expense: 0
        }
      }

      if (tx.type === 'Income') {
        transactionMap[formattedDate].income += tx.amount
      } else if (tx.type === 'Expense') {
        transactionMap[formattedDate].expense += tx.amount
      }
    }
  })

  return Object.values(transactionMap).sort((a, b) => a.date.localeCompare(b.date))
}

export function getMonthlyCategoryTransactions(
  transactions: Transaction[],
  date?: DateRange | undefined
) {
  const now = new Date()
  const startDate = date?.from ?? new Date(now.getFullYear(), now.getMonth(), 1)
  const endDate = date?.to ? date.to : undefined

  const transactionMap: Record<string, { kategori: string; total: number; fill: string }> = {}

  // console.log({ startDate, endDate })

  if (!endDate) {
    transactions.forEach(tx => {
      const txDateDay = new Date(tx.date).getDate()
      const txDateMounth = new Date(tx.date).getMonth()
      const txDateYear = new Date(tx.date).getFullYear()
      if (
        txDateMounth === startDate.getMonth() &&
        txDateDay === startDate.getDate() &&
        txDateYear === startDate.getFullYear()
      ) {
        // console.log({ mouth: startDate.getMonth(), txDateMounth, txDateDay, day: startDate.getDate() })
        // console.log({ total: tx.amount, cat: tx.category, date: tx.date, id: tx.id })
        if (tx.type === 'Income') {
          const formattedDate = tx.category

          if (!transactionMap[formattedDate]) {
            transactionMap[formattedDate] = {
              kategori: tx.category,
              total: 0,
              fill: `var(--color-${tx.category.toLowerCase()})`
            }
          }

          switch (tx.category) {
            case 'Gaji':
              transactionMap[formattedDate].kategori = 'gaji'
              transactionMap[formattedDate].total += tx.amount
              break
            case 'Sampingan':
              transactionMap[formattedDate].kategori = 'sampingan'
              transactionMap[formattedDate].total += tx.amount
              break
            case 'Bonus':
              transactionMap[formattedDate].kategori = 'bonus'
              transactionMap[formattedDate].total += tx.amount
              break
            case 'Investasi':
              transactionMap[formattedDate].kategori = 'investasi'
              transactionMap[formattedDate].total += tx.amount
              break
            case 'Lainya':
              transactionMap[formattedDate].kategori = 'lainya'
              transactionMap[formattedDate].total += tx.amount
              break
          }
        } else {
          const formattedDate = tx.category

          if (!transactionMap[formattedDate]) {
            transactionMap[formattedDate] = {
              kategori: tx.category,
              total: 0,
              fill: `var(--color-${tx.category.toLowerCase()})`
            }
          }

          switch (tx.category) {
            case 'Jajan':
              transactionMap[formattedDate].kategori = 'jajan'
              transactionMap[formattedDate].total += tx.amount
              break
            case 'Transportasi':
              transactionMap[formattedDate].kategori = 'transportasi'
              transactionMap[formattedDate].total += tx.amount
              break
            case 'Belanja':
              transactionMap[formattedDate].kategori = 'belanja'
              transactionMap[formattedDate].total += tx.amount
              break
            case 'Hiburan':
              transactionMap[formattedDate].kategori = 'hiburan'
              transactionMap[formattedDate].total += tx.amount
              break
            case 'Lainya':
              transactionMap[formattedDate].kategori = 'lainya'
              transactionMap[formattedDate].total += tx.amount
              break
          }
        }
      }
    })
  } else {
    transactions.forEach(tx => {
      const txDate = new Date(tx.date)
      if (txDate >= startDate! && txDate <= endDate) {
        if (tx.type === 'Income') {
          const formattedDate = tx.category

          if (!transactionMap[formattedDate]) {
            transactionMap[formattedDate] = {
              kategori: tx.category,
              total: 0,
              fill: `var(--color-${tx.category.toLowerCase()})`
            }
          }

          switch (tx.category) {
            case 'Gaji':
              transactionMap[formattedDate].kategori = 'gaji'
              transactionMap[formattedDate].total += tx.amount
              break
            case 'Sampingan':
              transactionMap[formattedDate].kategori = 'sampingan'
              transactionMap[formattedDate].total += tx.amount
              break
            case 'Bonus':
              transactionMap[formattedDate].kategori = 'bonus'
              transactionMap[formattedDate].total += tx.amount
              break
            case 'Investasi':
              transactionMap[formattedDate].kategori = 'investasi'
              transactionMap[formattedDate].total += tx.amount
              break
            case 'Lainya':
              transactionMap[formattedDate].kategori = 'lainya'
              transactionMap[formattedDate].total += tx.amount
              break
          }
        } else {
          const formattedDate = tx.category

          if (!transactionMap[formattedDate]) {
            transactionMap[formattedDate] = {
              kategori: tx.category,
              total: 0,
              fill: `var(--color-${tx.category.toLowerCase()})`
            }
          }

          switch (tx.category) {
            case 'Jajan':
              transactionMap[formattedDate].kategori = 'jajan'
              transactionMap[formattedDate].total += tx.amount
              break
            case 'Transportasi':
              transactionMap[formattedDate].kategori = 'transportasi'
              transactionMap[formattedDate].total += tx.amount
              break
            case 'Belanja':
              transactionMap[formattedDate].kategori = 'belanja'
              transactionMap[formattedDate].total += tx.amount
              break
            case 'Hiburan':
              transactionMap[formattedDate].kategori = 'hiburan'
              transactionMap[formattedDate].total += tx.amount
              break
            case 'Lainya':
              transactionMap[formattedDate].kategori = 'lainya'
              transactionMap[formattedDate].total += tx.amount
              break
          }
        }
      }
    })
  }

  return Object.values(transactionMap)
}
export function getTransactionHistory(
  transactions: Transaction[],
  date: DateRange | undefined,
  type: string | undefined
) {
  const now = new Date()
  const startOfMonth = date?.from ?? new Date(now.getFullYear(), now.getMonth(), 1)
  const endDate = date?.to ?? now

  return transactions.filter(tx => {
    const txDate = new Date(tx.date)

    const isInRange = txDate >= startOfMonth && txDate <= endDate
    const isTypeMatch = type ? tx.type === type : true

    return isInRange && isTypeMatch
  })
}
