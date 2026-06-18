import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import TypewriterText from '../components/TypewriterText';
import FloatingHearts from '../components/FloatingHearts';
import MusicControl from '../components/MusicControl';

const LandingPage = () => {
  const navigate = useNavigate();
  const [lineIndex, setLineIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);

  const lines = [
    { text: 'Hey Baby... ❤️', delay: 0 },
    { text: 'I made something for you...', delay: 2000 },
    { text: 'Not just a website... but us. 💫', delay: 4000 },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (lineIndex < lines.length - 1) {
        setLineIndex(lineIndex + 1);
      } else if (lineIndex === lines.length - 1) {
        setTimeout(() => setShowButton(true), 1500);
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [lineIndex]);

  const handleButtonClick = async () => {
    // Play click sound
    const clickSound = new Audio('data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==');
    try {
      clickSound.play();
    } catch (e) {
      console.log('Sound effect not available');
    }

    // Fade out animation
    const root = document.getElementById('root');
    root.style.animation = 'fadeOut 1s ease-out forwards';

    setTimeout(() => {
      navigate('/cake-page');
    }, 1000);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden font-soft">
      {/* Background Gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-purple-900 to-pink-900 -z-10" />

      {/* Animated Glow Background */}
      <motion.div
        className="fixed inset-0 -z-5"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(255, 107, 154, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 80%, rgba(200, 162, 255, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(255, 107, 154, 0.15) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Floating Hearts and Sparkles */}
      <FloatingHearts />

      {/* Music Control */}
      <MusicControl />

      {/* Main Content */}
      <motion.div
        className="relative w-full h-screen flex flex-col items-center justify-center px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {/* Text Container */}
        <div className="text-center space-y-8 max-w-2xl">
          {/* Line 1 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: lineIndex >= 0 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-cursive text-5xl md:text-7xl text-soft-pink drop-shadow-lg">
              <TypewriterText
                text={lines[0].text}
                speed={50}
                delay={0}
              />
            </h1>
          </motion.div>

          {/* Line 2 */}
          {lineIndex >= 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-soft text-2xl md:text-3xl text-lavender drop-shadow-lg">
                <TypewriterText
                  text={lines[1].text}
                  speed={50}
                  delay={0}
                />
              </p>
            </motion.div>
          )}

          {/* Line 3 */}
          {lineIndex >= 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-soft text-xl md:text-2xl text-accent-white drop-shadow-lg">
                <TypewriterText
                  text={lines[2].text}
                  speed={50}
                  delay={0}
                />
              </p>
            </motion.div>
          )}
        </div>

        {/* Button */}
        {showButton && (
          <motion.button
            onClick={handleButtonClick}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="mt-16 px-10 py-4 bg-gradient-to-r from-soft-pink to-lavender text-white font-soft font-bold text-xl rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 animate-glow-pulse relative overflow-hidden group"
          >
            <span className="relative z-10">Start Our Story 💖</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-lavender to-soft-pink opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        )}
      </motion.div>

      {/* Footer */}
      <motion.div
        className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-2 text-accent-white font-soft text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <span>Made with endless love</span>
        <motion.span
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="inline-block"
        >
          ❤️
        </motion.span>
        <span>by Taiyaba</span>
      </motion.div>

      {/* CSS for fadeOut animation */}
      <style>{`
        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
