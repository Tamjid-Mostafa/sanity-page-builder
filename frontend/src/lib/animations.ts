/**
 * Premium Animation Constants
 * Apple-inspired easing functions and timing standards
 */

// Easing functions (cubic-bezier values)
export const easing = {
  // Apple's signature ease - smooth and natural
  apple: [0.16, 1, 0.3, 1] as const,
  
  // Material Design ease - balanced and predictable
  smooth: [0.4, 0, 0.2, 1] as const,
  
  // Playful bounce for attention-grabbing elements
  bounce: [0.68, -0.55, 0.265, 1.55] as const,
  
  // Quick and snappy for small interactions
  snappy: [0.25, 0.46, 0.45, 0.94] as const,
  
  // Gentle ease out for exits
  easeOut: [0, 0, 0.2, 1] as const,
  
  // Ease in for entrances
  easeIn: [0.4, 0, 1, 1] as const,
};

// Duration standards (in seconds)
export const duration = {
  instant: 0.15,
  fast: 0.2,
  medium: 0.4,
  slow: 0.6,
  slower: 0.8,
};

// Stagger delays for sequential animations
export const stagger = {
  cards: 0.1,      // Card grids
  list: 0.08,      // List items
  text: 0.05,      // Text lines
  icons: 0.06,     // Icon sequences
};

// Spring physics configurations
export const spring = {
  gentle: { stiffness: 100, damping: 15 },
  bouncy: { stiffness: 200, damping: 12 },
  snappy: { stiffness: 300, damping: 25 },
  smooth: { stiffness: 120, damping: 20 },
};

// Viewport margin for intersection observer
export const viewport = {
  default: "-10%",
  lazy: "-50%",
  eager: "0%",
};

// Hover scale values
export const scale = {
  button: 1.02,
  card: 1.03,
  icon: 1.1,
  subtle: 1.01,
};

// Default transition for motion components
export const defaultTransition = {
  duration: duration.medium,
  ease: easing.apple,
};

// Fade in animation preset
export const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: duration.slow, ease: easing.apple },
};

// Slide up animation preset
export const slideUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: duration.medium, ease: easing.apple },
};

// Scale in animation preset
export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: duration.medium, ease: easing.smooth },
};

