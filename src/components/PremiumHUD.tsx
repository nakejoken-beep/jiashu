import { motion } from 'framer-motion';

const PremiumHUD = () => {
  return (
    <>
      {/* Top decorative line */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-30 h-px"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <div className="h-full bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      </motion.div>

      {/* Corner ornaments */}
      <motion.div
        className="fixed top-8 left-8 z-30"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <div className="corner-ornament top-left" />
      </motion.div>

      <motion.div
        className="fixed top-8 right-8 z-30"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <div className="corner-ornament top-right" />
      </motion.div>

      <motion.div
        className="fixed bottom-8 left-8 z-30"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        <div className="corner-ornament bottom-left" />
      </motion.div>

      <motion.div
        className="fixed bottom-8 right-8 z-30"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <div className="corner-ornament bottom-right" />
      </motion.div>

      {/* Bottom decorative line */}
      <motion.div
        className="fixed bottom-20 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div className="flex items-center gap-6">
          <div className="w-24 h-px bg-gradient-to-r from-transparent to-gold/40" />
          <div className="w-1.5 h-1.5 rotate-45 bg-gold/60" />
          <div className="w-40 h-px bg-gold/30" />
          <div className="w-1.5 h-1.5 rotate-45 bg-gold/60" />
          <div className="w-24 h-px bg-gradient-to-l from-transparent to-gold/40" />
        </div>
      </motion.div>
    </>
  );
};

export default PremiumHUD;
