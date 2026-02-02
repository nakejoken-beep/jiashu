import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';

interface LetterProps {
  recipientName: string;
  onLeaveMessage: () => void;
}

const letterPages = [
  {
    title: '亲爱的游子',
    content: `故乡的月光，依然照在老屋的青瓦上。院子里的老槐树，今年又开了满树的白花，香气弥漫了整个村庄。

每当夜深人静，我们总会想起你。想起你小时候在巷子里奔跑的身影，想起你在田埂上捉蜻蜓的欢笑。

时光流转，你已远行万里，但故乡的根，永远在这里等你。`,
  },
  {
    title: '家乡的变化',
    content: `这些年，家乡变化很大。老街翻新了，但保留了那些承载记忆的老招牌。新修的公路直通村口，回家的路更近了。

村里的年轻人也开始回来了，带着外面的见识和梦想。老手艺得到了传承，新产业也蓬勃发展。

你的名字，刻在了村口的功德碑上。大家都说，是你们这些在外打拼的儿女，让家乡更有底气。`,
  },
  {
    title: '等你回家',
    content: `无论你走得多远，家乡的灯火始终为你点亮。这里有熟悉的乡音，有记忆中的味道，有永远敞开的家门。

春节快到了，腊肉已经挂上了房梁，米酒正在缸里发酵。母亲早早备好了你爱吃的菜，只等你推开那扇门。

归来吧，游子。家乡永远是你最温暖的港湾。

此致，敬礼
故乡`,
  },
];

const Letter = ({ recipientName, onLeaveMessage }: LetterProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextPage = () => {
    if (currentPage < letterPages.length - 1) {
      setDirection(1);
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setDirection(-1);
      setCurrentPage(currentPage - 1);
    }
  };

  const pageVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <motion.div
      className="w-full max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 100, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Letter paper */}
      <div className="letter-paper p-8 md:p-12 min-h-[550px] relative">
        {/* HUD corners */}
        <div className="hud-corner top-left" />
        <div className="hud-corner top-right" />
        <div className="hud-corner bottom-left" />
        <div className="hud-corner bottom-right" />

        {/* Top decoration */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, hsl(185 100% 50%), transparent)',
          }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="inline-block mb-3 px-4 py-1 border border-primary/30 rounded-full">
            <span className="text-xs font-mono tracking-widest text-primary/70">
              ◈ HOMETOWN LETTER ◈
            </span>
          </div>
          <h1 
            className="text-3xl md:text-4xl gold-text font-bold"
            style={{ fontFamily: 'Noto Serif SC, serif' }}
          >
            致 {recipientName}
          </h1>
        </motion.div>

        {/* Page content */}
        <div className="relative min-h-[300px] overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentPage}
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="text-letter"
            >
              <h3 
                className="text-2xl cyber-text mb-6"
                style={{ fontFamily: 'Noto Serif SC, serif', textShadow: '0 0 10px hsl(185 100% 50% / 0.5)' }}
              >
                {letterPages[currentPage].title}
              </h3>
              <div className="space-y-5 text-foreground/85 leading-loose text-lg">
                {letterPages[currentPage].content.split('\n\n').map((paragraph, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-primary/20">
          <motion.button
            onClick={prevPage}
            disabled={currentPage === 0}
            className="neon-button flex items-center gap-2 px-6 py-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-mono text-sm">上一页</span>
          </motion.button>

          {/* Page indicator */}
          <div className="flex gap-3">
            {letterPages.map((_, index) => (
              <motion.div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentPage
                    ? 'w-8 bg-primary shadow-[0_0_10px_hsl(185_100%_50%)]'
                    : 'w-2 bg-muted-foreground/30'
                }`}
                animate={index === currentPage ? { 
                  boxShadow: ['0 0 10px hsl(185 100% 50% / 0.5)', '0 0 20px hsl(185 100% 50% / 0.8)', '0 0 10px hsl(185 100% 50% / 0.5)']
                } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            ))}
          </div>

          {currentPage < letterPages.length - 1 ? (
            <motion.button
              onClick={nextPage}
              className="neon-button flex items-center gap-2 px-6 py-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="font-mono text-sm">下一页</span>
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          ) : (
            <motion.button
              onClick={onLeaveMessage}
              className="gold-neon-button flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageSquare className="w-5 h-5" />
              <span className="font-mono text-sm">给家乡留言</span>
            </motion.button>
          )}
        </div>

        {/* Bottom decoration */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, hsl(185 100% 50% / 0.5), transparent)',
          }}
        />
      </div>
    </motion.div>
  );
};

export default Letter;
