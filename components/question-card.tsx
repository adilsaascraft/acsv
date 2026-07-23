// features/questions/components/question-card.tsx

'use client'

import { useState } from 'react'

import { formatDistanceToNow } from 'date-fns'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageSquareText, MoreVertical, RotateCcw, User } from 'lucide-react'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

import { ResetQuestionDialog } from './reset-question-dialog'
import type { Question } from '@/types/type'

interface QuestionCardProps {
  question: Question
}

export function QuestionCard({ question }: QuestionCardProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{
          opacity: 0,
          scale: 0.95,
          y: -12,
        }}
        transition={{
          duration: 0.25,
        }}
      >
        <Card className="h-full transition-shadow hover:shadow-md">
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-full">
                <MessageSquareText className="h-5 w-5" />
              </div>

              <div className="space-y-1">
                <h3 className="line-clamp-3 text-base font-semibold leading-6">
                  {question.questionName}
                </h3>

                <p className="text-muted-foreground text-xs">
                  Live Delegate Question
                </p>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  className="cursor-pointer text-destructive focus:text-destructive"
                  onClick={() => setOpen(true)}
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset Question
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-full">
                <User className="text-muted-foreground h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-medium">{question.name}</p>

                <p className="text-muted-foreground text-xs">Delegate</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <p className="text-muted-foreground text-xs">
                Asked{' '}
                {formatDistanceToNow(new Date(question.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <AnimatePresence>
        {open && (
          <ResetQuestionDialog
            open={open}
            onOpenChange={setOpen}
            question={question}
          />
        )}
      </AnimatePresence>
    </>
  )
}
