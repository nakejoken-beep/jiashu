import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CyberBackground from '@/components/CyberBackground';
import HUDElements from '@/components/HUDElements';
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
      {/* 3D Cyber Background */}
      <CyberBackground />

      {/* HUD Elements */}
      <HUDElements />

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
              exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
              transition={{ duration: 0.5 }}
            >
              <NameInput onSubmit={handleNameSubmit} />
            </motion.div>
          )}

          {stage === 'envelope' && (
            <motion.div
              key="envelope"
              initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 1.2, filter: 'blur(10px)' }}
              transition={{ duration: 0.6 }}
            >
              <Envelope recipientName={recipientName} onOpen={handleEnvelopeOpen} />
            </motion.div>
          )}

          {stage === 'letter' && (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
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
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <p className="text-muted-foreground/50 text-xs tracking-[0.3em] font-mono uppercase">
            乡情永系 · 家书抵万金
          </p>
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
        </div>
      </motion.footer>
    </div>
  );
};

export default Index;
