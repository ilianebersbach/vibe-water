import { motion } from 'framer-motion'

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  stagger?: number
}

export default function AnimatedText({
  text,
  className = '',
  delay = 0,
  stagger = 0.04,
}: AnimatedTextProps) {
  const words = text.split(' ')

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  }

  const child = {
    hidden: { opacity: 0, y: 40, rotateX: -20 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
  }

  return (
    <motion.span
      className={`inline-flex flex-wrap gap-x-[0.25em] ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, i) => (
        <motion.span key={i} variants={child} style={{ display: 'inline-block' }}>
          {word}
        </motion.span>
      ))}
    </motion.span>
  )
}
