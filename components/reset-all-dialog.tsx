// features/questions/components/reset-all-dialog.tsx

'use client'

import { AlertTriangle, Loader2 } from 'lucide-react'

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

import { useResetAllQuestions } from '../hooks/use-reset-all-questions'

interface ResetAllDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  totalQuestions: number
}

export function ResetAllDialog({
  open,
  onOpenChange,
  totalQuestions,
}: ResetAllDialogProps) {
  const { mutate, isPending } = useResetAllQuestions()

  const handleResetAll = () => {
    mutate(undefined, {
      onSuccess: () => {
        onOpenChange(false)
      },
    })
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Reset All Questions
          </AlertDialogTitle>

          <AlertDialogDescription>
            This will remove <strong>all active questions</strong> from the live
            Q&amp;A screen.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="rounded-lg border bg-muted/40 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Active Questions
            </span>

            <span className="text-lg font-semibold">{totalQuestions}</span>
          </div>

          <p className="mt-3 text-sm text-muted-foreground">
            This action cannot be undone. Delegates will no longer see any of
            the currently active questions.
          </p>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault()
              handleResetAll()
            }}
            disabled={isPending || totalQuestions === 0}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Reset All
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
