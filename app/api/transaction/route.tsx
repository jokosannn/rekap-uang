import { NextRequest, NextResponse } from 'next/server'

import {
  createNewTransaction,
  deleteTransaction,
  getAllTransaction,
  updateTransaction
} from '@/services/transaction-service'

export async function GET() {
  const response = await getAllTransaction()
  return NextResponse.json({ status: response.status, message: response.message, data: response.data })
}

export async function POST(request: NextRequest) {
  const req = await request.json()
  const res = await createNewTransaction(req)
  return NextResponse.json({ status: res.status, message: res.message, data: res.data })
}

export async function PUT(request: NextRequest) {
  const req = await request.json()
  const res = await updateTransaction(req)
  return NextResponse.json({ status: res.status, message: res.message, data: res.data })
}

export async function DELETE(request: NextRequest) {
  const req = await request.json()
  const { ids } = req

  if (!Array.isArray(ids)) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const res = await deleteTransaction(ids)
  return NextResponse.json({ status: res.status, message: res.message, data: res.data })
}
