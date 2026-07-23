'use client'

import { useState } from 'react'

import { formatDistanceToNow } from 'date-fns'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageSquareText, MoreVertical, RotateCcw, User } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

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
          y: -12,
          scale: 0.95,
        }}
        transition={{
          duration: 0.25,
        }}
      >
        <Card className="h-full border transition-all duration-200 hover:shadow-lg">
          <CardHeader className="pb-5">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-700">
                <MessageSquareText className="h-5 w-5" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start gap-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="break-all whitespace-pre-wrap text-base font-semibold leading-7 text-sky-800 transition-colors duration-200 hover:text-sky-900">
                      {question.questionName}
                    </h3>

                    <p className="mt-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Live Delegate Question
                    </p>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 shrink-0 rounded-full"
                      >
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
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="flex items-center gap-3 rounded-lg border bg-muted/30 p-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-700">
                <User className="h-5 w-5" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-base font-semibold text-sky-800 transition-colors hover:text-sky-900">
                  {question.name}
                </p>

                <p className="text-sm text-muted-foreground">
                  Conference Delegate
                </p>
              </div>
            </div>

            <div className="border-t pt-4">
              <p className="text-xs text-muted-foreground">
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
