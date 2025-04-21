export type Summary = {
  current: {
    income: {
      value: number
      transactionCount: number
      percentageChange: number
    }
    expense: {
      value: number
      transactionCount: number
      percentageChange: number
    }
  }
  previous: {
    income: number
    expense: number
    percentageChange: number
  }
  balance: {
    prevBalance: number
    currentBalance: number
    percentageChange: number
  }
}
