// features/questions/components/question-toolbar.tsx

'use client'

import { useEffect, useState } from 'react'

import { format } from 'date-fns'
import { motion } from 'framer-motion'
import { Loader2, RefreshCw, RotateCcw, Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface QuestionToolbarProps {
  search: string
  onSearchChange: (value: string) => void
  onRefresh: () => void
  onResetAll: () => void
  isRefreshing?: boolean
  isResetting?: boolean
  updatedAt?: Date
}

export function QuestionToolbar({
  search,
  onSearchChange,
  onRefresh,
  onResetAll,
  isRefreshing = false,
  isResetting = false,
  updatedAt,
}: QuestionToolbarProps) {
  const [value, setValue] = useState(search)

  useEffect(() => {
    setValue(search)
  }, [search])

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(value)
    }, 300)

    return () => clearTimeout(timer)
  }, [value, onSearchChange])

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />

          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search by question or delegate name..."
            className="pl-10 h-10"
          />
        </div>

        <Button
          variant="destructive"
          onClick={onResetAll}
          disabled={isResetting}
          className={'h-10'}
        >
          {isResetting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Resetting...
            </>
          ) : (
            <>
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset All
            </>
          )}
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onRefresh}
          disabled={isRefreshing}
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm transition-colors"
        >
          <motion.div
            animate={{
              rotate: isRefreshing ? 360 : 0,
            }}
            transition={{
              duration: 1,
              repeat: isRefreshing ? Infinity : 0,
              ease: 'linear',
            }}
          >
            <RefreshCw className="h-4 w-4" />
          </motion.div>

          <span className="font-medium">Refresh on every 15 seconds</span>
        </button>

        <span className="text-muted-foreground text-sm">
          {updatedAt
            ? `Last updated ${format(updatedAt, 'hh:mm:ss a')}`
            : 'Not refreshed yet'}
        </span>
      </div>
    </div>
  )
}
