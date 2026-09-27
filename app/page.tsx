import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Ventures } from "@/components/sections/Ventures";

export default function Home() {
  return (
    <>
      <About />
      <Ventures />
      <Projects />
      <Experience />
      <Skills />
      <Contact />
    </>
  );
}
