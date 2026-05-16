import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Briefcase, 
  Trophy, 
  Mail,
  ChevronRight,
  FileText,
  Laptop
} from 'lucide-react';

const navItems = [
  { id: 'about', label: 'About', icon: User },
  { id: 'experience', label: 'Experience', icon: Laptop },
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'achievements', label: 'Achievements', icon: Trophy },
  { id: 'contact', label: 'Contact', icon: Mail },
];

const SideNav = () => {
  const [activeSection, setActiveSection] = React.useState('about');
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResumeClick = () => {
    // Replace with your actual resume URL
    window.open('https://drive.google.com/file/d/1SQZuBA4qkfb2cNEjMTrrKNZQbej8qNSo/view?usp=sharing', '_blank');
  };

  return (
    <>
      {/* Resume Button */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="fixed top-4 right-4 z-50"
      >
        <motion.button
          onClick={handleResumeClick}
          className="relative flex items-center gap-3 px-6 py-3 bg-white/[0.04] rounded-full border border-white/10 text-[#c8a97e]/70 group"
          style={{ transition: 'background 0.3s ease, border-color 0.3s ease' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="absolute inset-0 bg-[#c8a97e]/5 rounded-full opacity-0 group-hover:opacity-100" style={{ transition: 'opacity 0.3s ease' }} />
          <div className="relative">
            <FileText className="w-5 h-5 group-hover:text-amber-300 transition-colors" />
          </div>
          <span className="text-base font-medium relative" style={{ transition: 'color 0.3s ease' }}>
            Resume
          </span>
        </motion.button>
      </motion.div>

      {/* Desktop Navigation */}
      <motion.nav
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed left-8 top-[40%] -translate-y-1/2 z-50 hidden md:flex flex-col gap-4"
      >
        {/* Navigation Items */}
        <div className="flex flex-col gap-4 mb-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            const isHovered = hoveredItem === item.id;
            
            return (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                onHoverStart={() => setHoveredItem(item.id)}
                onHoverEnd={() => setHoveredItem(null)}
                className={`group relative flex items-center gap-4 p-3 rounded-xl ${
                  isActive 
                    ? 'text-[#c8a97e] bg-white/[0.06] border border-white/10' 
                    : 'text-white/30 border border-transparent hover:text-[#c8a97e]/70 hover:bg-white/[0.03]'
                }`}
                style={{ transition: 'all 0.3s ease' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative">
                  <Icon className="w-5 h-5" />
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -left-1.5 -right-1.5 -top-1.5 -bottom-1.5 border border-[#c8a97e]/50 rounded-xl"
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  )}
                </div>
                
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, x: -20, width: 0 }}
                      animate={{ opacity: 1, x: 0, width: 'auto' }}
                      exit={{ opacity: 0, x: -20, width: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-2 overflow-hidden whitespace-nowrap"
                    >
                      <span className="text-sm font-semibold tracking-wide">
                        {item.label}
                      </span>
                      <ChevronRight 
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isActive ? 'rotate-90 text-orange-400' : 'translate-x-1 text-amber-400'
                        }`}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>

        {/* Branding Vertical */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="border-t border-white/10 pt-6 mt-4 flex justify-center"
        >
          <div className="font-bold text-sm tracking-[0.2em] whitespace-nowrap writing-mode-vertical-rl rotate-180 text-[#c8a97e]/30 hover:text-[#c8a97e]/60" style={{ transition: 'opacity 0.3s ease' }}>
            OMESH.DEV
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile Bottom Navigation */}
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden pb-safe"
      >
        <div className="mx-4 mb-4">
          <div className="bg-[#0d0e12]/80 rounded-2xl p-2 flex justify-around items-center border border-white/10">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative p-3 rounded-xl ${
                    isActive 
                      ? 'text-[#c8a97e] bg-white/[0.06]' 
                      : 'text-white/30 hover:text-[#c8a97e]/70 hover:bg-white/[0.03]'
                  }`}
                  style={{ transition: 'all 0.3s ease' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="relative">
                    <Icon className="w-5 h-5" />
                    {isActive && (
                      <motion.div
                        layoutId="mobileActiveIndicator"
                        className="absolute -left-1.5 -right-1.5 -top-1.5 -bottom-1.5 border border-[#c8a97e]/50 rounded-xl"
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      />
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default SideNav;

const styles = `
  .writing-mode-vertical-rl {
    writing-mode: vertical-rl;
    text-orientation: mixed;
  }
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}