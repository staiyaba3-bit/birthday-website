import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const MusicControl = () => {
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const audioRef = useRef(null);

  const handleSoundToggle = () => {
    if (!isSoundEnabled) {
      // Play soft romantic music - using a data URL for a simple tone
      // In production, replace with actual music file
      if (audioRef.current) {
        audioRef.current.play().catch(() => {
          console.log('Audio autoplay not allowed by browser');
        });
      }
      setIsSoundEnabled(true);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsSoundEnabled(false);
    }
  };

  return (
    <>
      <motion.button
        onClick={handleSoundToggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed top-8 right-8 z-50 bg-soft-pink/20 hover:bg-soft-pink/40 backdrop-blur-md px-4 py-2 rounded-full text-accent-white font-soft text-sm transition-all border border-soft-pink/30"
      >
        {isSoundEnabled ? '🔊 Music On' : '🔇 Music Off'}
      </motion.button>
      
      <audio
        ref={audioRef}
        loop
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        volume={0.2}
      />
    </>
  );
};

export default MusicControl;
