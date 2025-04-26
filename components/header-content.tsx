import { TrendingUp } from 'lucide-react'

import serverSession from '@/lib/session'

export default async function HeaderContent() {
  const user = await serverSession()

  if (!user) {
    return <p>Loading...</p>
  }

  return (
    <div className="from-primary/10 to-card bg-card absolute top-0 right-0 left-0 z-0 h-[180px] w-full rounded-2xl bg-gradient-to-t px-4 lg:px-6">
      <div className="font-bricolage mt-6 flex items-center gap-2">
        <TrendingUp className="size-12" />
        <div className="flex flex-col">
          <span className="text-lg font-medium">Hai,</span>
          <span className="text-2xl font-bold">{user.name}</span>
        </div>
      </div>
    </div>
  )
}
