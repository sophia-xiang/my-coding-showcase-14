import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Code2, Brain, Globe } from "lucide-react";

const projects = [
  {
    id: "task-platform",
    title: "智能任务管理平台",
    summary: "全栈项目管理工具，支持团队协作与实时同步",
    icon: Code2,
    tagColor: "bg-[hsl(var(--tag-blue))] text-[hsl(var(--tag-blue-foreground))]",
    tags: ["React", "Node.js", "PostgreSQL"],
  },
  {
    id: "ai-analyzer",
    title: "AI 文本分析工具",
    summary: "自然语言处理驱动的文本情感分析与摘要系统",
    icon: Brain,
    tagColor: "bg-[hsl(var(--tag-green))] text-[hsl(var(--tag-green-foreground))]",
    tags: ["Python", "FastAPI", "TensorFlow"],
  },
  {
    id: "blog-system",
    title: "现代化博客系统",
    summary: "支持 Markdown 与代码高亮的高性能博客平台",
    icon: Globe,
    tagColor: "bg-[hsl(var(--tag-orange))] text-[hsl(var(--tag-orange-foreground))]",
    tags: ["Next.js", "TypeScript", "MDX"],
  },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Personal Info */}
      <section className="section-container pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl font-bold text-primary">D</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">你好，我是开发者 👋</h1>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto leading-relaxed">
            全栈工程师 · 热爱用代码解决问题，专注于构建高质量的 Web 应用
          </p>
          <div className="flex justify-center gap-3 mt-5 font-mono text-sm text-muted-foreground">
            <span className="px-3 py-1 rounded-md bg-secondary">React</span>
            <span className="px-3 py-1 rounded-md bg-secondary">TypeScript</span>
            <span className="px-3 py-1 rounded-md bg-secondary">Node.js</span>
            <span className="px-3 py-1 rounded-md bg-secondary">Python</span>
          </div>
        </motion.div>
      </section>

      {/* Divider */}
      <div className="section-container">
        <div className="border-t border-border" />
      </div>

      {/* Project Cards */}
      <section className="section-container py-16">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl font-semibold mb-8"
        >
          编程成果
        </motion.h2>

        <div className="grid gap-5 md:grid-cols-3">
          {projects.map((project, i) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
                onClick={() => navigate(`/project/${project.id}`)}
                className="group cursor-pointer rounded-xl border border-border bg-card p-6 card-lift"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-primary" />
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
                  查看详情 <ArrowRight size={14} />
                </span>
              </motion.div>
            );
          })}
        </div>
      </section>

      <footer className="section-container py-8 border-t border-border">
        <p className="text-center text-sm text-muted-foreground">© 2026 · Built with passion & code</p>
      </footer>
    </div>
  );
};

export default Index;
