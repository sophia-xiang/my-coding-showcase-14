import { motion } from "framer-motion";
import { Github, Mail, ExternalLink } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="section-padding min-h-screen flex flex-col justify-center relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-3xl"
      >
        <p className="font-mono text-primary text-sm mb-4 tracking-wider">
          {"// Hello World"}
        </p>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
          我是 <span className="text-gradient">开发者</span>
        </h1>
        <p className="text-lg md:text-xl text-secondary-foreground leading-relaxed max-w-2xl mb-8">
          热衷于用代码构建优雅的解决方案。专注于全栈开发，擅长将想法转化为高质量的产品。
        </p>
        <div className="flex gap-4">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity glow">
            <Github size={18} />
            GitHub
          </a>
          <a href="mailto:hello@example.com"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-border text-foreground font-medium text-sm card-hover">
            <Mail size={18} />
            联系我
          </a>
        </div>
      </motion.div>

      {/* Terminal decoration */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="hidden lg:block absolute right-12 xl:right-24 top-1/2 -translate-y-1/2 w-96"
      >
        <div className="rounded-lg border border-border bg-card p-4 font-mono text-sm">
          <div className="flex gap-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-destructive/60" />
            <div className="w-3 h-3 rounded-full bg-accent/60" />
            <div className="w-3 h-3 rounded-full bg-primary/60" />
          </div>
          <div className="space-y-1 text-muted-foreground">
            <p><span className="text-primary">const</span> developer = {"{"}</p>
            <p className="pl-4">name: <span className="text-primary/70">"开发者"</span>,</p>
            <p className="pl-4">skills: <span className="text-primary/70">["React", "TypeScript", "Node.js"]</span>,</p>
            <p className="pl-4">passion: <span className="text-primary/70">"Building things"</span>,</p>
            <p>{"}"}</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
