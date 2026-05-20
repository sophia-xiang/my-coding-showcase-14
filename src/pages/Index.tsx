import { Box } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

type ShowcaseCard = {
  id: string;
  title: string;
  summary: string;
  tagColor: string;
  tags: string[];
};

const strategies: ShowcaseCard[] = [
  {
    id: "task5",
    title: "股票相对价值策略",
    summary: "基于 AMZN 与 MSFT 构建 Copula 相对价值策略，并进行样本外回测与风险分析",
    tagColor: "bg-[hsl(var(--tag-green))] text-[hsl(var(--tag-green-foreground))]",
    tags: ["相对价值策略", "蒙特卡洛模拟", "GJR-GARCH", "DCC-GARCH", "Copula"],
  },
];

const projects: ShowcaseCard[] = [
  {
    id: "task1",
    title: "行业投资组合的多因子定价模型分析",
    summary: "对比不同因子模型在高科技行业与健康医疗行业的拟合度",
    tagColor: "bg-[hsl(var(--tag-blue))] text-[hsl(var(--tag-blue-foreground))]",
    tags: ["因子模型", "动量效应", "回归分析"],
  },
  {
    id: "task2",
    title: "股票波动率分析",
    summary: "用两种波动率计算方法分析APLD和PSLV的风险特征",
    tagColor: "bg-[hsl(var(--tag-green))] text-[hsl(var(--tag-green-foreground))]",
    tags: ["Parkinson Volatility", "Close-to-close Volatility"],
  },
  {
    id: "task3",
    title: "股票指数的GARCH模型对比分析",
    summary: "用两种GARCH模型分别对纳斯达克和道琼斯指数进行风险特征分析并进行残差自相关性检验",
    tagColor: "bg-[hsl(var(--tag-orange))] text-[hsl(var(--tag-orange-foreground))]",
    tags: ["GARCH", "GJR-GARCH", "非对称效应", "ACF"],
  },
  {
    id: "task4",
    title: "多种投资组合最优策略",
    summary: "通过对六只股票的历史数据进行定量分析，构建了多种优化策略 ，从而对比出最优投资组合策略",
    tagColor: "bg-[hsl(var(--tag-blue))] text-[hsl(var(--tag-blue-foreground))]",
    tags: ["最小方差模型", "最大夏普比率模型", "风险平价模型", "Black-Litterman模型"],
  },
  {
    id: "task6",
    title: "期权定价模型对比分析",
    summary: "通过GBM模型对不同频率的AAPL股票进行路径模拟，以及用Heston模型进行路径模拟和敏感性测试",
    tagColor: "bg-[hsl(var(--tag-orange))] text-[hsl(var(--tag-orange-foreground))]",
    tags: ["几何布朗运动", "Heston模型","敏感性测试"],
  },
];

const Index = () => {
  const navigate = useNavigate();

  const renderCard = (card: ShowcaseCard, index: number, delay: number) => (
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
      <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{card.title}</h3>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{card.summary}</p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {card.tags.map((tag) => (
          <span key={tag} className={`text-xs font-mono px-2 py-0.5 rounded-md ${card.tagColor}`}>
            {tag}
          </span>
        ))}
      </div>
      <span className="inline-flex items-center gap-1 text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
        查看详情 <Box size={14} className="text-blue-500" />
      </span>
    </motion.div>
  );

  return (
    <div className="min-h-screen">
      {/* Personal Info - 深蓝底浅色字 */}
      <section className="w-full px-6 md:px-8 pt-20 pb-16 bg-[hsl(221,60%,18%)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center text-white"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-3">项祎程</h1>
          <p className="text-slate-200 text-lg max-w-lg mx-auto leading-relaxed">
            运用编程工具通过构建模型对公司及行业进行量化分析
          </p>
          <div className="flex justify-center gap-3 mt-5 font-mono text-sm text-slate-300">
            <span className="px-3 py-1 rounded-md bg-white/10">Python</span>
            <span className="px-3 py-1 rounded-md bg-white/10">Matlab</span>
            <span className="px-3 py-1 rounded-md bg-white/10">Cursor</span>
          </div>
        </motion.div>
      </section>

      {/* 策略分析 + 分析结果 */}
      <section className="w-full px-6 md:px-8 py-16 bg-background">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-xl font-semibold mb-6 text-foreground"
        >
          策略分析
        </motion.h2>

        <motion.div className="grid gap-5 md:grid-cols-3 mb-12">
          {strategies.map((card, i) => renderCard(card, i, 0.2 + i * 0.1))}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="text-xl font-semibold mb-8 text-foreground"
        >
          分析结果
        </motion.h2>

        <div className="grid gap-5 md:grid-cols-3">
          {projects.map((card, i) => renderCard(card, i, 0.35 + i * 0.1))}
        </div>
      </section>

      <footer className="w-full px-6 md:px-8 py-8 border-t border-border bg-background">
        <p className="text-center text-sm text-muted-foreground">© 2026 · Built with passion & code</p>
      </footer>
    </div>
  );
};

export default Index;
