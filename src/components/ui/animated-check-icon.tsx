"use client"

import { motion, useAnimation } from "framer-motion"
import { Copy, Check } from "lucide-react"
import { useState } from "react"

export function AnimatedCheckIcon({ onCopy }: { onCopy: () => void }) {
  const [isCopied, setIsCopied] = useState(false)
  const controls = useAnimation()

  const handleClick = () => {
    onCopy()
    setIsCopied(true)
    controls.start("checked")
    setTimeout(() => {
      setIsCopied(false)
      controls.start("idle")
    }, 1500)
  }

  const variants = {
    idle: {
      opacity: 1,
      scale: 1,
    },
    checked: {
      opacity: 0,
      scale: 0,
    },
  }

  return (
    <button onClick={handleClick} disabled={isCopied} className="relative h-7 w-7">
      <motion.div
        animate={controls}
        variants={variants}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Copy className="h-4 w-4" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={isCopied ? { opacity: 1, scale: 1 } : {}}
        transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.1 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Check className="h-4 w-4 text-green-500" />
      </motion.div>
    </button>
  )
}
