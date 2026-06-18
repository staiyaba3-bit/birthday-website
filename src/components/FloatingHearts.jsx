import { motion } from 'framer-motion';

const FloatingHearts = () => {
  const hearts = Array.from({ length: 15 }, (_, i) => i);

  const randomDelay = (seed) => {
    return (seed * 0.7) % 5;
  };

  const randomDuration = (seed) => {
    return 8 + (seed * 3.5) % 4;
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart}
          className="absolute text-soft-pink opacity-20"
          style={{
            left: `${(heart * 7) % 100}%`,
            fontSize: `${20 + (heart * 5) % 15}px`,
          }}
          animate={{
            y: [0, -window.innerHeight],
            x: [0, (Math.random() - 0.5) * 100],
            opacity: [0.3, 0.5, 0],
          }}
          transition={{
            duration: randomDuration(heart),
            delay: randomDelay(heart),
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          ❤️
        </motion.div>
      ))}

      {/* Sparkles */}
      {Array.from({ length: 10 }, (_, i) => i).map((spark) => (
        <motion.div
          key={`spark-${spark}`}
          className="absolute text-yellow-200 opacity-30"
          style={{
            left: `${(spark * 11) % 100}%`,
            fontSize: '10px',
          }}
          animate={{
            y: [0, -window.innerHeight],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 12 + (spark * 2) % 4,
            delay: spark * 0.8,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          ✨
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;
