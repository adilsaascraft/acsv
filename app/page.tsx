"use client";

import { useMemo, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { EventHeader } from "@/components/event-header";
import { EmptyState } from "@/components/empty-state";
import { QuestionCard } from "@/components/question-card";
import { QuestionSkeleton } from "@/components/question-skeleton";
import { QuestionToolbar } from "@/components/question-toolbar";
import { ResetAllDialog } from "@/components/reset-all-dialog";
import { useQuestions } from "@/hooks/use-questions";
import { useResetAllQuestions } from "@/hooks/use-reset-all-questions";

export default function QuestionsPage() {
  const {
    data: questions = [],
    isLoading,
    isFetching,
    refetch,
    dataUpdatedAt,
  } = useQuestions()

  const resetAllMutation = useResetAllQuestions()

  const [search, setSearch] = useState('')
  const [resetAllOpen, setResetAllOpen] = useState(false)

  const filteredQuestions = useMemo(() => {
    const keyword = search.trim().toLowerCase()

    if (!keyword) {
      return questions
    }

    return questions.filter((question) => {
      return (
        question.questionName.toLowerCase().includes(keyword) ||
        question.name.toLowerCase().includes(keyword)
      )
    })
  }, [questions, search])

  return (
    <>
      <div className="container mx-auto max-w-7xl space-y-8 px-4 py-8">
        <EventHeader
          title="ACVS India 2026"
          subtitle="India's Premier Interventional Cardiology Conference"
          date="24th - 26th July 2026"
          location="Trident Hotel, Hyderabad"
          totalQuestions={questions.length}
        />

        <QuestionToolbar
          search={search}
          onSearchChange={setSearch}
          onRefresh={() => {
            void refetch()
          }}
          onResetAll={() => setResetAllOpen(true)}
          isRefreshing={isFetching}
          isResetting={resetAllMutation.isPending}
          updatedAt={dataUpdatedAt ? new Date(dataUpdatedAt) : undefined}
        />

        {isLoading ? (
          <QuestionSkeleton count={6} />
        ) : filteredQuestions.length === 0 ? (
          <EmptyState />
        ) : (
          <motion.div
            layout
            className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredQuestions.map((question) => (
                <QuestionCard key={question._id} question={question} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <ResetAllDialog
        open={resetAllOpen}
        onOpenChange={setResetAllOpen}
        totalQuestions={questions.length}
      />
    </>
  )
}