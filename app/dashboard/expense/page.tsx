import * as React from 'react'

import HeaderContent from '@/components/header-content'

import { ChartExpense } from './chart-expense'

export default function ExpensePage() {
  return (
    <div className="@container/main relative flex flex-1 flex-col gap-2">
      <HeaderContent />
      <div className="static z-10 mt-20 space-y-4 px-4 py-4 md:py-6 lg:px-6">
        <ChartExpense />
      </div>
    </div>
  )
}
