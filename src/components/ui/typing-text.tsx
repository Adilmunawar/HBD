"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type TypingTextProps = {
  text: string;
  className?: string;
  onComplete?: () => void;
};

export const TypingText = ({ text, className, onComplete }: TypingTextProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);
    let i = 0;
    const intervalId = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(intervalId);
        setIsTyping(false);
        if (onComplete) {
            onComplete();
        }
      }
    }, 80);

    return () => clearInterval(intervalId);
  }, [text, onComplete]);

  return (
    <p className={className}>
      {displayedText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.7, repeat: Infinity }}
        className="inline-block ml-1 w-1 bg-foreground"
      >
        {isTyping ? <>&nbsp;</> : ''}
      </motion.span>
    </p>
  );
};
