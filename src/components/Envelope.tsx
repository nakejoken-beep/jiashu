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
    <div className="relative w-full max-w-md mx-auto">
      {/* Subtle outer glow */}
      <motion.div
        className="absolute inset-0 -m-12 rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(42 85% 55% / 0.08) 0%, transparent 60%)',
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Envelope body */}
      <motion.div
        className="envelope relative w-full aspect-[4/3] overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        style={{ perspective: '1000px' }}
      >
        {/* Subtle pattern overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, hsl(42 85% 55%) 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* Inner border */}
        <motion.div
          className="absolute inset-4 border border-gold/20 rounded"
        />

        {/* Decorative corners */}
        <div className="absolute top-5 left-5 w-10 h-10 border-t border-l border-gold/30" />
        <div className="absolute top-5 right-5 w-10 h-10 border-t border-r border-gold/30" />
        <div className="absolute bottom-5 left-5 w-10 h-10 border-b border-l border-gold/30" />
        <div className="absolute bottom-5 right-5 w-10 h-10 border-b border-r border-gold/30" />

        {/* Top flap */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-1/2 origin-top z-10"
          style={{
            background: 'linear-gradient(180deg, hsl(0 18% 14%) 0%, hsl(0 20% 10%) 100%)',
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
              background: 'linear-gradient(90deg, transparent, hsl(42 85% 55% / 0.4), transparent)',
            }}
          />
        </motion.div>

        {/* Seal button */}
        <motion.button
          onClick={handleOpen}
          disabled={isOpening}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          animate={isOpening ? { scale: 0, opacity: 0, rotate: 90 } : {}}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="relative"
            animate={{
              boxShadow: ['0 4px 30px hsl(42 85% 55% / 0.3)', '0 4px 40px hsl(42 85% 55% / 0.5)', '0 4px 30px hsl(42 85% 55% / 0.3)'],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="seal w-24 h-24 rounded-full flex items-center justify-center cursor-pointer relative">
              {/* Inner decorative ring */}
              <div className="absolute inset-2 border border-background/20 rounded-full" />
              <div className="absolute inset-3 border border-background/10 rounded-full" />
              
              {/* Seal text */}
              <span 
                className="text-background text-base font-bold tracking-widest font-serif"
              >
                拆封
              </span>
            </div>
          </motion.div>
        </motion.button>

        {/* Recipient label */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center"
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
            className="text-3xl gold-text font-bold mb-2 font-serif"
          >
            {recipientName}
          </h2>
          <p className="text-muted-foreground text-sm tracking-widest font-serif">的一封家书</p>
        </motion.div>

        {/* Opening animation - golden light burst */}
        {isOpening && (
          <motion.div
            className="absolute inset-0 z-30 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0] }}
            transition={{ duration: 1.5 }}
            style={{
              background: 'radial-gradient(circle at 50% 50%, hsl(42 85% 55% / 0.3) 0%, transparent 60%)',
            }}
          />
        )}
      </motion.div>

      {/* Floating hint */}
      {!isOpening && (
        <motion.p
          className="text-center mt-10 text-gold/50 text-sm tracking-wider font-serif"
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
