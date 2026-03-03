import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Github, ExternalLink, Code2, Brain, Globe } from "lucide-react";

const projectData: Record<string, {
  title: string;
  icon: typeof Code2;
  description: string[];
  tech: string[];
  features: string[];
  github: string;
  demo: string;
}> = {
  "task-platform": {
    title: "智能任务管理平台",
    icon: Code2,
    description: [
      "这是一个基于 React 和 Node.js 的全栈项目管理工具，旨在帮助团队高效协作。",
      "项目采用 WebSocket 实现实时数据同步，使用 PostgreSQL 作为数据存储，支持复杂的任务依赖关系和进度追踪。",
    ],
    tech: ["React", "Node.js", "PostgreSQL", "WebSocket", "Docker", "Redis"],
    features: [
      "拖拽式看板管理，支持多种视图切换",
      "实时多人协作编辑与通知推送",
      "任务依赖关系可视化与关键路径分析",
      "自动化工作流与定时任务调度",
    ],
    github: "https://github.com",
    demo: "#",
  },
  "ai-analyzer": {
    title: "AI 文本分析工具",
    icon: Brain,
    description: [
      "利用深度学习模型实现中英文文本的情感分析、关键词提取和自动摘要功能。",
      "后端采用 FastAPI 构建高性能 API，前端使用 React 实现交互式分析界面。",
    ],
    tech: ["Python", "FastAPI", "React", "TensorFlow", "BERT", "Docker"],
    features: [
      "支持中英文多语言情感分析",
      "基于 TF-IDF 和 TextRank 的关键词提取",
      "利用预训练模型生成文本摘要",
      "批量文件上传与分析结果导出",
    ],
    github: "https://github.com",
    demo: "#",
  },
  "blog-system": {
    title: "现代化博客系统",
    icon: Globe,
    description: [
      "一个高性能的现代化博客平台，支持 Markdown 和 MDX 编写，具有出色的 SEO 表现。",
      "采用 Next.js 静态生成实现极速加载，支持代码高亮、数学公式渲染等开发者友好特性。",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "MDX", "Vercel"],
    features: [
      "Markdown / MDX 编辑与实时预览",
      "代码块语法高亮与一键复制",
      "自动生成目录与文章导航",
      "RSS 订阅与 SEO 优化",
    ],
    github: "https://github.com",
    demo: "#",
  },
};

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = id ? projectData[id] : null;

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">项目未找到</p>
      </div>
    );
  }

  const Icon = project.icon;

  return (
    <div className="min-h-screen bg-background">
      <div className="section-container pt-10 pb-20">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
        >
          <ArrowLeft size={16} /> 返回首页
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icon size={24} className="text-primary" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold">{project.title}</h1>
          </div>

          {/* Description */}
          <div className="space-y-3 text-muted-foreground leading-relaxed mb-8 max-w-2xl">
            {project.description.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-3 mb-10">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <Github size={16} /> 查看源码
            </a>
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-secondary transition-colors"
            >
              <ExternalLink size={16} /> 在线演示
            </a>
          </div>

          {/* Tech & Features grid */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">技术栈</h2>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-sm font-mono">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">核心功能</h2>
              <ul className="space-y-2.5">
                {project.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail;
