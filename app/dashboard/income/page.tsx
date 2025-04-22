import * as React from 'react'

import HeaderContent from '@/components/header-content'

import { ChartIncome } from './chart-income'

export default function IncomePage() {
  return (
    <div className="@container/main relative flex flex-1 flex-col gap-2">
      <HeaderContent />
      <div className="static z-10 mt-20 space-y-4 px-4 py-4 md:py-6 lg:px-6">
        <ChartIncome />
      </div>
    </div>
  )
}
