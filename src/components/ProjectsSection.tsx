import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "智能任务管理平台",
    description: "基于 React + Node.js 的全栈项目管理工具，支持团队协作、实时同步和数据可视化。",
    tech: ["React", "Node.js", "PostgreSQL", "WebSocket"],
    github: "#",
    demo: "#",
  },
  {
    title: "AI 文本分析工具",
    description: "利用自然语言处理技术，实现文本情感分析、关键词提取和自动摘要功能。",
    tech: ["Python", "FastAPI", "React", "TensorFlow"],
    github: "#",
    demo: "#",
  },
  {
    title: "个人博客系统",
    description: "支持 Markdown 编辑、代码高亮、暗色模式的现代化博客平台，具有优秀的 SEO 性能。",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "MDX"],
    github: "#",
    demo: "#",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="section-padding">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-mono text-primary text-sm mb-2 tracking-wider">{"// 项目作品"}</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-10">精选项目</h3>
        </motion.div>

        <div className="grid gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-lg border border-border bg-card p-6 md:p-8 card-hover"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <h4 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-secondary-foreground text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="font-mono text-xs text-primary/80 bg-primary/10 px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3 md:mt-1">
                  <a href={project.github} className="text-muted-foreground hover:text-primary transition-colors">
                    <Github size={20} />
                  </a>
                  <a href={project.demo} className="text-muted-foreground hover:text-primary transition-colors">
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
