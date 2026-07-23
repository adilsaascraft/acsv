// features/questions/components/empty-state.tsx

'use client'

import { motion } from 'framer-motion'
import { MessageSquareMore } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'

export function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25 }}
      className="flex justify-center py-12"
    >
      <Card className="w-full max-w-2xl border-dashed">
        <CardContent className="flex flex-col items-center justify-center px-8 py-16 text-center">
          <div className="bg-muted mb-6 flex h-20 w-20 items-center justify-center rounded-full">
            <MessageSquareMore className="text-muted-foreground h-10 w-10" />
          </div>

          <h3 className="text-foreground text-2xl font-semibold">
            No Active Questions
          </h3>

          <p className="text-muted-foreground mt-3 max-w-md text-sm leading-6">
            Waiting for delegates to submit their questions. New questions will
            appear here automatically after refreshing.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
