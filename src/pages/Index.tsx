import React from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Experience from "../components/Experience";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Achievements from "../components/Achievements";
import Contact from "../components/Contact";
import MatrixBackground from "../components/MatrixBackground";
import SideNav from "../components/SideNav";
import CustomCursor from "../components/CustomCursor";
import ParallaxDivider from "../components/ParallaxDivider";
import ParallaxWrapper from "../components/ParallaxWrapper";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative transition-colors duration-300">
      <MatrixBackground />
      <CustomCursor />
      <SideNav />
      <div className="relative z-10">
        <Hero />
        <ParallaxDivider speed={0.3} variant="gold" />
        <section id="about" className="min-h-screen flex items-center justify-center py-16">
          <ParallaxWrapper offset={40} className="w-full">
            <About />
          </ParallaxWrapper>
        </section>
        <ParallaxDivider speed={0.2} variant="teal" />
        <section id="experience" className="min-h-screen flex items-center justify-center py-16">
          <ParallaxWrapper offset={60} className="w-full">
            <Experience />
          </ParallaxWrapper>
        </section>
        <ParallaxDivider speed={0.35} variant="purple" />
        <section id="projects" className="min-h-screen flex items-center justify-center py-16">
          <ParallaxWrapper offset={50} className="w-full">
            <Projects />
          </ParallaxWrapper>
        </section>
        <ParallaxDivider speed={0.25} variant="gold" />
        <section id="achievements" className="min-h-screen flex items-center justify-center py-16">
          <ParallaxWrapper offset={45} className="w-full">
            <Achievements />
          </ParallaxWrapper>
        </section>
        <ParallaxDivider speed={0.2} variant="teal" />
        <section id="contact" className="min-h-screen flex items-center justify-center py-16">
          <ParallaxWrapper offset={30} className="w-full">
            <Contact />
          </ParallaxWrapper>
        </section>
      </div>
    </div>
  );
};

export default Index;
