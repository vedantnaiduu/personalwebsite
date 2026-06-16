import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { PostcardWall } from "@/components/sections/PostcardWall";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 pb-20 sm:px-6 lg:px-8">
        <Projects />
        <Experience />
        <About />
        <Skills />
        <PostcardWall />
        <Contact />
      </div>
    </>
  );
}
