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
    setTimeout(onOpen, 1500);
  };

  return (
    <div className="relative w-full max-w-md mx-auto perspective-1000">
      {/* Envelope body */}
      <motion.div
        className="envelope relative w-full aspect-[4/3] rounded-2xl overflow-hidden"
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Inner shadow for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
        
        {/* Decorative pattern */}
        <div className="absolute inset-4 border border-primary/20 rounded-xl" />
        <div className="absolute inset-6 border border-primary/10 rounded-lg" />
        
        {/* Top flap */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-1/2 origin-top"
          style={{
            background: 'linear-gradient(180deg, hsl(220 25% 18%) 0%, hsl(220 28% 14%) 100%)',
            clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            transformStyle: 'preserve-3d',
          }}
          animate={isOpening ? { rotateX: -180 } : {}}
          transition={{ duration: 1, ease: 'easeInOut' }}
        >
          {/* Flap shadow */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, transparent 0%, hsl(220 30% 8% / 0.3) 100%)',
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            }}
          />
        </motion.div>

        {/* Seal */}
        <motion.button
          onClick={handleOpen}
          disabled={isOpening}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={isOpening ? { scale: 0, opacity: 0 } : {}}
          transition={{ duration: 0.3 }}
        >
          <div className="seal w-20 h-20 rounded-full flex items-center justify-center animate-glow cursor-pointer">
            <div className="text-primary-foreground font-serif text-sm font-bold tracking-wider">
              拆封
            </div>
          </div>
        </motion.button>

        {/* Recipient label */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-muted-foreground text-sm mb-1">致</p>
          <h2 className="text-2xl font-serif gold-text font-medium">
            {recipientName}
          </h2>
          <p className="text-muted-foreground text-sm mt-1">的一封家书</p>
        </motion.div>
      </motion.div>

      {/* Floating hint */}
      {!isOpening && (
        <motion.p
          className="text-center mt-8 text-muted-foreground text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          点击印章拆封
        </motion.p>
      )}
    </div>
  );
};

export default Envelope;
