import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const HUDElements = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Top left HUD */}
      <motion.div
        className="fixed top-6 left-6 z-30"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="cyber-card p-4 min-w-[200px]">
          {/* Corner decorations */}
          <div className="hud-corner top-left" />
          <div className="hud-corner top-right" />
          
          <div className="text-xs text-muted-foreground tracking-widest mb-1 font-mono">
            SYSTEM STATUS
          </div>
          <div className="cyber-text text-lg">
            {time.toLocaleTimeString('zh-CN', { hour12: false })}
          </div>
          <div className="text-xs text-primary/60 mt-1 font-mono">
            CONNECTION: ACTIVE
          </div>
        </div>
      </motion.div>

      {/* Data stream indicators */}
      <motion.div
        className="fixed top-1/4 left-4 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1 h-8 mb-2 rounded-full overflow-hidden"
            style={{ background: 'hsl(var(--muted))' }}
          >
            <motion.div
              className="w-full bg-primary"
              initial={{ height: '0%' }}
              animate={{ height: ['20%', '80%', '40%', '60%', '20%'] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Right side data readout */}
      <motion.div
        className="fixed top-1/3 right-4 z-20 text-right"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="space-y-2 text-xs font-mono text-primary/40">
          <div className="animate-pulse-glow inline-block px-2 py-1 border border-primary/20 rounded">
            ◆ SECURE LINK
          </div>
          <div className="text-primary/30">
            ID: HX-2024-{Math.floor(Math.random() * 9999).toString().padStart(4, '0')}
          </div>
          <div className="text-primary/20">
            LAT: 31.2304° N
          </div>
          <div className="text-primary/20">
            LON: 121.4737° E
          </div>
        </div>
      </motion.div>

      {/* Bottom decorative line */}
      <motion.div
        className="fixed bottom-20 left-0 right-0 z-20 flex justify-center"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <div className="flex items-center gap-4">
          <div className="w-32 h-px bg-gradient-to-r from-transparent to-primary/50" />
          <div className="w-2 h-2 rotate-45 border border-primary/50" />
          <div className="w-48 h-px bg-primary/30" />
          <div className="w-2 h-2 rotate-45 border border-primary/50" />
          <div className="w-32 h-px bg-gradient-to-l from-transparent to-primary/50" />
        </div>
      </motion.div>

      {/* Scanning line effect */}
      <motion.div
        className="fixed left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent z-30 pointer-events-none"
        initial={{ top: '-10%' }}
        animate={{ top: '110%' }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </>
  );
};

export default HUDElements;
