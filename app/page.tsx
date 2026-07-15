import { AboutTabProvider } from "@/components/portfolio/ui-context";
import { Navbar } from "@/components/portfolio/navbar";
import { Hero } from "@/components/portfolio/hero";
import { About } from "@/components/portfolio/about";
import { Skills } from "@/components/portfolio/skills";
import { Experience } from "@/components/portfolio/experience";
import { Projects } from "@/components/portfolio/projects";
import { Education } from "@/components/portfolio/education";
import { Blog } from "@/components/portfolio/blog";
import { Contact } from "@/components/portfolio/contact";
import { Footer } from "@/components/portfolio/footer";

export default function Home() {
  return (
    <AboutTabProvider>
      <div className="relative min-h-screen overflow-x-clip bg-zinc-950 text-zinc-200">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Blog />
        <Contact />
        <Footer />
      </div>
    </AboutTabProvider>
  );
}
