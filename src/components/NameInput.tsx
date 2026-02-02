import { motion } from 'framer-motion';
import { useState } from 'react';
import { User, ArrowRight, Hexagon } from 'lucide-react';

interface NameInputProps {
  onSubmit: (name: string) => void;
}

const NameInput = ({ onSubmit }: NameInputProps) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  return (
    <motion.div
      className="w-full max-w-lg mx-auto text-center relative"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Decorative hexagons */}
      <motion.div
        className="absolute -top-20 left-1/2 -translate-x-1/2"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <Hexagon className="w-32 h-32 text-primary/10" strokeWidth={0.5} />
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-12 relative z-10"
      >
        <motion.div
          className="inline-block mb-4 px-4 py-1 border border-primary/30 rounded-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-xs font-mono tracking-widest text-primary/70">
            ◈ HOMETOWN LETTER SYSTEM ◈
          </span>
        </motion.div>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{ fontFamily: 'Orbitron, monospace' }}>
          <span className="cyber-text">一封</span>
          <span className="gold-text ml-2">家书</span>
        </h1>
        
        <motion.p
          className="text-muted-foreground text-lg tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          来自故乡的思念，穿越千山万水
        </motion.p>
        
        <motion.div
          className="flex justify-center gap-1 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-8 h-1 bg-primary/30 rounded-full"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Input form */}
      <motion.form
        onSubmit={handleSubmit}
        className="cyber-card p-8 relative"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        {/* HUD corners */}
        <div className="hud-corner top-left" />
        <div className="hud-corner top-right" />
        <div className="hud-corner bottom-left" />
        <div className="hud-corner bottom-right" />

        <div className="flex items-center gap-4 mb-8">
          <motion.div
            className="w-14 h-14 rounded-lg border border-primary/50 flex items-center justify-center"
            animate={{ boxShadow: ['0 0 20px hsl(185 100% 50% / 0.2)', '0 0 40px hsl(185 100% 50% / 0.4)', '0 0 20px hsl(185 100% 50% / 0.2)'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <User className="w-7 h-7 text-primary" />
          </motion.div>
          <div className="text-left">
            <p className="text-foreground font-semibold text-lg tracking-wide">身份认证</p>
            <p className="text-sm text-muted-foreground font-mono">ENTER YOUR IDENTITY</p>
          </div>
        </div>

        <div className="relative mb-8">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="请输入您的姓名"
            className="w-full p-5 bg-muted/50 border-2 border-primary/30 rounded-lg text-center text-xl tracking-wider focus:outline-none focus:border-primary focus:shadow-[0_0_30px_hsl(185_100%_50%_/_0.3)] transition-all text-foreground placeholder:text-muted-foreground/50"
            style={{ fontFamily: 'Noto Serif SC, serif' }}
            autoFocus
          />
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: name ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <motion.button
          type="submit"
          disabled={!name.trim()}
          className="gold-neon-button w-full flex items-center justify-center gap-3"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span style={{ fontFamily: 'Orbitron, monospace' }}>开始阅读</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>

        <motion.p
          className="mt-6 text-xs text-muted-foreground font-mono tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1 }}
        >
          ▸ SECURE CONNECTION ESTABLISHED ◂
        </motion.p>
      </motion.form>

      {/* Bottom decoration */}
      <motion.div
        className="mt-10 flex items-center justify-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="w-20 h-px bg-gradient-to-r from-transparent to-primary/50" />
        <motion.span
          className="text-primary text-sm tracking-[0.3em] font-mono"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          乡情永系
        </motion.span>
        <div className="w-20 h-px bg-gradient-to-l from-transparent to-primary/50" />
      </motion.div>
    </motion.div>
  );
};

export default NameInput;
