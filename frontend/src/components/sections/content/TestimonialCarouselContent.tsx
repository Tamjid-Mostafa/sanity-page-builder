'use client'

import {useMemo} from 'react'
import {motion} from 'motion/react'
import Autoplay from 'embla-carousel-autoplay'
import {Quote} from 'lucide-react'
import {stegaClean} from 'next-sanity'
import {MotionInView} from '@/components/motion/MotionInView'
import {cn} from '@/lib/utils'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import type {TestimonialCarouselData} from '@/types/sanity'

type Testimonial = TestimonialCarouselData['testimonials'][number]
type ExtendedTestimonialCarouselData = TestimonialCarouselData & {
  titleAlign?: string | null
}

const AUTOPLAY_DELAY_MS = 6000

export function TestimonialCarouselContent({data}: {data: TestimonialCarouselData}) {
  const testimonials = data.testimonials || []
  const titleAlign = stegaClean((data as ExtendedTestimonialCarouselData).titleAlign) === 'center' ? 'center' : 'left'
  const autoPlay = data.autoPlay !== false

  const plugins = useMemo(
    () => (autoPlay ? [Autoplay({delay: AUTOPLAY_DELAY_MS, stopOnInteraction: true})] : []),
    [autoPlay],
  )

  if (testimonials.length === 0) return null

  return (
    <div className="bg-background border-t border-border">
      <MotionInView className="mb-8" margin="-100px">
        {data.eyebrow && (
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            {data.eyebrow}
          </p>
        )}
        {data.title && (
          <h2
            className={cn(
              'text-3xl font-heading font-bold leading-[1.08] tracking-tight text-foreground sm:text-4xl md:text-[2.625rem]',
              titleAlign === 'center' && 'text-center',
            )}
          >
            {data.title}
          </h2>
        )}
      </MotionInView>

      <div className="relative overflow-x-clip pb-14">
        <Carousel opts={{align: 'start', loop: true}} plugins={plugins} className="mb-10 w-full">
          <CarouselContent className="-ml-4 md:-ml-6">
            {testimonials.map((t: Testimonial, index: number) => (
              <CarouselItem
                key={t._key}
                className="basis-full py-2 pl-4 sm:basis-4/5 md:pl-6 lg:basis-1/2"
              >
                <motion.div
                  initial={{opacity: 0, y: 16}}
                  whileInView={{opacity: 1, y: 0}}
                  viewport={{once: true, margin: '-80px'}}
                  transition={{duration: 0.5, delay: index * 0.06}}
                  className="h-full"
                >
                  <div className="flex h-full min-h-60 flex-col justify-between gap-6 rounded-2xl border border-border bg-card p-8 shadow-sm transition-shadow duration-300 hover:shadow-md">
                    <div className="flex items-start justify-between gap-4">
                      <Quote className="mt-0.5 h-8 w-8 shrink-0 text-primary" strokeWidth={1.5} />
                      {t.tag && (
                        <span className="max-w-44 shrink-0 rounded-full border border-border px-3 py-1 text-right text-[10px] font-semibold uppercase leading-snug tracking-[0.14em] text-foreground">
                          {t.tag}
                        </span>
                      )}
                    </div>

                    <p className="flex-1 text-base font-medium leading-relaxed text-foreground sm:text-lg">
                      &ldquo;{t.quote}&rdquo;
                    </p>

                    <div className="flex items-center gap-3 border-t border-border pt-2">
                      <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary">
                        <span className="text-sm font-semibold text-primary-foreground">
                          {t.name?.charAt(0) ?? '?'}
                        </span>
                      </div>
                      <div>
                        {t.name && (
                          <p className="text-sm font-semibold leading-none text-foreground">{t.name}</p>
                        )}
                        {t.title && (
                          <p className="mt-1 text-xs leading-snug text-muted-foreground">{t.title}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {testimonials.length > 1 && (
            <div className="absolute bottom-[-48px] right-0 mt-3 flex items-center justify-end gap-2">
              <CarouselPrevious className="static h-9 w-9 translate-x-0 translate-y-0 rounded-full border border-border bg-card text-foreground shadow-sm transition-colors hover:bg-card/80" />
              <CarouselNext className="static h-9 w-9 translate-x-0 translate-y-0 rounded-full border border-border bg-card text-foreground shadow-sm transition-colors hover:bg-card/80" />
            </div>
          )}
        </Carousel>
      </div>
    </div>
  )
}
