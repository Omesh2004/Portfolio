import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { motion } from 'framer-motion';

// Declare standard document.startViewTransition for TypeScript
declare global {
  interface Document {
    startViewTransition?: (callback: () => void) => {
      finished: Promise<void>;
      ready: Promise<void>;
      updateCallbackDone: Promise<void>;
    };
  }
}

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-11 h-11 p-3 rounded-xl" />
    );
  }

  const currentTheme = theme === 'system' ? resolvedTheme : theme;

  const handleToggle = () => {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    if (!document.startViewTransition) {
      setTheme(newTheme);
      return;
    }

    // Assign data attribute for CSS targeting
    document.documentElement.dataset.themeTransition = newTheme === 'light' ? 'to-light' : 'to-dark';

    const transition = document.startViewTransition(() => {
      // Manually toggle class for instant DOM snapshot, then sync with next-themes
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
        document.documentElement.style.colorScheme = 'dark';
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
        document.documentElement.style.colorScheme = 'light';
      }
      setTheme(newTheme);
    });

    transition.finished.finally(() => {
      delete document.documentElement.dataset.themeTransition;
    });
  };

  return (
    <motion.button
      onClick={handleToggle}
      className="relative p-3 rounded-xl text-foreground/50 hover:text-primary hover:bg-foreground/5"
      style={{ transition: 'all 0.3s ease' }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5">
        <Sun className="absolute inset-0 w-5 h-5 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute inset-0 w-5 h-5 transition-all rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
      </div>
    </motion.button>
  );
}
