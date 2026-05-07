'use client'

import {useEffect, useMemo, useState} from 'react'
import Autoplay from 'embla-carousel-autoplay'
import {Quote} from 'lucide-react'
import {Image} from 'next-sanity/image'
import {stegaClean} from 'next-sanity'
import {cn} from '@/lib/utils'
import {urlFor} from '@/sanity/lib/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import type {TestimonialCarouselData} from '@/types/sanity'

type Testimonial = TestimonialCarouselData['testimonials'][number]
type ExtendedTestimonialCarouselData = TestimonialCarouselData & {titleAlign?: string | null}

function initials(name?: string | null) {
  if (!name) return '?'
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

function badgeLabel(testimonial: Testimonial) {
  if (testimonial.tag) {
    return testimonial.tag
  }
  if (typeof testimonial.rating === 'number' && testimonial.rating > 0) {
    return `${testimonial.rating}/5 Rating`
  }
  return null
}

export function TestimonialCarouselContent({data}: {data: TestimonialCarouselData}) {
  const testimonials = data.testimonials || []
  const eyebrow = data.eyebrow || 'Student voices'
  const titleAlign = stegaClean((data as ExtendedTestimonialCarouselData).titleAlign) === 'center' ? 'center' : 'left'
  const showDots = data.showDots !== false
  const showArrows = data.showArrows !== false
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  const plugins = useMemo(
    () =>
      data.autoPlay
        ? [
            Autoplay({
              delay: (data.autoPlayInterval || 5) * 1000,
              stopOnInteraction: true,
            }),
          ]
        : [],
    [data.autoPlay, data.autoPlayInterval],
  )

  useEffect(() => {
    if (!api) return
    const onSelect = () => setCurrent(api.selectedScrollSnap())
    onSelect()
    api.on('select', onSelect)
    api.on('reInit', onSelect)
    return () => {
      api.off('select', onSelect)
      api.off('reInit', onSelect)
    }
  }, [api])

  if (testimonials.length === 0) return null

  return (
    <div>
      <div className={cn('mb-8', titleAlign === 'center' ? 'text-center' : 'text-left')}>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">{eyebrow}</p>
        {data.title && (
          <h2 className="text-3xl font-heading font-bold leading-[1.08] tracking-tight sm:text-4xl md:text-[2.625rem]">
            {data.title}
          </h2>
        )}
      </div>

      <Carousel
        opts={{align: 'start', loop: testimonials.length > 1}}
        plugins={plugins}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent className="-ml-4 md:-ml-6">
          {testimonials.map((t: Testimonial) => {
            const badge = badgeLabel(t)
            return (
              <CarouselItem key={t._key} className="basis-full py-2 pl-4 sm:basis-4/5 md:pl-6 lg:basis-1/2">
                <div className="flex h-full min-h-60 flex-col justify-between gap-6 rounded-2xl border border-border bg-card p-8 shadow-sm transition-shadow duration-300 hover:shadow-md">
                  <div className="flex items-start justify-between gap-4">
                    <Quote className="mt-0.5 h-8 w-8 shrink-0 text-primary" strokeWidth={1.5} />
                    {badge && (
                      <span className="shrink-0 rounded-full border border-border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-foreground">
                        {badge}
                      </span>
                    )}
                  </div>

                  <blockquote
                    className={cn(
                      'flex-1 text-base font-light leading-relaxed text-foreground sm:text-lg',
                      titleAlign === 'center' ? 'text-center' : 'text-left',
                    )}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>

                  <div
                    className={cn(
                      'flex items-center gap-3 border-t border-border pt-2',
                      titleAlign === 'center' ? 'justify-center' : 'justify-start',
                    )}
                  >
                    {t.avatar?.asset ? (
                      <Image
                        src={urlFor(t.avatar).width(72).height(72).fit('max').url()}
                        alt={t.name || ''}
                        width={36}
                        height={36}
                        className="h-9 w-9 shrink-0 rounded-full object-cover"
                      />
                    ) : (
                      <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary">
                        <span className="text-sm font-semibold text-primary-foreground">{initials(t.name)}</span>
                      </div>
                    )}
                    <div className={cn(titleAlign === 'center' ? 'text-center' : 'text-left')}>
                      {t.name && <p className="text-sm font-semibold leading-none text-foreground">{t.name}</p>}
                      {t.title && <p className="mt-1 text-xs leading-snug text-foreground">{t.title}</p>}
                    </div>
                  </div>
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>

        {showArrows && testimonials.length > 1 && (
          <div className="absolute -bottom-12 right-0 mt-3 flex items-center justify-end gap-2">
            <CarouselPrevious className="static h-9 w-9 translate-x-0 translate-y-0 rounded-full border border-border bg-card text-foreground shadow-sm transition-colors hover:bg-card/80" />
            <CarouselNext className="static h-9 w-9 translate-x-0 translate-y-0 rounded-full border border-border bg-card text-foreground shadow-sm transition-colors hover:bg-card/80" />
          </div>
        )}
      </Carousel>

      {showDots && testimonials.length > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((t: Testimonial, index: number) => (
            <button
              key={t._key}
              type="button"
              onClick={() => api?.scrollTo(index)}
              className={cn('h-2 rounded-full transition-all', index === current ? 'w-6 bg-primary' : 'w-2 bg-border')}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
