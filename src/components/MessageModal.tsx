import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X, Send, Heart, CheckCircle } from 'lucide-react';

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientName: string;
}

const MessageModal = ({ isOpen, onClose, recipientName }: MessageModalProps) => {
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (message.trim()) {
      setIsSubmitted(true);
      // In a real app, this would send to a backend
      setTimeout(() => {
        setMessage('');
        setIsSubmitted(false);
        onClose();
      }, 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="glass-card w-full max-w-lg relative z-10 overflow-hidden"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Header glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-secondary/50 hover:bg-secondary transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>

            <div className="p-8">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    className="text-center py-8"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.2 }}
                      className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center"
                    >
                      <CheckCircle className="w-10 h-10 text-primary" />
                    </motion.div>
                    <h3 className="text-2xl font-serif gold-text mb-2">留言已送达</h3>
                    <p className="text-muted-foreground">感谢您对家乡的思念与祝福</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Title */}
                    <div className="text-center mb-6">
                      <Heart className="w-8 h-8 text-primary mx-auto mb-3" />
                      <h2 className="text-2xl font-serif gold-text mb-2">给家乡留言</h2>
                      <p className="text-muted-foreground text-sm">
                        写下您对家乡的思念与祝福
                      </p>
                    </div>

                    {/* Sender info */}
                    <div className="mb-4">
                      <label className="block text-sm text-muted-foreground mb-2">
                        来自
                      </label>
                      <div className="glass-button text-center cursor-default">
                        {recipientName}
                      </div>
                    </div>

                    {/* Message textarea */}
                    <div className="mb-6">
                      <label className="block text-sm text-muted-foreground mb-2">
                        留言内容
                      </label>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="写下您想对家乡说的话..."
                        className="w-full h-40 p-4 bg-secondary/50 border border-glass-border rounded-xl resize-none focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder:text-muted-foreground/50"
                      />
                    </div>

                    {/* Submit button */}
                    <button
                      onClick={handleSubmit}
                      disabled={!message.trim()}
                      className="gold-button w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      <Send className="w-5 h-5" />
                      发送留言
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MessageModal;
