import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { User, GraduationCap, Code2, Briefcase, BookOpen } from 'lucide-react';

const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 } }
};

const slideUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const About = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 relative z-10 overflow-hidden">
      <h2 className="section-heading">
        <span className="text-[#c8a97e] font-mono text-2xl mr-2">01.</span> About Me
      </h2>

      <motion.div
        variants={slideUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="glass-card"
      >
        {/* Content */}
        <div className="p-2 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div 
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col gap-8"
            >
              {/* Text Content */}
              <div>
                <p className="text-white/100 leading-relaxed text-lg">
                  I'm a passionate Chemical Engineering student at IIT Patna, focused on building innovative tech solutions. 
                  My journey in technology has been driven by a deep curiosity for how things work and a desire to create 
                  meaningful impact through code.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="p-3 rounded-xl bg-[#c8a97e]/10 border border-[#c8a97e]/10 shrink-0" style={{ transition: 'border-color 0.3s ease' }}>
                    <GraduationCap className="w-6 h-6 text-[#c8a97e]/70" />
                  </div>
                  <div>
                    <h3 className="text-white/90 font-bold text-lg">Education</h3>
                    <p className="text-white/60">B.Tech in Chemical Engineering</p>
                    <p className="text-[#c8a97e]/60 text-sm mt-1 font-medium">Indian Institute of Technology Patna | 2023-2027</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="p-3 rounded-xl bg-[#c8a97e]/10 border border-[#c8a97e]/10 shrink-0" style={{ transition: 'border-color 0.3s ease' }}>
                    <Code2 className="w-6 h-6 text-[#c8a97e]/70" />
                  </div>
                  <div>
                    <h3 className="text-white/90 font-bold text-lg">Technical Focus</h3>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {['Full Stack Development', 'Machine Learning', 'Data Processing', 'DevOps'].map((skill) => (
                        <span key={skill} className="px-4 py-1.5 bg-white/[0.04] text-[#c8a97e]/70 rounded-full text-xs font-medium border border-white/10 cursor-default" style={{ transition: 'background 0.3s ease' }}>{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="p-3 rounded-xl bg-[#c8a97e]/10 border border-[#c8a97e]/10 shrink-0" style={{ transition: 'border-color 0.3s ease' }}>
                    <Briefcase className="w-6 h-6 text-[#c8a97e]/70" />
                  </div>
                  <div>
                    <h3 className="text-white/90 font-bold text-lg">Experience</h3>
                    <p className="text-white/60">Lead Full Stack Developer</p>
                    <p className="text-[#c8a97e]/60 text-sm mt-1 font-medium">IIT Patna Official Website | Jan 2026 - Present</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="p-3 rounded-xl bg-[#c8a97e]/10 border border-[#c8a97e]/10 shrink-0" style={{ transition: 'border-color 0.3s ease' }}>
                    <BookOpen className="w-6 h-6 text-[#c8a97e]/70" />
                  </div>
                  <div>
                    <h3 className="text-white/90 font-bold text-lg">Key Projects</h3>
                    <p className="text-white/60">Velora - Market Intel Platform</p>
                    <p className="text-[#c8a97e]/60 text-sm mt-1 font-medium">Nov 2025 - Dec 2025</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative flex items-center justify-center h-full group perspective-1000"
            >
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden glass-card p-2">
                <div className="relative h-full w-full rounded-xl overflow-hidden">
                  <img
                    src="/images/omesh mehta.jpeg"
                    alt="Profile"
                    className="w-full h-full object-cover"
                    style={{ transition: 'transform 0.6s ease' }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-transparent to-transparent opacity-70" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
