import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// -- Typography Reveal Sub-component --
const TextReveal: React.FC<{ text: string; className?: string; delay?: number; charDelay?: number }> = ({
  text,
  className = '',
  delay = 0,
  charDelay = 0.03,
}) => {
  return (
    <span className={className} aria-label={text}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            duration: 0.4,
            delay: delay + i * charDelay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};

// -- Glow sweep overlay --
const GlowSweep: React.FC<{ delay?: number }> = ({ delay = 2.0 }) => (
  <motion.div
    className="absolute inset-0 pointer-events-none z-20"
    initial={{ opacity: 0 }}
    animate={{ opacity: [0, 1, 0] }}
    transition={{ duration: 1.5, delay, ease: 'easeInOut' }}
    style={{
      background: 'linear-gradient(90deg, transparent 0%, rgba(200,169,126,0.08) 40%, rgba(200,169,126,0.15) 50%, rgba(200,169,126,0.08) 60%, transparent 100%)',
      maskImage: 'linear-gradient(90deg, transparent, black, transparent)',
      WebkitMaskImage: 'linear-gradient(90deg, transparent, black, transparent)',
    }}
  />
);

const asciiDonutFrames = [
  
];

const loginLines = [
  { type: 'login', content: 'login: omesh' },
  { type: 'login', content: 'password: ******' },
  { type: 'login', content: 'Welcome, omesh!' }
];

const MATRIX_COLUMNS = 32;
const MATRIX_ROWS = 12;
const MATRIX_CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';

function getRandomChar() {
  return MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
}

const MatrixAnimation = () => {
  const [matrix, setMatrix] = useState<string[][]>([]);

  useEffect(() => {
    let running = true;
    function updateMatrix() {
      setMatrix(prev => {
        if (!prev.length) {
          // Initialize
          return Array.from({ length: MATRIX_ROWS }, () =>
            Array.from({ length: MATRIX_COLUMNS }, getRandomChar)
          );
        }
        // Shift rows down, add new row at top
        const newMatrix = [
          Array.from({ length: MATRIX_COLUMNS }, getRandomChar),
          ...prev.slice(0, MATRIX_ROWS - 1)
        ];
        return newMatrix;
      });
      if (running) setTimeout(updateMatrix, 80);
    }
    updateMatrix();
    return () => { running = false; };
  }, []);

  return (
    <pre className="text-[#c8a97e]/60 text-xs md:text-sm leading-tight my-8 min-h-[120px] font-mono text-center select-none">
      {matrix.map((row, i) => (
        <div key={i} style={{ letterSpacing: 2 }}>
          {row.join(' ')}
        </div>
      ))}
    </pre>
  );
};

const Hero = () => {
  const [phase, setPhase] = useState<'login' | 'matrix' | 'terminal'>('login');
  const [loginStep, setLoginStep] = useState(0);
  const [donutFrame, setDonutFrame] = useState(0);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = React.useRef<HTMLInputElement>(null);
  
  // Terminal text content with type information for styling
  const skillsTable = `+---------------------+-----------------------------+
| Category            | Skills                      |
+---------------------+-----------------------------+
| Programming         | Python, Java, C, JS, TS     |
| Web Development     | React, Next.js, Node.js     |
| Databases           | MongoDB, Firebase, SQL      |
| DevOps & Tools      | Git, Docker, GKE, AWS       |
| System Design       | Microservices, REST APIs    |
+---------------------+-----------------------------+`;

  const terminalContent = [
    { type: 'system', content: 'Welcome to Omesh\'s Portfolio Terminal v1.0.0' },
    { type: 'system', content: 'Initializing system...' },
    { type: 'command', content: '$ whoami' },
    { type: 'output', content: 'omesh@iitpatna' },
    { type: 'command', content: '$ echo $USER' },
    { type: 'output', content: 'Chemical Engineering Student @ IIT Patna' },
    { type: 'command', content: '$ cat skills.txt' },
    { type: 'pre', content: skillsTable },
    { type: 'command', content: '$ cat about.txt' },
    { type: 'output', content: 'Patna | B.Tech 2023-2027' },
    { type: 'output', content: 'Focused on Full Stack Development, Machine Learning, and DevOps...' },
    { type: 'command', content: '$ git status' },
    { type: 'output', content: 'On branch master - omesh' },
    { type: 'command', content: '$ ./run_portfolio.sh' },
    { type: 'success', content: 'Launching portfolio experience...' },
    { type: 'system', content: 'System ready. Launching ...' }
  ];

  const availableCommands = [
    { name: 'cd about', description: 'Navigate to About section' },
    { name: 'cd experience', description: 'Navigate to Experience section' },
    { name: 'cd projects', description: 'Navigate to Projects section' },
    { name: 'cd contact', description: 'Navigate to Contact section' },
    { name: 'ls', description: 'List available sections' },
    { name: 'help', description: 'Show available commands' },
    { name: 'clear', description: 'Clear terminal' }
  ];

  // Login animation logic
  useEffect(() => {
    if (phase === 'login') {
      if (loginStep < loginLines.length) {
        const timer = setTimeout(() => {
          setLoginStep(prev => prev + 1);
        }, 700);
        return () => clearTimeout(timer);
      } else {
        setTimeout(() => setPhase('matrix'), 500);
      }
    }
  }, [phase, loginStep]);

  // Matrix animation logic
  useEffect(() => {
    if (phase === 'matrix') {
      const timer = setTimeout(() => setPhase('terminal'), 2000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // Terminal animation logic
  useEffect(() => {
    if (phase === 'terminal') {
      if (currentLine < terminalContent.length) {
        const timer = setTimeout(() => {
          setTerminalLines(prev => [...prev, terminalContent[currentLine].content]);
          setCurrentLine(prev => prev + 1);
        }, currentLine === 0 ? 500 : Math.random() * 300 + 200);
        return () => clearTimeout(timer);
      } else {
        setIsComplete(true);
       }
     }
   }, [phase, currentLine, terminalContent]);
  
  const cursorBlink = {
    opacity: [1, 0, 1],
    transition: {
      duration: 1.2,
      repeat: Infinity,
      repeatType: "loop" as const
    }
  };

  const getLineStyle = (line: string, index: number) => {
    const type = terminalContent[index]?.type;
    switch (type) {
      case 'command':
        return 'text-[#c8a97e] font-semibold';
      case 'output':
        return 'text-white/60';
      case 'success':
        return 'text-[#d4b896]';
      case 'system':
        return 'text-[#a89bc8] font-semibold';
      case 'pre':
        return 'text-white/60';
      case 'login':
        return 'text-white/40';
      default:
        return 'text-white/60';
    }
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    setCommandHistory(prev => [...prev, trimmedCmd]);
    setHistoryIndex(-1);

    // Display the command
    setTerminalLines(prev => [...prev, `$ ${cmd}`]);

    if (trimmedCmd === 'help') {
      const helpLines = [
        '+--------------------+--------------------------------+',
        '| Command            | Description                    |',
        '+--------------------+--------------------------------+',
        ...availableCommands.map(c => `| ${c.name.padEnd(18)} | ${c.description.padEnd(30)} |`),
        '+--------------------+--------------------------------+'
      ];
      setTerminalLines(prev => [...prev, ...helpLines]);
    } else if (trimmedCmd === 'ls') {
      const sections = 'about  projects  contact';
      setTerminalLines(prev => [...prev, sections]);
    } else if (trimmedCmd === 'clear') {
      setTerminalLines([]);
    } else if (trimmedCmd.startsWith('cd ')) {
      const section = trimmedCmd.slice(3).trim();
      const sectionMap: { [key: string]: string } = {
        'about': 'about',
        'experience': 'experience',
        'projects': 'projects',
        'contact': 'contact'
      };
      
      if (sectionMap[section]) {
        setTerminalLines(prev => [...prev, `Navigating to ${section}...`]);
        setTimeout(() => {
          const targetSection = document.getElementById(sectionMap[section]);
          if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
          }
        }, 300);
      } else {
        setTerminalLines(prev => [...prev, `cd: no such section '${section}'`]);
      }
    } else if (trimmedCmd === '') {
      // Empty command, do nothing
    } else {
      setTerminalLines(prev => [...prev, `command not found: ${cmd}`]);
    }
  };

  // Get filtered suggestions based on input
  const suggestions = userInput.trim().length > 0
    ? availableCommands.filter(cmd => cmd.name.toLowerCase().startsWith(userInput.toLowerCase()))
    : [];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (suggestions.length > 0) {
        // If there's a suggestion, allow autocomplete on Enter too
        handleCommand(userInput);
        setUserInput('');
        return;
      }
       handleCommand(userInput);
       setUserInput('');
     } else if (e.key === 'ArrowUp') {
       e.preventDefault();
       const newIndex = historyIndex + 1;
       if (newIndex < commandHistory.length) {
         setHistoryIndex(newIndex);
         setUserInput(commandHistory[commandHistory.length - 1 - newIndex]);
       }
     } else if (e.key === 'ArrowDown') {
       e.preventDefault();
       const newIndex = historyIndex - 1;
       if (newIndex >= 0) {
         setHistoryIndex(newIndex);
         setUserInput(commandHistory[commandHistory.length - 1 - newIndex]);
       } else {
         setHistoryIndex(-1);
         setUserInput('');
       }
     } else if (e.key === 'Tab') {
       e.preventDefault();
       if (suggestions.length > 0) {
         // Autocomplete with first suggestion
         setUserInput(suggestions[0].name);
       }
     }
   };
  
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-transparent py-16 z-10">
      <motion.div 
        className="relative w-full max-w-4xl mx-4 terminal-window"
        initial={{ opacity: 0, y: 30, scale: 0.92, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
        transition={{ delay: 0.3, duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Glow sweep animation */}
        <GlowSweep delay={1.8} />

        <div className="w-full h-full">
          <div className="terminal-header">
            <div className="flex items-center gap-2">
            <div className="terminal-circle text-rose-400/60 bg-rose-400/60"></div>
              <div className="terminal-circle text-amber-400/60 bg-amber-400/60"></div>
              <div className="terminal-circle text-[#c8a97e]/60 bg-[#c8a97e]/60"></div>
            </div>
            <div className="text-xs text-center flex-1 text-white/60 font-mono">
              omesh@mystic: ~/portfolio
            </div>
          </div>

          <div className="terminal-body min-h-[500px] flex flex-col">
            <div className="flex-grow relative overflow-hidden">
              {/* Top-anchored content for login / matrix so they render from the top */}
              {(phase === 'login' || phase === 'matrix') && (
                <div className="absolute top-0 left-0 right-0 flex flex-col space-y-1">
                  {phase === 'login' && (
                    <>
                      {loginLines.slice(0, loginStep).map((line, idx) => (
                        <div key={idx} className="text-gray-400">
                          <TextReveal text={line.content} delay={0} charDelay={0.04} />
                        </div>
                      ))}
                      {loginStep < loginLines.length && (
                        <div className="inline-flex items-center">
                          <motion.span 
                            className="terminal-cursor" 
                            animate={cursorBlink} 
                          />
                        </div>
                      )}
                    </>
                  )}
                  {phase === 'matrix' && <MatrixAnimation />}
                </div>
              )}

              {/* Bottom-anchored terminal: new lines appear at bottom and push older lines up (clipped) */}
              {phase === 'terminal' && (
                <div className="absolute bottom-0 left-0 right-0 flex flex-col space-y-1">
                  {terminalLines.map((line, index) => {
                    const lineContent = terminalContent[index];
                    const isCommand = line.startsWith('$');
                    const lineType = isCommand ? 'command' : lineContent?.type;
                    
                    return lineType === 'pre' ? (
                      <pre key={index} className="text-gray-300 text-xs md:text-sm leading-tight my-2">{line}</pre>
                    ) : (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className={`${getLineStyle(line, index)} transition-colors duration-200`}
                      >
                        {isCommand ? (
                          <>
                            <span className="text-[#c8a97e] mr-2">$</span>
                            {line.slice(2)}
                          </>
                        ) : lineType === 'command' ? (
                          <>
                            <span className="text-[#c8a97e] mr-2">$</span>
                            {line}
                          </>
                        ) : (
                          line
                        )}
                      </motion.div>
                    );
                  })}
                  {isComplete && (
                    <div className="inline-flex items-center gap-2">
                      <span className="text-[#c8a97e]">$</span>
                      <div className="flex-grow relative">
                        <div className="relative">
                          <input
                            ref={inputRef}
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className={`bg-transparent outline-none w-full relative z-10 ${
                              suggestions.length > 0 ? 'text-transparent' : 'text-[#c8a97e]'
                            }`}
                            placeholder=""
                            autoFocus
                          />
                          {/* Inline suggestion - lighter text overlaid */}
                          {suggestions.length > 0 && (
                            <div className="absolute top-0 left-0 text-white/40 pointer-events-none font-mono text-sm">
                              <span className="text-[#c8a97e]">{userInput}</span>
                              <span>{suggestions[0].name.slice(userInput.length)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <motion.span 
                        className="terminal-cursor" 
                        animate={cursorBlink} 
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {phase === 'terminal' && isComplete && (
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="text-center text-white/40 text-xs">
                  Type 'help' for available commands
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
