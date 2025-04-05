export type Summary = {
  current: {
    income: { value: number; transactionCount: number }
    expense: { value: number; transactionCount: number }
  }
  previous: { income: number; expense: number }
  percentageChange: {
    income: number
    expense: number
  }
}
