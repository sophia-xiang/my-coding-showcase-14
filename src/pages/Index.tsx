import { Box } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AIWorkflow from "@/components/AIWorkflow";
import LanguageToggle from "@/components/LanguageToggle";
import { useLang } from "@/i18n/LanguageContext";
import { CardContent } from "@/i18n/content";

const tagPalettes = [
  "bg-[hsl(var(--tag-blue))] text-[hsl(var(--tag-blue-foreground))]",
  "bg-[hsl(var(--tag-green))] text-[hsl(var(--tag-green-foreground))]",
  "bg-[hsl(var(--tag-orange))] text-[hsl(var(--tag-orange-foreground))]",
];

/** 卡片配色按 id 固定，切换语言时不跳色 */
const colorById: Record<string, string> = {
  task5: tagPalettes[1],
  task1: tagPalettes[0],
  task2: tagPalettes[1],
  task3: tagPalettes[2],
  task4: tagPalettes[0],
  task6: tagPalettes[2],
  task7: tagPalettes[1],
  task8: tagPalettes[1],
};

const Index = () => {
  const navigate = useNavigate();
  const { t } = useLang();

  const renderCard = (card: CardContent, index: number, delay: number) => (
    <motion.div
      key={card.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      onClick={() => navigate(`/project/${card.id}`)}
      className="group cursor-pointer rounded-xl border border-border bg-card p-6 card-lift"
    >
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
        <span className="text-lg font-bold text-primary">{index + 1}</span>
      </div>
      <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
        {card.title}
      </h3>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed [text-wrap:pretty]">
        {card.summary}
      </p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {card.tags.map((tag) => (
          <span
            key={tag}
            className={`text-xs font-mono px-2 py-0.5 rounded-md ${
              colorById[card.id] ?? tagPalettes[0]
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
      <span className="inline-flex items-center gap-1 text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
        {t.viewDetail} <Box size={14} className="text-blue-500" />
      </span>
    </motion.div>
  );

  return (
    <div className="min-h-screen">
      {/* Personal Info - 深蓝底浅色字 */}
      <section className="relative w-full px-6 md:px-8 pt-20 pb-16 bg-[hsl(221,60%,18%)]">
        <div className="absolute top-5 right-6 md:right-8">
          <LanguageToggle />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center text-white"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{t.name}</h1>
          <p className="text-slate-200 text-lg max-w-lg mx-auto leading-relaxed">{t.tagline}</p>
          <div className="flex flex-wrap justify-center gap-3 mt-5 font-mono text-sm text-slate-300">
            {t.skills.map((s) => (
              <span key={s} className="px-3 py-1 rounded-md bg-white/10">
                {s}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* AI 投研工作流 */}
      <AIWorkflow />

      {/* 机器学习应用 + 策略分析 + 分析结果 */}
      <section className="w-full px-6 md:px-8 py-16 bg-background">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-xl font-semibold mb-6 text-foreground"
        >
          {t.mlHeading}
        </motion.h2>

        <motion.div className="grid gap-5 md:grid-cols-3 mb-12">
          {t.mlProjects.map((card, i) => renderCard(card, i, 0.15 + i * 0.1))}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-xl font-semibold mb-6 text-foreground"
        >
          {t.strategyHeading}
        </motion.h2>

        <motion.div className="grid gap-5 md:grid-cols-3 mb-12">
          {t.strategies.map((card, i) => renderCard(card, i, 0.2 + i * 0.1))}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="text-xl font-semibold mb-8 text-foreground"
        >
          {t.analysisHeading}
        </motion.h2>

        <div className="grid gap-5 md:grid-cols-3">
          {t.projects.map((card, i) => renderCard(card, i, 0.35 + i * 0.1))}
        </div>
      </section>

      <footer className="w-full px-6 md:px-8 py-8 border-t border-border bg-background">
        <p className="text-center text-xs text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-2">
          {t.disclaimer}
        </p>
        <p className="text-center text-sm text-muted-foreground">{t.copyright}</p>
      </footer>
    </div>
  );
};

export default Index;
