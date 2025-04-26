import { NextRequest, NextResponse } from 'next/server'

import { updateUser } from '@/services/auth-service'

export async function POST(request: NextRequest) {
  const req = await request.json()
  const res = await updateUser(req)
  console.log(res)
  return NextResponse.json({ status: res.status, message: res.message, data: res.data })
}
