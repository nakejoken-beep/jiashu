import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X, Send, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientName: string;
}

const MessageModal = ({ isOpen, onClose, recipientName }: MessageModalProps) => {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!message.trim()) return;
    
    setIsSubmitting(true);
    setError('');

    const { error: submitError } = await supabase
      .from('messages')
      .insert({
        sender_name: recipientName,
        content: message.trim(),
      });

    if (submitError) {
      console.error('Error submitting message:', submitError);
      setError('留言发送失败，请稍后重试');
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
    
    setTimeout(() => {
      setMessage('');
      setIsSubmitted(false);
      onClose();
    }, 2500);
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
            className="absolute inset-0 bg-background/95 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="premium-card w-full max-w-lg relative z-10 overflow-hidden"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Corner ornaments */}
            <div className="corner-ornament top-left" />
            <div className="corner-ornament top-right" />
            <div className="corner-ornament bottom-left" />
            <div className="corner-ornament bottom-right" />

            {/* Close button */}
            <motion.button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded border border-gold/30 hover:bg-gold/10 transition-colors z-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-5 h-5 text-gold" />
            </motion.button>

            <div className="p-10">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    className="text-center py-12"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.2 }}
                      className="w-20 h-20 mx-auto mb-6 rounded-full border-2 border-gold flex items-center justify-center"
                    >
                      <CheckCircle className="w-10 h-10 text-gold" />
                    </motion.div>
                    <h3 className="text-2xl gold-text mb-3 font-serif">
                      留言已送达
                    </h3>
                    <p className="text-muted-foreground font-serif">感谢您对家乡的思念与祝福</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Title */}
                    <div className="text-center mb-10">
                      <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold/40" />
                        <div className="w-1.5 h-1.5 rotate-45 bg-gold/60" />
                        <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold/40" />
                      </div>
                      <h2 className="text-2xl gold-text font-serif">
                        给家乡留言
                      </h2>
                    </div>

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-4 bg-crimson/10 border border-crimson/30 rounded text-crimson text-sm font-serif text-center"
                      >
                        {error}
                      </motion.div>
                    )}

                    {/* Sender info */}
                    <div className="mb-6">
                      <label className="block text-xs text-gold/60 mb-2 tracking-wider font-serif">
                        留言人
                      </label>
                      <div className="p-4 bg-muted/20 border border-gold/20 rounded text-center">
                        <span className="text-foreground font-semibold font-serif">
                          {recipientName}
                        </span>
                      </div>
                    </div>

                    {/* Message textarea */}
                    <div className="mb-8">
                      <label className="block text-xs text-gold/60 mb-2 tracking-wider font-serif">
                        留言内容
                      </label>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="写下您想对家乡说的话..."
                        className="w-full h-36 p-4 bg-muted/20 border border-gold/30 rounded resize-none focus:outline-none focus:border-gold focus:shadow-[0_0_15px_hsl(42_85%_55%_/_0.15)] transition-all text-foreground placeholder:text-muted-foreground/50 font-serif"
                      />
                    </div>

                    {/* Submit button */}
                    <motion.button
                      onClick={handleSubmit}
                      disabled={!message.trim() || isSubmitting}
                      className="elegant-button w-full flex items-center justify-center gap-3"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Send className="w-5 h-5" />
                      <span className="font-serif tracking-wider">
                        {isSubmitting ? '发送中...' : '发送留言'}
                      </span>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MessageModal;
