// features/questions/components/question-skeleton.tsx

import { Skeleton } from '@/components/ui/skeleton'

interface QuestionSkeletonProps {
  count?: number
}

export function QuestionSkeleton({ count = 6 }: QuestionSkeletonProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div className="flex-1 space-y-3">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
            </div>

            <Skeleton className="h-8 w-8 rounded-md" />
          </div>

          <div className="space-y-3">
            <Skeleton className="h-4 w-20" />

            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />

              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-8 w-20 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  )
}
