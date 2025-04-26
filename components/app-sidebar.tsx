'use client'

import * as React from 'react'

import Link from 'next/link'

import {
  IconCreditCardPay,
  IconDashboard,
  IconMoneybagMinus,
  IconMoneybagPlus
} from '@tabler/icons-react'
import { TrendingUp } from 'lucide-react'
import { getSession, useSession } from 'next-auth/react'

import { NavMain } from '@/components/nav-main'
import { NavUser } from '@/components/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg'
  },
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: IconDashboard
    },
    {
      title: 'Pemasukan',
      url: '/dashboard/income',
      icon: IconMoneybagPlus
    },
    {
      title: 'Pengeluaran',
      url: '/dashboard/expense',
      icon: IconMoneybagMinus
    },
    {
      title: 'Transaksi',
      url: '/dashboard/transaction',
      icon: IconCreditCardPay
    }
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // const { data: user } = useSession()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="h-10 data-[slot=sidebar-menu-button]:!p-1.5">
              <Link href="/dashboard">
                <TrendingUp className="!size-5" />
                <span className="text-base font-semibold">Rekap Uang</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
