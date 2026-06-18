import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const TypewriterText = ({ text, speed = 50, delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeout;
    if (displayedText.length < text.length) {
      timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);
    } else {
      setIsComplete(true);
    }
    return () => clearTimeout(timeout);
  }, [displayedText, text, speed]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (displayedText.length === 0) {
        setDisplayedText('');
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return <span>{displayedText}</span>;
};

export default TypewriterText;
