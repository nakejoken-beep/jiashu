import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
      rotateY: direction > 0 ? 90 : -90,
      opacity: 0,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      rotateY: direction > 0 ? -90 : 90,
      opacity: 0,
    }),
  };

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Letter paper */}
      <div className="letter-paper p-8 md:p-12 min-h-[500px] relative">
        {/* Header decoration */}
        <div className="absolute top-4 left-4 right-4 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        
        {/* Recipient */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-primary text-sm tracking-widest mb-2">一封家书</p>
          <h1 className="text-2xl md:text-3xl font-serif gold-text">
            致 {recipientName}
          </h1>
        </motion.div>

        {/* Page content */}
        <div className="relative min-h-[300px] perspective-1000">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentPage}
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="text-letter"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <h3 className="text-xl font-serif text-primary mb-6">
                {letterPages[currentPage].title}
              </h3>
              <div className="space-y-4 text-foreground/85 leading-loose text-lg">
                {letterPages[currentPage].content.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Page navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-glass-border">
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className="glass-button flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
            上一页
          </button>

          {/* Page indicator */}
          <div className="flex gap-2">
            {letterPages.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentPage
                    ? 'bg-primary w-6'
                    : 'bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>

          {currentPage < letterPages.length - 1 ? (
            <button onClick={nextPage} className="glass-button flex items-center gap-2">
              下一页
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button onClick={onLeaveMessage} className="gold-button flex items-center gap-2">
              给家乡留言
            </button>
          )}
        </div>

        {/* Footer decoration */}
        <div className="absolute bottom-4 left-4 right-4 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>
    </motion.div>
  );
};

export default Letter;
