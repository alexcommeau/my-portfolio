import { AboutTabProvider } from "@/components/portfolio/ui-context";
import { Navbar } from "@/components/portfolio/navbar";
import { Hero } from "@/components/portfolio/hero/hero";
import { About } from "@/components/portfolio/about";
import { Projects } from "@/components/portfolio/projects";
import { Skills } from "@/components/portfolio/skills";
import { Experience } from "@/components/portfolio/experience";
import { Education } from "@/components/portfolio/education";
import { Contact } from "@/components/portfolio/contact";
import { Footer } from "@/components/portfolio/footer";

export default function Home() {
  return (
    <AboutTabProvider>
      <div className="relative min-h-screen overflow-x-clip bg-zinc-950 text-zinc-200">
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{
            backgroundImage: "url('/images/glowing-molecular.jpg')",
            filter: "blur(2px)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Education />
        <Contact />
        <Footer />
      </div>
    </AboutTabProvider>
  );
}
