export type Transaction = {
  id: number
  date: string
  type: 'Income' | 'Expense'
  category: string
  paymentMethod: string
  amount: number
  description: string
}
