import { motion } from "framer-motion";

const skills = [
  { category: "前端", items: ["React", "TypeScript", "Tailwind CSS", "Next.js"] },
  { category: "后端", items: ["Node.js", "Python", "PostgreSQL", "REST API"] },
  { category: "工具", items: ["Git", "Docker", "VS Code", "Linux"] },
];

const AboutSection = () => {
  return (
    <section id="about" className="section-padding">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-mono text-primary text-sm mb-2 tracking-wider">{"// 关于我"}</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-8">个人介绍</h3>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4 text-secondary-foreground leading-relaxed"
          >
            <p>
              我是一名全栈开发者，拥有多年的软件开发经验。
              热爱编程，享受从零到一构建产品的过程。
            </p>
            <p>
              注重代码质量和用户体验，善于将复杂问题拆解为简洁的技术方案。
              持续学习新技术，追求卓越的工程实践。
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {skills.map((group) => (
              <div key={group.category}>
                <h4 className="font-mono text-sm text-muted-foreground mb-2">{group.category}</h4>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-md bg-secondary text-secondary-foreground text-sm font-mono border border-border"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
