import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, FolderOpen, PlayCircle, Eye, X, BookOpen } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import TiltCard from './TiltCard';
import MagneticButton from './MagneticButton';

const veloraReadme = `
# Velora - Market Intel Platform (Inter IIT Tech Meet 14.0)

Velora is a real-time market intelligence and research platform that continuously collects data from multiple sources like news websites, stock market feeds, Reddit/social media, and NSE corporate filings.

## Architecture
The system processes and enriches streaming data using a Medallion Architecture (Bronze → Silver → Gold) built on **Kafka** and **Pathway**.

## Capabilities
- Analyzes sentiment and extracts company-related insights.
- Computes stock indicators.
- Converts data into vector embeddings for AI-powered semantic search and Retrieval-Augmented Generation (RAG).
- Includes agentic AI workflows and chatbot-based research tools that help users query market trends in real time.
`;

import finInsightsReadme from '../data/fininsights.md?raw';

const amazonMlReadme = `
# Amazon ML Challenge – Multi-Modal Product Price Prediction

Built a scalable machine learning pipeline to predict product prices using structured metadata, product descriptions, and image-based features. The system combined advanced regex-based feature extraction, computer vision preprocessing, and ensemble learning models including XGBoost, LightGBM, CatBoost, and PyTorch MLPs.

## Key Contributions
- Engineered 100+ features from noisy e-commerce catalog data
- Processed and optimized 75,000+ product images using parallel pipelines
- Developed automated benchmarking and deployment workflows
- Implemented multi-model evaluation using SMAPE, RMSE, and MAE metrics
- Achieved competitive performance in the Amazon ML Challenge through ensemble-based regression approaches

## Tech Stack
Python, XGBoost, LightGBM, CatBoost, PyTorch, Pandas, NumPy, Pillow, Scikit-learn, Concurrent Futures
`;

const projects = [
  {
    title: 'FinInsights (Nucleus Software Hackathon)',
    description: 'A production-scale multi-tenant fintech analytics platform combining real-time telemetry ingestion, Kafka-based event streaming, ClickHouse OLAP analytics, AI-assisted reporting...',
    tech: ['Kafka', 'ClickHouse', 'WebSockets', 'AI Analytics', 'Event-Driven'],
    category: 'System',
    featured: true,
    media: '/images/WhatsApp Video 2026-05-16 at 16.21.18.mp4',
    mediaType: 'video',
    actionType: 'pdf',
    pdfUrl: '/images/FinInsights_Supporting_Documentation.pdf',
    readme: finInsightsReadme,
    github: 'https://github.com/Omesh2004/nucleus',
    link: '',
  },
  {
    title: 'Velora - Market Intel Platform',
    description: 'A real-time market intelligence and research platform that processes streaming data from news, stock feeds, and social media using a Medallion Architecture. Analyzes sentiment...',
    tech: ['Pathway', 'Kafka', 'RAG', 'Agentic AI', 'Vector Embeddings'],
    category: 'AI/ML',
    featured: true,
    media: '/images/pathway_2nd.jpeg',
    mediaType: 'image',
    actionType: 'pdf',
    pdfUrl: '/images/Velora Team 15.pdf',
    readme: veloraReadme,
    github: '',
    link: '',
  },
  {
    title: 'IIT Patna Official Website',
    description: 'Revitalized the official institute platform serving 10,000+ monthly users by migrating legacy systems to a modern Next.js architecture. Slashed Time-to-Interactive (TTI) by 30%...',
    tech: ['Next.js', 'React', 'Node.js', 'TailwindCSS', 'Strapi', 'GSAP'],
    category: 'Web',
    featured: true,
    media: '/images/institute_web.jpeg',
    mediaType: 'image',
    actionType: 'external',
    actionUrl: 'https://www.iitp.ac.in',
    github: '',
    link: '',
  },
  {
    title: 'Amazon ML Challenge – Price Prediction',
    description: 'A scalable ML pipeline predicting product prices using structured metadata, descriptions, and image features. Combines ensemble learning (XGBoost, LightGBM, CatBoost) with PyTorch MLPs, processing 75,000+ product images via parallel pipelines.',
    tech: ['Python', 'XGBoost', 'LightGBM', 'CatBoost', 'PyTorch', 'Scikit-learn'],
    category: 'AI/ML',
    featured: false,
    media: '/images/amazon_ml_challenge.png',
    mediaType: 'image',
    actionType: 'pdf',
    pdfUrl: '/images/Amazon ML Challenge product price prediction documentation request.pdf',
    readme: amazonMlReadme,
    github: 'https://github.com/Omesh2004/amazon-ml',
    link: '',
  }
];

const featuredProjects = projects.filter(project => project.featured);
const categories = ["All", "AI/ML", "Web", "System"];

const projectVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: i * 0.08,
    },
  }),
  hover: {
    y: -4,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(featuredProjects[0]);
  const [modalProject, setModalProject] = useState<any>(null);
  const [actionPromptProject, setActionPromptProject] = useState<any>(null);
  const filteredProjects = activeCategory === "All" ? featuredProjects : projects.filter(p => p.category === activeCategory);

  useEffect(() => {
    if (!filteredProjects.some(project => project.title === selectedProject.title)) {
      setSelectedProject(filteredProjects[0]);
    }
  }, [activeCategory, filteredProjects, selectedProject.title]);

  return (
    <section id="projects" className="min-h-screen py-20 relative z-10 overflow-hidden">
      <div className="w-full max-w-6xl mx-auto px-4">
        <motion.h2
          className="section-heading"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="text-[#c8a97e] font-mono text-2xl mr-2">03.</span> Featured Projects
        </motion.h2>

        {/* Media Zone */}
        <div className="mb-12 rounded-2xl overflow-hidden border border-white/10 bg-[#0b0c10]/50 backdrop-blur-sm aspect-video max-h-[500px] relative w-full shadow-2xl flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedProject.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="w-full h-full"
            >
              {selectedProject.mediaType === 'video' ? (
                <video
                  src={selectedProject.media}
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={selectedProject.media}
                  alt={selectedProject.title}
                  className="w-full h-full object-contain md:object-cover"
                />
              )}
            </motion.div>
          </AnimatePresence>
          <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none z-10">
            <h3 className="text-2xl font-bold text-white/90">{selectedProject.title}</h3>
            <p className="text-[#c8a97e] font-mono text-sm mt-2">{selectedProject.tech.slice(0, 3).join(' • ')}</p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-4 mb-12">
          {categories.map((category) => (
            <MagneticButton key={category} strength={0.25} radius={50}>
              <button
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold tracking-wide border ${activeCategory === category
                  ? "bg-[#c8a97e]/15 text-[#d4b896] border-[#c8a97e]/30"
                  : "bg-white/[0.03] text-white/50 hover:text-white/80 border-white/10 hover:bg-white/[0.06] hover:border-white/20"
                  }`}
                style={{ transition: 'all 0.3s ease' }}
              >
                {category}
              </button>
            </MagneticButton>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                custom={index}
                variants={projectVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="h-full"
              >
                <TiltCard
                  className={`tilt-card-wrapper group h-full cursor-pointer transition-all duration-300 relative ${selectedProject.title === project.title ? 'ring-2 ring-[#c8a97e]/50 ring-offset-4 ring-offset-[#0b0c10]' : ''
                    }`}
                  tiltMax={7}
                  glareEnabled={true}
                  scale={1.03}
                >
                  <div
                    className="glass-card h-full flex flex-col p-8 relative overflow-hidden"
                    onClick={() => setActionPromptProject(project)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#c8a97e]/[0.03] via-transparent to-transparent opacity-0 group-hover:opacity-100" style={{ transition: 'opacity 0.4s ease' }} />

                    {/* Top Bar */}
                    <div className="flex justify-between items-center mb-8 relative z-10">
                      <div className="p-3 rounded-xl bg-[#c8a97e]/10 text-[#c8a97e]/70 group-hover:bg-[#c8a97e]/15" style={{ transition: 'background 0.3s ease' }}>
                        <FolderOpen className="w-8 h-8" />
                      </div>

                      <div className="flex gap-4 items-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (project.actionType === 'external') {
                              window.open(project.actionUrl, '_blank');
                            } else {
                              setModalProject(project);
                            }
                          }}
                          className="text-white/30 hover:text-[#c8a97e] flex items-center gap-2 text-sm font-medium transition-colors"
                        >
                          {project.actionType === 'external' ? (
                            <><ExternalLink className="w-5 h-5" /> Visit Site</>
                          ) : (
                            <><BookOpen className="w-5 h-5" /> Read More</>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-grow relative z-10">
                      <h3 className="text-xl font-bold text-white/90 mb-3 group-hover:text-[#d4b896]" style={{ transition: 'color 0.3s ease' }}>
                        {project.title}
                      </h3>
                      {/* Summary reveal on hover */}
                      <div className="overflow-hidden">
                        <p className="text-white/50 text-sm leading-relaxed mb-6 transition-all duration-500 group-hover:text-white/70">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-white/5 relative z-10">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs font-mono text-[#c8a97e]/50 bg-white/[0.03] px-2 py-1 rounded-md border border-white/10 group-hover:text-[#c8a97e]/70 group-hover:border-[#c8a97e]/15"
                          style={{ transition: 'all 0.3s ease' }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View More Projects Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center relative z-10"
        >
          <MagneticButton className="inline-block" strength={0.4} radius={100}>
            <a
              href="https://github.com/Omesh2004"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/[0.04] border border-white/10 rounded-full text-white/60 hover:text-[#c8a97e] hover:bg-white/[0.06] hover:border-[#c8a97e]/20 group font-medium"
              style={{ transition: 'all 0.3s ease' }}
            >
              <Github className="w-5 h-5" />
              <span>View More on GitHub</span>
              <span className="opacity-0 group-hover:opacity-100 text-[#c8a97e]/60" style={{ transition: 'opacity 0.3s ease' }}>→</span>
            </a>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Markdown Modal */}
      <AnimatePresence>
        {modalProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0b0c10]/80 backdrop-blur-md"
            onClick={() => setModalProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#121318] border border-white/10 rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative"
            >
              {/* Modal Header */}
              <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-[#c8a97e]" />
                  <span className="font-mono text-white/90 font-medium">
                    {modalProject.actionType === 'pdf' ? 'DOCUMENTATION.pdf' : 'README.md'}
                  </span>
                </div>
                <button
                  onClick={() => setModalProject(null)}
                  className="p-2 text-white/50 hover:text-white/90 hover:bg-white/[0.05] rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-8 overflow-y-auto flex-1 h-full flex flex-col min-h-[60vh]">
                {modalProject.actionType === 'pdf' ? (
                  <iframe src={modalProject.pdfUrl} className="w-full flex-1 min-h-[70vh] rounded-xl border border-white/10 bg-white" title="PDF Document" />
                ) : (
                  <div className="prose prose-invert prose-headings:text-white/90 prose-p:text-white/70 prose-a:text-[#c8a97e] hover:prose-a:text-[#d4b896] prose-strong:text-white/90 prose-ul:text-white/70 prose-li:marker:text-[#c8a97e]/50 max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {modalProject.readme || '*No README available.*'}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Prompt Modal */}
      <AnimatePresence>
        {actionPromptProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-[#0b0c10]/60 backdrop-blur-sm"
            onClick={() => setActionPromptProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#121318] border border-white/10 rounded-2xl w-full max-w-sm overflow-hidden flex flex-col shadow-2xl"
            >
              <div className="p-6 text-center border-b border-white/5">
                <h3 className="text-xl font-bold text-white/90">{actionPromptProject.title}</h3>
                <p className="text-white/50 text-sm mt-2">What would you like to do?</p>
              </div>

              <div className="p-4 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setSelectedProject(actionPromptProject);
                    setActionPromptProject(null);
                    window.scrollTo({ top: document.getElementById('projects')?.offsetTop || 0, behavior: 'smooth' });
                  }}
                  className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-white/[0.03] hover:bg-[#c8a97e]/10 text-white/80 hover:text-[#c8a97e] border border-white/5 hover:border-[#c8a97e]/30 transition-all group"
                >
                  <PlayCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">{actionPromptProject.mediaType === 'video' ? 'Play Demo Video' : 'View Image'}</span>
                </button>

                <button
                  onClick={() => {
                    if (actionPromptProject.actionType === 'external') {
                      window.open(actionPromptProject.actionUrl, '_blank');
                    } else {
                      setModalProject(actionPromptProject);
                    }
                    setActionPromptProject(null);
                  }}
                  className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-white/80 hover:text-white border border-white/5 hover:border-white/20 transition-all group"
                >
                  {actionPromptProject.actionType === 'external' ? (
                    <><ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform" /> <span className="font-medium">Visit Site</span></>
                  ) : (
                    <><BookOpen className="w-5 h-5 group-hover:scale-110 transition-transform" /> <span className="font-medium">See More Details</span></>
                  )}
                </button>

                {actionPromptProject.github && (
                  <button
                    onClick={() => {
                      window.open(actionPromptProject.github, '_blank');
                      setActionPromptProject(null);
                    }}
                    className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-[#c8a97e]/5 hover:bg-[#c8a97e]/10 text-[#c8a97e] border border-[#c8a97e]/20 hover:border-[#c8a97e]/40 transition-all group"
                  >
                    <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">Go to Repository</span>
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
