// features/questions/question.service.ts

import type { QuestionActionResponse, QuestionsResponse } from '@/types/type'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL!

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    },
    ...options,
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data?.message ?? 'Something went wrong.')
  }

  return data
}

export const questionService = {
  /**
   * GET /api/questions/active
   */
  getActiveQuestions(): Promise<QuestionsResponse> {
    return request<QuestionsResponse>('/api/questions/active')
  },

  /**
   * PUT /api/questions/:id/inactive
   */
  resetQuestion(questionId: string): Promise<QuestionActionResponse> {
    return request<QuestionActionResponse>(
      `/api/questions/${questionId}/inactive`,
      {
        method: 'PUT',
      },
    )
  },

  /**
   * PUT /api/questions/inactive-all
   */
  resetAllQuestions(): Promise<QuestionActionResponse> {
    return request<QuestionActionResponse>('/api/questions/inactive-all', {
      method: 'PUT',
    })
  },
}
