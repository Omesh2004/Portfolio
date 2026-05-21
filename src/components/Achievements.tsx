import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Trophy, CheckCircle } from 'lucide-react';

const otherAchievements = [
  {
    title: 'Inter IIT Tech Meet 14.0',
    description: 'Ranked 2nd in the Pathway problem statement representing IIT Patna.',
    date: '2025',
    image: '/images/pathway_2nd.jpeg'
  },
  {
    title: 'EY Techathon',
    description: 'Made it to the final 300 teams out of 183,260 participants (Top 0.16%).',
    date: '2025',
    image: '/images/EY techathon.jpeg'
  },
  {
    title: 'TBO Voyagehack Hackathon',
    description: 'Ranked among the top 52 teams out of 12,000+ participating teams globally (Top 0.43%).',
    date: '2025',
    image: '/images/tbo.png'
  },
  {
    title: 'Nucleus Finspark Season 1',
    description: 'Secured a spot among the top 52 teams out of 12,000+ teams (Top 0.43%).',
    date: '2024',
    image: '/images/nucleus_169.gif'
  },
  {
    title: 'Destination Dr. Reddy\'s Hackathon',
    description: 'Among the top 72 teams shortlisted all over India (Top ~0.5%).',
    date: '2025',
    image: '/images/destination_dr_reddy.webp'
  },
  {
    title: 'Amazon ML Challenge',
    description: 'Ranked among Top 3,000 teams out of 90,000+ participants nationwide (Top 3.33%).',
    date: '2025',
    image: '/images/amazon_ml_challenge.png'
  }
];

// Animated counter component
const AnimatedCounter: React.FC<{ value: string; suffix?: string }> = ({ value, suffix = '' }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (!isInView) return;
    const numericValue = parseInt(value.replace(/\D/g, ''));
    if (isNaN(numericValue)) {
      setDisplayValue(value);
      return;
    }

    let current = 0;
    const step = Math.max(1, Math.floor(numericValue / 40));
    const timer = setInterval(() => {
      current += step;
      if (current >= numericValue) {
        current = numericValue;
        clearInterval(timer);
      }
      setDisplayValue(current.toString());
    }, 30);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return <span ref={ref}>{displayValue}{suffix}</span>;
};

const cardPopVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: i * 0.08,
    },
  }),
};

const Achievements = () => {
  const [modalImage, setModalImage] = useState<string | null>(null);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 relative z-10 overflow-hidden">
      <motion.h2
        className="section-heading"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <span className="text-[#c8a97e] font-mono text-2xl mr-2">04.</span> Achievements
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="glass-card"
      >
        {/* Content */}
        <div className="p-2 md:p-6 space-y-8">
          
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white/[0.03] rounded-xl border border-white/10 p-6 flex items-center hover:border-[#c8a97e]/15"
              style={{ transition: 'background 0.3s ease, border-color 0.3s ease' }}
            >
              <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center gap-3 mb-2">
                  <img src="https://leetcode.com/static/images/LeetCode_logo_rvs.png" alt="LeetCode" className="w-8 h-8 rounded" />
                  <span className="text-[#d4b896] font-bold text-xl">LeetCode</span>
                </div>
                <div className="flex flex-wrap gap-6 text-white/70 text-sm mt-2">
                  <div>
                    <span className="block text-xs text-white/40">Problems Solved</span>
                    <span className="font-bold text-2xl text-[#c8a97e]"><AnimatedCounter value="150" suffix="+" /></span>
                  </div>
                  <div>
                    <span className="block text-xs text-white/40">Focus Areas</span>
                    <span className="font-bold text-lg text-[#d4b896]">DSA & Algorithms</span>
                  </div>
                </div>
                <span className="mt-4 text-[#c8a97e]/60 text-sm font-medium">
                  Consistent problem solver
                </span>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="bg-white/[0.03] rounded-xl border border-white/10 p-6 flex items-center hover:border-[#a89bc8]/15"
              style={{ transition: 'background 0.3s ease, border-color 0.3s ease' }}
            >
              <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded bg-gradient-to-br from-[#8b7ec8]/40 to-[#6b5fa8]/40 flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-white/70" />
                  </div>
                  <span className="text-[#a89bc8] font-bold text-xl">Extra-Curriculars</span>
                </div>
                <div className="flex flex-col gap-3 text-white/60 text-sm mt-2">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="flex items-start gap-2"
                  >
                    <CheckCircle className="w-4 h-4 text-[#a89bc8]/60 mt-0.5" />
                    <span>Coordinator, Development and OS Division, NJACK (2025)</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="flex items-start gap-2"
                  >
                    <CheckCircle className="w-4 h-4 text-[#a89bc8]/60 mt-0.5" />
                    <span>Sub-Coordinator, Events Committee, Infinito Sports Fest (2024)</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="flex items-start gap-2"
                  >
                    <CheckCircle className="w-4 h-4 text-[#a89bc8]/60 mt-0.5" />
                    <span>Table Tennis Inter IIT Sports (2023)</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Hackathons & Competitions */}
          <h3 className="text-2xl font-bold text-[#d4b896] mb-6 flex items-center gap-3 mt-8">
            <Trophy className="w-6 h-6 text-[#c8a97e]/70" />
            <span>Competitions & Hackathons</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherAchievements.map((ach, idx) => (
              <motion.div 
                key={idx} 
                custom={idx}
                variants={cardPopVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden flex flex-col group hover:border-[#c8a97e]/15"
                style={{ transition: 'background 0.3s ease, border-color 0.3s ease' }}
              >
                <button
                  className="focus:outline-none overflow-hidden h-48 w-full relative bg-[#0d0e12]"
                  onClick={() => setModalImage(ach.image)}
                  tabIndex={0}
                  aria-label={`View image for ${ach.title}`}
                >
                  <img
                    src={ach.image}
                    alt={ach.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.05]"
                    style={{ transition: 'transform 0.5s ease, opacity 0.3s ease' }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div class="flex flex-col items-center justify-center h-full text-white/25 p-4">
                            <svg class="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span class="text-xs">Image not available</span>
                          </div>
                        `;
                      }
                    }}
                  />
                </button>
                <div className="p-5 flex flex-col flex-1">
                  <div className="text-xs text-[#c8a97e]/60 font-medium mb-2">{ach.date}</div>
                  <div className="font-bold text-white/90 text-lg mb-2">{ach.title}</div>
                  <div className="text-white/50 text-sm flex-1 leading-relaxed">{ach.description}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Modal for image preview */}
      {modalImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={() => setModalImage(null)}>
          <img src={modalImage} alt="Achievement" className="max-w-[90vw] max-h-[90vh] rounded-2xl border border-white/10" />
        </div>
      )}
    </div>
  );
};

export default Achievements;
