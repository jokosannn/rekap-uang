import React from 'react'

export default function LoadingSpinner() {
  return (
    <div className="p-6">
      <div className="dots-container">
        <div className="dot bg-chart-1"></div>
        <div className="dot bg-chart-1"></div>
        <div className="dot bg-chart-1"></div>
      </div>
    </div>
  )
}
