'use client'

import * as React from 'react'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Button size="icon" variant="ghost" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      <Moon
        strokeWidth={1.5}
        className="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
      />
      <Sun
        strokeWidth={1.5}
        className="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
