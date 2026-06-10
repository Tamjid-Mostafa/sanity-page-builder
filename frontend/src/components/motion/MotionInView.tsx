'use client'

import {motion, type Transition} from 'motion/react'
import {cn} from '@/lib/utils'

type MotionInViewProps = {
  children: React.ReactNode
  className?: string
  margin?: string
  delay?: number
  transition?: Transition
}

export function MotionInView({
  children,
  className,
  margin = '-100px',
  delay = 0,
  transition,
}: MotionInViewProps) {
  return (
    <motion.div
      initial={{opacity: 0, y: 20}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, margin}}
      transition={{duration: 0.6, delay, ...transition}}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
