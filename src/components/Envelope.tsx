import { motion } from 'framer-motion';
import { useState } from 'react';

interface EnvelopeProps {
  recipientName: string;
  onOpen: () => void;
}

const Envelope = ({ recipientName, onOpen }: EnvelopeProps) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    setTimeout(onOpen, 1800);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto px-4">
      {/* Subtle outer glow */}
      <motion.div
        className="absolute inset-0 -m-16"
        style={{
          background: 'radial-gradient(circle, hsl(42 85% 55% / 0.12) 0%, transparent 60%)',
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Envelope body */}
      <motion.div
        className="relative w-full bg-gradient-to-b from-[hsl(0,35%,18%)] via-[hsl(0,40%,14%)] to-[hsl(0,45%,10%)] rounded-lg overflow-visible"
        style={{
          aspectRatio: '4/3',
          border: '2px solid hsl(42 85% 55% / 0.4)',
          boxShadow: '0 30px 80px hsl(0 0% 0% / 0.7), 0 0 2px hsl(42 85% 55% / 0.5), inset 0 0 60px hsl(0 80% 50% / 0.08)',
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        {/* Subtle pattern overlay */}
        <div 
          className="absolute inset-0 opacity-5 rounded-lg"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, hsl(42 85% 55%) 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* Inner border */}
        <div className="absolute inset-4 border border-gold/20 rounded" />

        {/* Decorative corners */}
        <div className="absolute top-5 left-5 w-10 h-10 border-t border-l border-gold/30" />
        <div className="absolute top-5 right-5 w-10 h-10 border-t border-r border-gold/30" />
        <div className="absolute bottom-5 left-5 w-10 h-10 border-b border-l border-gold/30" />
        <div className="absolute bottom-5 right-5 w-10 h-10 border-b border-r border-gold/30" />

        {/* Top flap - triangle */}
        <motion.div
          className="absolute top-0 left-0 right-0 origin-top z-10"
          style={{
            height: '50%',
            background: 'linear-gradient(180deg, hsl(0 30% 16%) 0%, hsl(0 35% 12%) 100%)',
            clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
          }}
          animate={isOpening ? { rotateX: -180, opacity: 0 } : {}}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        >
          {/* Flap edge highlight */}
          <div 
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-px"
            style={{
              background: 'linear-gradient(90deg, transparent, hsl(42 85% 55% / 0.5), transparent)',
            }}
          />
        </motion.div>

        {/* Seal button - circular gold wax seal */}
        <motion.button
          onClick={handleOpen}
          disabled={isOpening}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 focus:outline-none"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={isOpening ? { scale: 0, opacity: 0, rotate: 90 } : {}}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-28 h-28 rounded-full flex items-center justify-center cursor-pointer relative"
            style={{
              background: 'linear-gradient(135deg, hsl(45 100% 72%), hsl(42 90% 55%), hsl(38 85% 42%))',
              boxShadow: '0 6px 30px hsl(42 85% 55% / 0.5), 0 10px 50px hsl(42 85% 55% / 0.25), inset 0 2px 4px hsl(45 100% 80% / 0.4)',
            }}
            animate={{
              boxShadow: [
                '0 6px 30px hsl(42 85% 55% / 0.4), 0 10px 50px hsl(42 85% 55% / 0.2)',
                '0 6px 40px hsl(42 85% 55% / 0.6), 0 10px 60px hsl(42 85% 55% / 0.3)',
                '0 6px 30px hsl(42 85% 55% / 0.4), 0 10px 50px hsl(42 85% 55% / 0.2)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {/* Inner decorative rings */}
            <div className="absolute inset-3 border-2 border-[hsl(0,20%,15%)]/30 rounded-full" />
            <div className="absolute inset-5 border border-[hsl(0,20%,15%)]/20 rounded-full" />
            
            {/* Seal text */}
            <span 
              className="text-[hsl(0,20%,10%)] text-lg font-bold tracking-[0.2em] font-serif relative z-10"
            >
              拆封
            </span>
          </motion.div>
        </motion.button>

        {/* Recipient label */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center w-full px-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-10 h-px bg-gold/40" />
            <span className="text-gold/60 text-xs tracking-[0.3em] font-serif">致</span>
            <div className="w-10 h-px bg-gold/40" />
          </div>
          <h2 
            className="text-2xl sm:text-3xl gold-text font-bold mb-2 font-serif truncate"
          >
            {recipientName}
          </h2>
          <p className="text-muted-foreground text-sm tracking-widest font-serif">的一封家书</p>
        </motion.div>

        {/* Opening animation - golden light burst */}
        {isOpening && (
          <motion.div
            className="absolute inset-0 z-30 pointer-events-none rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0] }}
            transition={{ duration: 1.5 }}
            style={{
              background: 'radial-gradient(circle at 50% 50%, hsl(42 85% 55% / 0.4) 0%, transparent 60%)',
            }}
          />
        )}
      </motion.div>

      {/* Floating hint */}
      {!isOpening && (
        <motion.p
          className="text-center mt-8 text-gold/50 text-sm tracking-wider font-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          点击印章拆封
        </motion.p>
      )}
    </div>
  );
};

export default Envelope;
