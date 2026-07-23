// features/questions/hooks/use-questions.ts

import { useQuery } from '@tanstack/react-query'

import { questionService } from '@/sevices/question.service'
import type { Question } from '@/types/type'

export const questionQueryKeys = {
  all: ['questions'] as const,
  active: () => [...questionQueryKeys.all, 'active'] as const,
}

export function useQuestions() {
 return useQuery<Question[]>({
   queryKey: questionQueryKeys.active(),
   queryFn: async () => {
     const response = await questionService.getActiveQuestions()
     return response.data
   },

   staleTime: 0,
   gcTime: 0,

   retry: 1,

   refetchOnMount: 'always',
   refetchOnReconnect: true,
   refetchOnWindowFocus: false,

   // ⭐ Automatically fetch every 15 seconds
   refetchInterval: 15_000,

   // ⭐ Continue polling even if the tab isn't focused
   refetchIntervalInBackground: true,
 })
}
