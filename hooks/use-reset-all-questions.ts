// features/questions/hooks/use-reset-all-questions.ts

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { questionService } from '@/sevices/question.service'
import { questionQueryKeys } from './use-questions'

export function useResetAllQuestions() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => questionService.resetAllQuestions(),

    onSuccess: (response) => {
      toast.success(response.message)

      queryClient.invalidateQueries({
        queryKey: questionQueryKeys.active(),
      })
    },

    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}
