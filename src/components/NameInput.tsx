import { motion } from 'framer-motion';
import { useState } from 'react';
import { User, ArrowRight } from 'lucide-react';

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
      className="w-full max-w-md mx-auto text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-serif gold-text mb-4">
          一封家书
        </h1>
        <p className="text-muted-foreground text-lg">
          来自故乡的思念，穿越千山万水
        </p>
      </motion.div>

      {/* Input form */}
      <motion.form
        onSubmit={handleSubmit}
        className="glass-card p-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
            <User className="w-6 h-6 text-primary" />
          </div>
          <div className="text-left">
            <p className="text-foreground font-medium">请输入您的姓名</p>
            <p className="text-sm text-muted-foreground">用于生成专属家书</p>
          </div>
        </div>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="例如：张三"
          className="w-full p-4 bg-secondary/50 border border-glass-border rounded-xl text-center text-xl font-serif focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder:text-muted-foreground/50 mb-6"
          autoFocus
        />

        <button
          type="submit"
          disabled={!name.trim()}
          className="gold-button w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          开始阅读
          <ArrowRight className="w-5 h-5" />
        </button>
      </motion.form>

      {/* Decorative element */}
      <motion.div
        className="mt-12 flex items-center justify-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="w-16 h-px bg-gradient-to-r from-transparent to-primary/50" />
        <span className="text-primary text-sm tracking-widest">乡情永系</span>
        <div className="w-16 h-px bg-gradient-to-l from-transparent to-primary/50" />
      </motion.div>
    </motion.div>
  );
};

export default NameInput;
