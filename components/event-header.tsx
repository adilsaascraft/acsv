// features/questions/components/event-header.tsx

'use client'

import { CalendarDays, MapPin, MessageSquareMore } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface EventHeaderProps {
  title: string
  subtitle: string
  date: string
  location: string
  totalQuestions: number
}

export function EventHeader({
  title,
  subtitle,
  date,
  location,
  totalQuestions,
}: EventHeaderProps) {
  return (
    <Card className="overflow-hidden border-0 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg">
      <CardContent className="p-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-5">
            <div className="space-y-2">
              <Badge
                variant="secondary"
                className="bg-primary-foreground/15 text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/20"
              >
                LIVE Q&amp;A SESSION
              </Badge>

              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                {title}
              </h1>

              <p className="max-w-3xl text-base text-primary-foreground/90 md:text-lg">
                {subtitle}
              </p>
            </div>

            <div className="flex flex-col gap-3 text-sm sm:flex-row sm:flex-wrap sm:gap-6">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5 shrink-0" />
                <span>{date}</span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 shrink-0" />
                <span>{location}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-start lg:justify-end">
            <div className="rounded-2xl bg-primary-foreground/10 px-8 py-6 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary-foreground/15 p-3">
                  <MessageSquareMore className="h-7 w-7" />
                </div>

                <div>
                  <p className="text-sm text-primary-foreground/80">
                    Active Questions
                  </p>

                  <p className="text-4xl font-bold leading-none">
                    {totalQuestions}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
