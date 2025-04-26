import { getServerSession } from 'next-auth'

import { authOptions } from '@/services/auth-option'

export default async function serverSession() {
  const session = await getServerSession(authOptions)
  return session?.user
}
