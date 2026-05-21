import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Award } from "lucide-react";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: i * 0.1,
    },
  }),
};

// Alternating slide direction for visual interest
const slideVariants = {
  hiddenLeft: { opacity: 0, x: -50 },
  hiddenRight: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const Experience = () => {
  const experiences = [
    {
      title: "Velora (Inter IIT Tech Meet 14.0)",
      company: "Market Intel Platform",
      location: "IIT Patna",
      period: "Nov 2025 - Dec 2025",
      image: "/images/pathway_2nd.jpeg",
      description: [
        "A real-time market intelligence and research platform that continuously collects data from multiple sources like news websites, stock market feeds, Reddit/social media, and NSE corporate filings.",
        "The system processes and enriches this streaming data using a Medallion Architecture (Bronze → Silver → Gold) built on Kafka and Pathway.",
        "Analyzes sentiment, extracts company-related insights, computes stock indicators, and converts data into vector embeddings for AI-powered semantic search and Retrieval-Augmented Generation (RAG).",
        "Includes agentic AI workflows and chatbot-based research tools that help users query market trends, company insights, and financial intelligence in real time."
      ],
      technologies: ["Kafka", "Pathway", "RAG", "Agentic AI", "Medallion Architecture", "Vector Embeddings"]
    },
    {
      title: "IIT Patna Official Website",
      company: "Lead Full Stack Developer",
      location: "Patna, India",
      period: "Jan 2026 - Present",
      image: "/images/institute_web.jpeg",
      description: [
        "Revitalized the official institute platform serving 10,000+ monthly users by migrating legacy systems to a modern Next.js architecture.",
        "Slashed Time-to-Interactive (TTI) by 30% through advanced GSAP animations, lazy loading, and code-splitting strategies.",
        "Directed a 6-member agile team to deliver a scalable, responsive beta platform, enforcing strict code review standards."
      ],
      technologies: ["Next.js", "React", "Node.js", "Tailwind", "Strapi", "GSAP"]
    },
    {
      title: "Institute Web Team Certificate",
      company: "IIT Patna",
      location: "Patna, India",
      period: "2023 - Present",
      image: "/images/institute_web_certificate.jpeg",
      description: [
        "Official certification for contributing as a core member of the Institute Web Team.",
        "Recognized for outstanding contributions to the university's digital infrastructure."
      ],
      technologies: ["Web Development", "Team Leadership", "Project Management"]
    },
    {
      title: "Institute Web Team",
      company: "Core Team Member",
      location: "Patna, India",
      period: "2023 - Present",
      image: "/images/institute web team.jpeg",
      description: [
        "Collaborated with cross-functional teams to build and maintain university web portals.",
        "Organized tech events and conducted workshops on modern web technologies."
      ],
      technologies: ["Collaboration", "Agile", "Frontend", "Backend"]
    },
    {
      title: "JEE Advanced 2023",
      company: "Competitive Examination",
      location: "India",
      period: "2023",
      image: "/images/jee adv.jpeg",
      description: [
        "Successfully cleared JEE Advanced, securing admission to IIT Patna.",
        "Demonstrated exceptional problem-solving skills and mathematical aptitude."
      ],
      technologies: ["Physics", "Chemistry", "Mathematics", "Problem Solving"]
    }
  ];

  const [modalImage, setModalImage] = useState<string | null>(null);

  return (
    <section id="experience" className="min-h-screen py-20 relative z-10 overflow-hidden">
      <div className="w-full max-w-6xl mx-auto px-4">
        <motion.h2
          className="section-heading"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="text-[#c8a97e] font-mono text-2xl mr-2">02.</span> Certificates & Real World Projects
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="glass-card"
        >
          {/* Content with timeline connector */}
          <div className="p-2 md:p-6 space-y-8 relative">
            {/* Vertical timeline line */}
            <div className="absolute left-8 md:left-12 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#c8a97e]/20 to-transparent hidden lg:block" />

            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={slideVariants}
                initial={index % 2 === 0 ? 'hiddenLeft' : 'hiddenRight'}
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 bg-white/[0.03] border border-white/10 rounded-xl p-6 relative overflow-hidden group"
                style={{ transition: 'background 0.4s ease, border-color 0.4s ease' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#c8a97e]/5 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none" style={{ transition: 'opacity 0.4s ease' }} />
                
                {/* Timeline dot */}
                <div className="absolute -left-[3px] md:left-[42px] top-8 w-[7px] h-[7px] rounded-full bg-[#c8a97e]/50 border border-[#c8a97e]/30 hidden lg:block" style={{ transition: 'background 0.3s ease' }} />

                {/* Image */}
                <div className="flex items-start justify-center lg:justify-start">
                  <div 
                    className="w-full aspect-video lg:aspect-square lg:h-48 bg-[#0d0e12]/50 rounded-xl border border-white/10 flex items-center justify-center overflow-hidden flex-shrink-0 cursor-pointer group/img"
                    style={{ transition: 'border-color 0.4s ease' }}
                    onClick={() => setModalImage(exp.image)}
                  >
                    <img
                      src={exp.image}
                      alt={`${exp.title} image`}
                      className="w-full h-full object-cover group-hover/img:scale-[1.06]"
                      style={{ transition: 'transform 0.6s ease' }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          parent.innerHTML = `
                            <div class="flex flex-col items-center justify-center text-white/40 p-4">
                              <span class="text-sm text-center font-medium">Image not found</span>
                            </div>
                          `;
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Experience Details */}
                <div className="flex flex-col min-w-0 relative z-10">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div className="flex-grow min-w-0">
                      <h3 className="text-2xl font-bold text-[#d4b896] mb-2">
                        {exp.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 text-white/100 mb-2">
                        <span className="font-bold text-lg tracking-wide">{exp.company}</span>
                        {exp.location && (
                          <>
                            <span className="text-white/30">•</span>
                            <span className="flex items-center gap-1 text-white/50 text-sm">
                              <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-[#c8a97e]/70" />
                              {exp.location}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-[#c8a97e]/80 text-sm bg-[#c8a97e]/8 px-4 py-2 rounded-full border border-[#c8a97e]/15 flex-shrink-0">
                      <Calendar className="w-4 h-4" />
                      {exp.period}
                    </div>
                  </div>

                  {/* Description */}
                  <ul className="space-y-3 mb-6">
                    {exp.description.map((item, idx) => (
                      <li key={idx} className="text-white/60 flex items-start gap-3">
                        <span className="text-[#c8a97e]/60 mt-1 flex-shrink-0">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12L10 17L20 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-white/[0.04] text-[#c8a97e]/70 text-xs font-medium tracking-wider uppercase rounded-full border border-white/10 cursor-default hover:bg-white/[0.08] hover:border-[#c8a97e]/20"
                        style={{ transition: 'background 0.3s ease, border-color 0.3s ease, color 0.3s ease' }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center justify-center gap-2 text-white/30 text-sm pt-4"
            >
              <Award className="w-4 h-4" />
              <span>{experiences.length} Highlights • Continuously learning and growing</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Modal for image preview */}
      {modalImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={() => setModalImage(null)}>
          <img src={modalImage} alt="Preview" className="max-w-full max-h-[90vh] object-contain rounded-2xl border border-white/10" />
        </div>
      )}
    </section>
  );
};

export default Experience;
