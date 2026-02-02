import { motion } from 'framer-motion';
import { useState } from 'react';
import { Hexagon } from 'lucide-react';

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
      {/* Outer glow ring */}
      <motion.div
        className="absolute inset-0 -m-8 rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(185 100% 50% / 0.1) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Envelope body */}
      <motion.div
        className="envelope relative w-full aspect-[4/3] rounded-2xl overflow-hidden"
        initial={{ scale: 0.8, opacity: 0, rotateY: -20 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        style={{ perspective: '1000px' }}
      >
        {/* Circuit pattern overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(90deg, hsl(185 100% 50% / 0.3) 1px, transparent 1px),
              linear-gradient(hsl(185 100% 50% / 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
          }}
        />

        {/* Inner border glow */}
        <motion.div
          className="absolute inset-3 border border-primary/30 rounded-xl"
          animate={{
            boxShadow: ['inset 0 0 20px hsl(185 100% 50% / 0.1)', 'inset 0 0 40px hsl(185 100% 50% / 0.2)', 'inset 0 0 20px hsl(185 100% 50% / 0.1)'],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Decorative corners */}
        <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-primary/40 rounded-tl-lg" />
        <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-primary/40 rounded-tr-lg" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-primary/40 rounded-bl-lg" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-primary/40 rounded-br-lg" />

        {/* Top flap with 3D transform */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-1/2 origin-top z-10"
          style={{
            background: 'linear-gradient(180deg, hsl(220 35% 14%) 0%, hsl(220 38% 10%) 100%)',
            clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
          }}
          animate={isOpening ? { rotateX: -180, opacity: 0 } : {}}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        >
          {/* Flap edge glow */}
          <div 
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px"
            style={{
              background: 'linear-gradient(90deg, transparent, hsl(185 100% 50% / 0.5), transparent)',
            }}
          />
        </motion.div>

        {/* Seal button */}
        <motion.button
          onClick={handleOpen}
          disabled={isOpening}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={isOpening ? { scale: 0, opacity: 0, rotate: 180 } : {}}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="relative"
            animate={{
              boxShadow: ['0 0 30px hsl(42 100% 50% / 0.4)', '0 0 60px hsl(42 100% 50% / 0.6)', '0 0 30px hsl(42 100% 50% / 0.4)'],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="seal w-24 h-24 rounded-full flex items-center justify-center cursor-pointer relative">
              {/* Inner ring */}
              <div className="absolute inset-2 border-2 border-primary-foreground/30 rounded-full" />
              
              {/* Hexagon icon */}
              <Hexagon className="w-8 h-8 text-primary-foreground/80 absolute" />
              
              {/* Text */}
              <span 
                className="text-primary-foreground text-sm font-bold tracking-widest relative z-10"
                style={{ fontFamily: 'Orbitron, monospace' }}
              >
                拆封
              </span>
            </div>
          </motion.div>
        </motion.button>

        {/* Recipient label */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-8 h-px bg-primary/50" />
            <span className="text-primary/70 text-xs tracking-widest font-mono">TO</span>
            <div className="w-8 h-px bg-primary/50" />
          </div>
          <h2 
            className="text-3xl gold-text font-bold mb-2"
            style={{ fontFamily: 'Noto Serif SC, serif' }}
          >
            {recipientName}
          </h2>
          <p className="text-muted-foreground text-sm tracking-widest">的一封家书</p>
        </motion.div>

        {/* Opening animation - light burst */}
        {isOpening && (
          <motion.div
            className="absolute inset-0 z-30 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5 }}
            style={{
              background: 'radial-gradient(circle at 50% 50%, hsl(185 100% 50% / 0.3) 0%, transparent 70%)',
            }}
          />
        )}
      </motion.div>

      {/* Floating hint */}
      {!isOpening && (
        <motion.p
          className="text-center mt-10 text-muted-foreground text-sm font-mono tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ▸ 点击印章拆封 ◂
        </motion.p>
      )}
    </div>
  );
};

export default Envelope;
