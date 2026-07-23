// features/questions/components/reset-question-dialog.tsx

'use client'

import { AlertTriangle, Loader2, MessageSquareText, User } from 'lucide-react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

import { useResetQuestion } from '../hooks/use-reset-question'
import type { Question } from '@/types/type'

interface ResetQuestionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  question: Question | null
}

export function ResetQuestionDialog({
  open,
  onOpenChange,
  question,
}: ResetQuestionDialogProps) {
  const { mutate, isPending } = useResetQuestion()

  const handleReset = () => {
    if (!question) return

    mutate(question._id, {
      onSuccess: () => {
        onOpenChange(false)
      },
    })
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Reset Question
          </AlertDialogTitle>

          <AlertDialogDescription>
            This action will remove the selected question from the live Q&amp;A
            screen. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {question && (
          <div className="space-y-4 rounded-lg border bg-muted/40 p-4">
            <div className="flex items-start gap-3">
              <MessageSquareText className="mt-0.5 h-5 w-5 text-primary" />

              <div className="space-y-1">
                <p className="text-sm font-medium">Question</p>
                <p className="text-sm text-muted-foreground break-words">
                  {question.questionName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-muted-foreground" />

              <div>
                <p className="text-sm font-medium">Asked by</p>
                <p className="text-sm text-muted-foreground">{question.name}</p>
              </div>
            </div>
          </div>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault()
              handleReset()
            }}
            disabled={isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Reset Question
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
