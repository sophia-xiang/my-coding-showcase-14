import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between px-6 md:px-12 lg:px-24 h-14">
          <span className="font-mono text-primary text-sm font-semibold">{"<Dev />"}</span>
          <div className="flex gap-6 font-mono text-sm text-muted-foreground">
            <a href="#about" className="hover:text-primary transition-colors">关于</a>
            <a href="#projects" className="hover:text-primary transition-colors">项目</a>
          </div>
        </div>
      </nav>

      <HeroSection />
      <AboutSection />
      <ProjectsSection />

      <footer className="section-padding py-10 border-t border-border">
        <p className="text-center text-sm text-muted-foreground font-mono">
          © 2026 · Built with passion & code
        </p>
      </footer>
    </div>
  );
};

export default Index;
