import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleBackground from '@/components/ParticleBackground';
import NameInput from '@/components/NameInput';
import Envelope from '@/components/Envelope';
import Letter from '@/components/Letter';
import MessageModal from '@/components/MessageModal';
import AudioPlayer from '@/components/AudioPlayer';

type Stage = 'name' | 'envelope' | 'letter';

const Index = () => {
  const [stage, setStage] = useState<Stage>('name');
  const [recipientName, setRecipientName] = useState('');
  const [showMessageModal, setShowMessageModal] = useState(false);

  const handleNameSubmit = (name: string) => {
    setRecipientName(name);
    setStage('envelope');
  };

  const handleEnvelopeOpen = () => {
    setStage('letter');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Particle background */}
      <ParticleBackground />

      {/* Ambient glow effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/3 rounded-full blur-3xl" />
      </div>

      {/* Audio player */}
      <AudioPlayer />

      {/* Main content */}
      <main className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <AnimatePresence mode="wait">
          {stage === 'name' && (
            <motion.div
              key="name"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <NameInput onSubmit={handleNameSubmit} />
            </motion.div>
          )}

          {stage === 'envelope' && (
            <motion.div
              key="envelope"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <Envelope recipientName={recipientName} onOpen={handleEnvelopeOpen} />
            </motion.div>
          )}

          {stage === 'letter' && (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Letter
                recipientName={recipientName}
                onLeaveMessage={() => setShowMessageModal(true)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Message modal */}
      <MessageModal
        isOpen={showMessageModal}
        onClose={() => setShowMessageModal(false)}
        recipientName={recipientName}
      />

      {/* Footer branding */}
      <motion.footer
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p className="text-muted-foreground/50 text-xs tracking-wider">
          乡情永系 · 家书抵万金
        </p>
      </motion.footer>
    </div>
  );
};

export default Index;
