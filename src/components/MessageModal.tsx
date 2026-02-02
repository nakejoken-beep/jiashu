import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X, Send, Heart, CheckCircle, Hexagon } from 'lucide-react';

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
      setTimeout(() => {
        setMessage('');
        setIsSubmitted(false);
        onClose();
      }, 2500);
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
            className="absolute inset-0 bg-background/90 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="cyber-card w-full max-w-lg relative z-10 overflow-hidden"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* HUD corners */}
            <div className="hud-corner top-left" />
            <div className="hud-corner top-right" />
            <div className="hud-corner bottom-left" />
            <div className="hud-corner bottom-right" />

            {/* Close button */}
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-lg border border-primary/30 hover:bg-primary/20 transition-colors z-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-5 h-5 text-primary" />
            </motion.button>

            <div className="p-8">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    className="text-center py-10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', delay: 0.2 }}
                      className="w-24 h-24 mx-auto mb-6 rounded-full border-2 border-primary flex items-center justify-center"
                      style={{
                        boxShadow: '0 0 40px hsl(185 100% 50% / 0.4)',
                      }}
                    >
                      <CheckCircle className="w-12 h-12 text-primary" />
                    </motion.div>
                    <h3 className="text-2xl cyber-text mb-3" style={{ fontFamily: 'Orbitron, monospace' }}>
                      留言已送达
                    </h3>
                    <p className="text-muted-foreground">感谢您对家乡的思念与祝福</p>
                    
                    {/* Success animation particles */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-primary rounded-full"
                          initial={{ 
                            x: '50%', 
                            y: '40%',
                            opacity: 1,
                          }}
                          animate={{ 
                            x: `${50 + (Math.random() - 0.5) * 100}%`,
                            y: `${40 + (Math.random() - 0.5) * 80}%`,
                            opacity: 0,
                            scale: 0,
                          }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                        />
                      ))}
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Title */}
                    <div className="text-center mb-8">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                        className="inline-block mb-4"
                      >
                        <Hexagon className="w-12 h-12 text-primary/50" strokeWidth={1} />
                      </motion.div>
                      <h2 className="text-2xl cyber-text mb-2" style={{ fontFamily: 'Orbitron, monospace' }}>
                        给家乡留言
                      </h2>
                      <p className="text-muted-foreground text-sm font-mono">
                        LEAVE A MESSAGE FOR HOMETOWN
                      </p>
                    </div>

                    {/* Sender info */}
                    <div className="mb-6">
                      <label className="block text-xs text-primary/70 mb-2 font-mono tracking-wider">
                        SENDER
                      </label>
                      <div className="p-4 bg-muted/30 border border-primary/20 rounded-lg text-center">
                        <span className="text-foreground font-semibold" style={{ fontFamily: 'Noto Serif SC, serif' }}>
                          {recipientName}
                        </span>
                      </div>
                    </div>

                    {/* Message textarea */}
                    <div className="mb-6">
                      <label className="block text-xs text-primary/70 mb-2 font-mono tracking-wider">
                        MESSAGE CONTENT
                      </label>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="写下您想对家乡说的话..."
                        className="w-full h-36 p-4 bg-muted/30 border-2 border-primary/30 rounded-lg resize-none focus:outline-none focus:border-primary focus:shadow-[0_0_30px_hsl(185_100%_50%_/_0.2)] transition-all text-foreground placeholder:text-muted-foreground/50"
                        style={{ fontFamily: 'Noto Serif SC, serif' }}
                      />
                    </div>

                    {/* Submit button */}
                    <motion.button
                      onClick={handleSubmit}
                      disabled={!message.trim()}
                      className="gold-neon-button w-full flex items-center justify-center gap-3"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Send className="w-5 h-5" />
                      <span className="font-mono">发送留言</span>
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
