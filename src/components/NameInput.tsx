import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

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
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-12 relative z-10"
      >
        <motion.div
          className="inline-block mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold/60" />
            <span className="text-xs tracking-[0.4em] text-gold/70 font-serif">
              乡情寄语
            </span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold/60" />
          </div>
        </motion.div>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-6 font-serif">
          <span className="gold-text">一封</span>
          <span className="text-foreground ml-3">家书</span>
        </h1>
        
        <motion.p
          className="text-muted-foreground text-lg tracking-wide font-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          来自故乡的思念，穿越千山万水
        </motion.p>
        
        <motion.div
          className="decorative-line w-48 mx-auto mt-6"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        />
      </motion.div>

      {/* Input form */}
      <motion.form
        onSubmit={handleSubmit}
        className="premium-card p-10 relative"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        {/* Corner ornaments */}
        <div className="corner-ornament top-left" />
        <div className="corner-ornament top-right" />
        <div className="corner-ornament bottom-left" />
        <div className="corner-ornament bottom-right" />

        <div className="text-center mb-8">
          <p className="text-foreground font-serif text-lg tracking-wide">请输入您的姓名</p>
          <p className="text-sm text-muted-foreground mt-1">开启您的专属家书</p>
        </div>

        <div className="relative mb-8">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="您的姓名"
            className="w-full p-5 bg-muted/30 border border-gold/30 rounded text-center text-xl tracking-wider focus:outline-none focus:border-gold focus:shadow-[0_0_20px_hsl(42_85%_55%_/_0.2)] transition-all text-foreground placeholder:text-muted-foreground/50 font-serif"
            autoFocus
          />
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-gold"
            initial={{ width: 0 }}
            animate={{ width: name ? '100%' : 0 }}
            transition={{ duration: 0.3 }}
            style={{ marginLeft: name ? '-50%' : 0 }}
          />
        </div>

        <motion.button
          type="submit"
          disabled={!name.trim()}
          className="elegant-button w-full flex items-center justify-center gap-3 text-lg"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="font-serif tracking-widest">开始阅读</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </motion.form>

      {/* Bottom decoration */}
      <motion.div
        className="mt-12 flex items-center justify-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold/40" />
        <div className="status-dot" />
        <span className="text-gold/60 text-sm tracking-[0.3em] font-serif">
          家书抵万金
        </span>
        <div className="status-dot" />
        <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold/40" />
      </motion.div>
    </motion.div>
  );
};

export default NameInput;
