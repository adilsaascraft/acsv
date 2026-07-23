// features/questions/question.types.ts

export type QuestionStatus = 'Active' | 'Inactive'

export interface Question {
  _id: string
  questionName: string
  name: string
  status: QuestionStatus
  createdAt: string
  updatedAt: string
  __v: number
}

export interface QuestionsResponse {
  success: boolean
  count: number
  data: Question[]
}

export interface QuestionResponse {
  success: boolean
  data: Question
  message?: string
}

export interface QuestionActionResponse {
  success: boolean
  message: string
}

export interface QuestionSearchParams {
  search: string
}
