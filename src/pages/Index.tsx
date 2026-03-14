import { Box, Github, Mail, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


const projects = [
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
];

const Index = () => {
  const navigate = useNavigate();

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

      {/* Project Cards - 浅底深色字 */}
      <section className="w-full px-6 md:px-8 py-16 bg-background">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl font-semibold mb-8 text-foreground"
        >
          成果展示
        </motion.h2>

        <div className="grid gap-5 md:grid-cols-3">
          {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
                onClick={() => navigate(`/project/${project.id}`)}
                className="group cursor-pointer rounded-xl border border-border bg-card p-6 card-lift"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-lg font-bold text-primary">{i + 1}</span>
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {project.summary}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className={`text-xs font-mono px-2 py-0.5 rounded-md ${project.tagColor}`}>
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  查看详情 < Box  size={14} className="text-blue-500"/>
                </span>
              </motion.div>
          ))}
        </div>
      </section>

      <footer className="w-full px-6 md:px-8 py-8 border-t border-border bg-background">
        <p className="text-center text-sm text-muted-foreground">© 2026 · Built with passion & code</p>
      </footer>
    </div>
  );
};

export default Index;
