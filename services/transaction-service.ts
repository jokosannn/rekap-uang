import { differenceInDays, format } from 'date-fns'
import { DateRange } from 'react-day-picker'

import { prisma } from '@/lib/prisma/init'
import { Transaction } from '@/types/transaction'

interface ResponseResult {
  status: boolean
  message: string
  data?: any
}

// persentase
const calcPercentage = (current: number, previous: number): number => {
  if (previous === 0) return current === 0 ? 0 : 100
  return ((current - previous) / previous) * 100
}

// ubah desimal
const floorTo2Decimal = (value: number) => Math.floor(value * 100) / 100

// cek perbandingan bulan ini dengan bulan sebelumnya
export function checkDateMountComparison() {
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1) // awal bulan ini

  const currentMonth = now.getMonth() // bulan ini (0 -> januari dst...)
  const currentYear = now.getFullYear() // tahun ini
  const previousMonth = new Date(currentYear, currentMonth - 1).getMonth() // bulan lalu
  const previousYear = new Date(currentYear, currentMonth - 1).getFullYear() // tahun lalu

  return {
    current: {
      star: startOfMonth,
      now
    },
    previous: {
      mount: previousMonth,
      year: previousYear
    }
  }
}

// function saldo
export function getMonthlyComparisonBalance(transactions: Transaction[]) {
  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()

  const prevDate = new Date(currentYear, currentMonth, 0) // Akhir bulan sebelumnya
  const startCurrentMonth = new Date(currentYear, currentMonth, 1) // Awal bulan ini

  let numberPrev = 0
  let numberCurrent = 0
  let percentageChange = 0

  transactions.forEach(tx => {
    const txDate = new Date(tx.date)
    const isIncome = tx.type === 'Income'
    const amount = tx.amount

    if (txDate <= prevDate) {
      numberPrev += isIncome ? amount : -amount
    } else if (txDate >= startCurrentMonth && txDate <= now) {
      numberCurrent += isIncome ? amount : -amount
    }
  })

  const currentBalance = numberCurrent + numberPrev
  percentageChange = floorTo2Decimal(calcPercentage(currentBalance, numberPrev))

  return {
    prevBalance: numberPrev,
    currentBalance,
    percentageChange
  }
}

// function perbandingan income, expense dan saldo
export function getMonthlyComparison(transaction: Transaction[]) {
  const { current, previous } = checkDateMountComparison()
  const saldo = getMonthlyComparisonBalance(transaction)

  const summary = {
    current: {
      income: {
        value: 0,
        transactionCount: 0,
        percentageChange: 0
      },
      expense: {
        value: 0,
        transactionCount: 0,
        percentageChange: 0
      }
    },
    previous: { income: 0, expense: 0, percentageChange: 0 },
    balance: saldo
  }

  transaction.forEach(tx => {
    const dateTransaction = new Date(tx.date)
    const monthTransaction = dateTransaction.getMonth()
    const yearTransaction = dateTransaction.getFullYear()
    const amount = tx.amount
    const isIncome = tx.type === 'Income'
    const isExpense = tx.type === 'Expense'

    // Hitung bulan sebelumnya
    if (monthTransaction === previous.mount && yearTransaction === previous.year) {
      if (isIncome) summary.previous.income += amount
      else if (isExpense) summary.previous.expense += amount
    }

    // Hitung bulan ini saja
    if (dateTransaction >= current.star && dateTransaction <= current.now) {
      if (isIncome) {
        summary.current.income.value += amount
        summary.current.income.transactionCount++
      } else if (isExpense) {
        summary.current.expense.value += amount
        summary.current.expense.transactionCount++
      }
    }
  })

  summary.current.income.percentageChange = floorTo2Decimal(
    calcPercentage(summary.current.income.value, summary.previous.income)
  )
  summary.current.expense.percentageChange = floorTo2Decimal(
    calcPercentage(summary.current.expense.value, summary.previous.expense)
  )

  return summary
}

// filter semua transaksi income dan expense
export function filterTransactions(data: Transaction[], type: string) {
  const transactionMapIncome = data.reduce<Record<string, { date: string; pemasukan: number }>>(
    (acc, tx) => {
      if (new Date(tx.date) <= new Date() && tx.type === 'Income') {
        const formattedDate = format(new Date(tx.date), 'yyyy-MM-dd')
        acc[formattedDate] = acc[formattedDate] || { date: formattedDate, pemasukan: 0 }
        acc[formattedDate].pemasukan += tx.amount
      }
      return acc
    },
    {}
  )

  const transactionMapExpense = data.reduce<Record<string, { date: string; pengeluaran: number }>>(
    (acc, tx) => {
      if (new Date(tx.date) <= new Date() && tx.type === 'Expense') {
        const formattedDate = format(new Date(tx.date), 'yyyy-MM-dd')
        acc[formattedDate] = acc[formattedDate] || { date: formattedDate, pengeluaran: 0 }
        acc[formattedDate].pengeluaran += tx.amount
      }
      return acc
    },
    {}
  )

  return Object.values(type === 'Income' ? transactionMapIncome : transactionMapExpense).sort((a, b) =>
    a.date.localeCompare(b.date)
  )
}

// format range date
export function formatDateRangeDiff(date: DateRange | undefined): number {
  if (!date?.from || !date?.to) return 0
  return differenceInDays(date.to, date.from)
}

// filter income dan expense bulan sekarang
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

// filter kategori income dan expense berdasarkan date
export function getMonthlyCategoryTransactions(
  transactions: Transaction[],
  type: string,
  date?: DateRange | undefined
) {
  const now = new Date()
  const startDate = date?.from ?? new Date(now.getFullYear(), now.getMonth(), 1)
  const endDate = date?.to ?? (date ? startDate : now)

  const incomeCategories = {
    Gaji: 'gaji',
    Sampingan: 'sampingan',
    Bonus: 'bonus',
    Investasi: 'investasi',
    Lainnya: 'lainnya'
  }

  const expenseCategories = {
    Jajan: 'jajan',
    Transportasi: 'transportasi',
    Belanja: 'belanja',
    Hiburan: 'hiburan',
    Lainnya: 'lainnya'
  }

  const transactionMap: Record<string, { kategori: string; total: number; fill: string }> = {}

  transactions.forEach(tx => {
    if (type === tx.type) {
      const txDate = new Date(tx.date)
      const isSameDay =
        !date?.to &&
        date &&
        txDate.getFullYear() === startDate.getFullYear() &&
        txDate.getMonth() === startDate.getMonth() &&
        txDate.getDate() === startDate.getDate()

      const isInRange = txDate >= startDate && txDate <= endDate

      if ((date && !date.to && isSameDay) || (startDate && endDate && isInRange)) {
        const categoryMap = type === 'Income' ? incomeCategories : expenseCategories
        const mappedCategory = categoryMap[tx.category as keyof typeof categoryMap]

        if (!mappedCategory) return

        if (!transactionMap[tx.category]) {
          transactionMap[tx.category] = {
            kategori: mappedCategory,
            total: 0,
            fill: `var(--color-${tx.category.toLowerCase()})`
          }
        }

        transactionMap[tx.category].total += tx.amount
      }
    }
  })

  return Object.values(transactionMap)
}

// function transaksi histori
export function getTransactionHistory(
  transactions: Transaction[],
  date?: DateRange | undefined,
  type?: string | undefined
) {
  const now = new Date()
  const startOfMonth = date?.from ?? new Date(now.getFullYear(), now.getMonth(), 1)
  // const endDate = date?.to ?? now
  const endDate = date?.to ?? (date ? startOfMonth : now)

  return transactions
    .filter(tx => {
      const txDate = new Date(tx.date)

      const isInRange = txDate >= startOfMonth && txDate <= endDate
      const isTypeMatch = type ? tx.type === type : true

      const isSameDay =
        !date?.to &&
        date &&
        txDate.getFullYear() === startOfMonth.getFullYear() &&
        txDate.getMonth() === startOfMonth.getMonth() &&
        txDate.getDate() === startOfMonth.getDate()

      return (isInRange && isTypeMatch) || (date && !date.to && isSameDay && isTypeMatch)
    })
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-5)
}

// function filter default transaksi berdasarkan date
export function getDefaultTransactionByDate(transactions: Transaction[], date: DateRange | undefined) {
  const now = new Date()
  const startDate = date?.from ?? new Date(now.getFullYear(), now.getMonth(), 1)
  const endDate = date?.to ?? (date ? startDate : now)

  return transactions.filter(tx => {
    const txDate = new Date(tx.date)
    const isSameDay =
      !date?.to &&
      date &&
      txDate.getFullYear() === startDate.getFullYear() &&
      txDate.getMonth() === startDate.getMonth() &&
      txDate.getDate() === startDate.getDate()

    const isInRange = txDate >= startDate && txDate <= endDate
    return (date && !date.to && isSameDay) || (startDate && endDate && isInRange)
  })
}

export async function getAllTransaction() {
  try {
    const response = await prisma.transaction.findMany()
    return {
      status: true,
      message: 'Transaksi berhasil diambil',
      data: response
    }
  } catch (error) {
    return {
      status: false,
      message: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

export async function createNewTransaction(data: any): Promise<ResponseResult> {
  try {
    const newTransaction = await prisma.transaction.create({
      data: {
        ...data,
        userId: data.userId
      }
    })

    return {
      status: true,
      message: 'Transaksi berhasil dibuat',
      data: newTransaction
    }
  } catch (error) {
    return {
      status: false,
      message: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

export async function updateTransaction(data: any): Promise<ResponseResult> {
  try {
    const newTransaction = await prisma.transaction.update({
      where: { id: data.id },
      data: {
        ...data
      }
    })

    return {
      status: true,
      message: 'Transaksi berhasil diupdate',
      data: newTransaction
    }
  } catch (error) {
    return {
      status: false,
      message: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

export async function deleteTransaction(ids: string[]): Promise<ResponseResult> {
  try {
    await prisma.transaction.deleteMany({
      where: {
        id: {
          in: ids
        }
      }
    })

    return {
      status: true,
      message: 'Transaksi berhasil dihapus'
    }
  } catch (error) {
    return {
      status: false,
      message: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

export async function fetchTransactions() {
  const res = await fetch('/api/transaction')
  const json = await res.json()
  return json.data
}
