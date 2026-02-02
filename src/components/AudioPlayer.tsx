import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Music } from 'lucide-react';

const AudioPlayer = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element for background music
    // Using a placeholder - in production, replace with actual audio URL
    audioRef.current = new Audio();
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    
    // For demo, we'll simulate audio being ready
    setIsLoaded(true);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play().catch(() => {
          // Audio play failed, likely due to browser autoplay policy
        });
      } else {
        audioRef.current.pause();
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <motion.button
      onClick={toggleMute}
      className="fixed top-6 right-6 z-40 glass-card p-3 flex items-center gap-2 cursor-pointer group"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative">
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
        ) : (
          <>
            <Volume2 className="w-5 h-5 text-primary" />
            {/* Sound wave animation */}
            <motion.div
              className="absolute -right-1 top-1/2 -translate-y-1/2"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Music className="w-3 h-3 text-primary" />
            </motion.div>
          </>
        )}
      </div>
      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
        {isMuted ? '播放音乐' : '暂停音乐'}
      </span>
    </motion.button>
  );
};

export default AudioPlayer;
