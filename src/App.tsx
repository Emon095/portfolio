import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { 
  Terminal as TerminalIcon, 
  Layout as LayoutIcon, 
  Github, 
  Twitter, 
  Mail, 
  ExternalLink, 
  Search, 
  Code2, 
  ShieldCheck, 
  Cpu, 
  Trophy,
  ChevronRight,
  Monitor
} from 'lucide-react';
import { USER_INFO, PROJECTS, ACHIEVEMENTS, CERTIFICATIONS, MEDIA, TECH_STACK, EDUCATION, WRITEUPS } from './data';

// --- Shared Components ---
const safeText = (value: unknown, fallback = ''): string => {
  if (typeof value === 'string') return value;
  if (value === null || value === undefined) return fallback;
  return String(value);
};

const formatDate = (value: unknown): string => {
  const text = safeText(value);
  return text ? text.replace('-', '.') : 'N/A';
};

type DetailEntry = {
  title: string;
  meta?: string;
  content: string;
  heroImage?: string;
  section: 'writeups' | 'achievements' | 'media';
};

const Scanlines = () => <div className="scanlines" />;

const ModeToggle = ({ mode, setMode }: { mode: 'editorial' | 'terminal', setMode: (m: 'editorial' | 'terminal') => void }) => (
  <div className="fixed top-6 right-6 z-[60] flex items-center gap-2 bg-mono-surface/80 backdrop-blur-md border border-mono-border p-1 rounded-full">
    <button 
      onClick={() => setMode('editorial')}
      className={`p-2 rounded-full transition-all cursor-pointer ${mode === 'editorial' ? 'bg-mono-accent text-mono-bg' : 'text-mono-muted hover:text-white'}`}
      title="Editorial View"
    >
      <LayoutIcon size={18} />
    </button>
    <button 
      onClick={() => setMode('terminal')}
      className={`p-2 rounded-full transition-all cursor-pointer ${mode === 'terminal' ? 'bg-mono-accent text-mono-bg' : 'text-mono-muted hover:text-white'}`}
      title="Terminal View"
    >
      <TerminalIcon size={18} />
    </button>
  </div>
);

// --- Editorial View Components ---

const EditorialView = ({ onContact, onOpenEntry, activeSection, setActiveSection }: { onContact: () => void, onOpenEntry: (entry: DetailEntry) => void, activeSection: string, setActiveSection: (s: string) => void }) => {
  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col md:flex-row items-center justify-between gap-16 py-20"
          >
            {/* Left Section: Hero */}
            <div className="flex-1 flex flex-col items-start gap-8 md:ml-10 lg:ml-14">
              <div className="w-full flex flex-col md:flex-row md:items-end gap-8 md:gap-10">
                <div className="relative group ml-4 md:ml-8 lg:ml-12">
                  <div className="absolute -inset-1 bg-mono-accent/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative w-72 h-84 md:w-[20rem] md:h-[26rem] overflow-hidden rounded-2xl border border-mono-border shadow-2xl">
                    <img
                      src={USER_INFO.image}
                      alt={USER_INFO.name}
                      className="w-full h-full object-cover transition-all duration-700"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-mono-bg via-mono-bg/75 to-transparent pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-4 text-left md:pb-3">
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-normal leading-none tracking-tight text-white italic">
                    {USER_INFO.name}
                  </h1>
                  <p className="max-w-xl text-sm md:text-base text-mono-muted leading-relaxed">
                    Cybersecurity enthusiast and CSE student at Bangladesh University of Professionals. Founder of RAB (top-ranked CTF team). Campus Ambassador at Hackvisor and Joint Secretary (Cyber Security) at BUP Computer Programming Club. Passionate about reverse engineering and system security.
                  </p>
                  <p className="text-sm md:text-base lg:text-lg uppercase tracking-[6px] md:tracking-[7px] text-mono-muted font-sans font-light">
                    {USER_INFO.role}
                  </p>
                </div>
              </div>
              <div className="flex gap-4 mt-6 md:mt-2">
                 <button onClick={() => setActiveSection('profile')} className="btn-primary">Explore_Profile</button>
                 <button onClick={onContact} className="btn-outline">Secure_Channel</button>
              </div>
            </div>

            {/* Right Section: Top Achievements Highlights */}
            <div className="w-full md:w-[380px] md:ml-auto space-y-12 text-left md:text-right">
              <div>
                <div className="column-title md:justify-end">Top Achievements</div>
                <div className="space-y-8 mt-8">
                  {ACHIEVEMENTS.slice(0, 3).map((ach) => (
                    <motion.div 
                      key={ach.id} 
                      whileHover={{ x: 10 }}
                      onClick={() => setActiveSection('achievements')}
                      className="group cursor-pointer border-b border-mono-border/30 pb-6 hover:border-mono-accent transition-all"
                    >
                      <div className="font-mono text-[10px] text-mono-muted mb-2 tracking-[2px]">{formatDate(ach.date)}</div>
                      <h4 className="text-[17px] font-semibold text-white group-hover:text-mono-accent transition-colors leading-snug">
                        {ach.title}
                      </h4>
                      <p className="text-[11px] text-mono-muted mt-3 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 md:justify-end">
                        View Detailed Record <ChevronRight size={12} />
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-mono-border/20">
                <p className="text-[13px] text-mono-muted italic leading-relaxed">
                  "Currently focusing on {USER_INFO.currentlyBuilding} to enhance digital provenance."
                </p>
              </div>
            </div>
          </motion.section>
        );
      case 'profile': // About
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-16 py-12"
          >
            <section className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="md:ml-6 lg:ml-10 text-left">
                <div className="column-title">About_Identity</div>
                <h2 className="text-4xl font-display italic leading-tight text-white mb-6">
                  Securing digital monoliths through code and research.
                </h2>
                <div className="text-[16px] leading-relaxed text-mono-muted space-y-4">
                  <Markdown>{safeText(USER_INFO.bio)}</Markdown>
                </div>
              </div>
              <div className="space-y-12 md:mr-6 lg:mr-10 text-left md:text-right">
                <div>
                  <div className="column-title md:justify-end">Tech_Stack</div>
                  <div className="flex flex-wrap gap-2 md:justify-end">
                    {TECH_STACK.map((tech) => (
                      <span key={tech} className="inline-block px-3 py-1 border border-mono-border rounded-full text-[10px] text-mono-accent hover:border-white transition-colors">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                   <div className="column-title md:justify-end">Current_Node</div>
                   <p className="text-white font-mono text-sm uppercase tracking-widest">{USER_INFO.location}</p>
                </div>
              </div>
            </section>
          </motion.div>
        );
      case 'education':
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12"
          >
            <div className="column-title">Academic_History</div>
            <div className="space-y-16 mt-8">
              {EDUCATION.map((edu, i) => (
                <div key={i} className="max-w-3xl relative pl-12 before:content-[''] before:absolute before:left-0 before:top-2 before:bottom-0 before:w-px before:bg-mono-border">
                  <div className="absolute left-[-4px] top-1.5 w-2 h-2 rounded-full bg-mono-accent" />
                  <div className="font-mono text-sm text-mono-accent mb-2 uppercase tracking-widest">{edu.duration}</div>
                  <h3 className="text-3xl font-display text-white mb-2">{edu.institution}</h3>
                  <p className="text-xl text-mono-muted italic font-display mb-6">{edu.degree}</p>
                  <div className="text-sm text-mono-muted leading-relaxed max-w-2xl">
                    <Markdown>{safeText(edu.details)}</Markdown>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      case 'achievements':
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12"
          >
            <div className="column-title">Achievements_Record</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8">
              {ACHIEVEMENTS.map((ach) => (
                <div
                  key={ach.id}
                  onClick={() => onOpenEntry({
                    title: ach.title,
                    meta: `${formatDate(ach.date)} · ${ach.issuer}`,
                    content: safeText(ach.content, ach.description),
                    heroImage: ach.heroImage,
                    section: 'achievements',
                  })}
                  className="terminal-card group flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    {ach.heroImage ? (
                      <div className="mb-5 overflow-hidden border border-mono-border/50">
                        <img
                          src={ach.heroImage}
                          alt={ach.title}
                          className="w-full h-44 object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        />
                      </div>
                    ) : null}
                    <div className="font-mono text-[10px] text-mono-muted mb-4 tracking-[2px]">{formatDate(ach.date)}</div>
                    <h4 className="text-2xl font-display text-white group-hover:text-mono-accent transition-colors leading-snug mb-4">{ach.title}</h4>
                    <div className="text-xs text-mono-accent uppercase tracking-widest mb-4">Issued_By: {ach.issuer}</div>
                    <div className="text-sm text-mono-muted/80 leading-relaxed italic border-l border-mono-border pl-4">
                      <Markdown>{safeText(ach.description)}</Markdown>
                    </div>
                  </div>
                  <div className="mt-8 pt-6 border-t border-mono-border/30 flex justify-between items-center">
                    <button className="text-[11px] font-mono text-mono-muted hover:text-white transition-all underline underline-offset-4 uppercase tracking-widest">
                      Verify_Record
                    </button>
                    <ShieldCheck size={16} className="text-mono-border group-hover:text-mono-accent transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      case 'certifications':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12"
          >
            <div className="column-title">Industry_Validation</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8">
              {CERTIFICATIONS.map((cert) => (
                <div key={cert.id} className="terminal-card group flex flex-col justify-between">
                  <div>
                    {cert.heroImage ? (
                      <div className="mb-5 overflow-hidden border border-mono-border/50">
                        <img
                          src={cert.heroImage}
                          alt={cert.title}
                          className="w-full h-44 object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        />
                      </div>
                    ) : null}
                    <div className="font-mono text-[10px] text-mono-muted mb-4 tracking-[2px]">{formatDate(cert.date)}</div>
                    <h4 className="text-2xl font-display text-white group-hover:text-mono-accent transition-colors leading-snug mb-4">{cert.title}</h4>
                    <div className="text-xs text-mono-accent uppercase tracking-widest mb-4">Issued_By: {cert.issuer}</div>
                    <div className="text-sm text-mono-muted/80 leading-relaxed italic border-l border-mono-border pl-4">
                      <Markdown>{safeText(cert.description)}</Markdown>
                    </div>
                  </div>
                  <div className="mt-8 pt-6 border-t border-mono-border/30 flex justify-between items-center">
                    <button className="text-[11px] font-mono text-mono-muted hover:text-white transition-all underline underline-offset-4 uppercase tracking-widest">
                      Verify_Record
                    </button>
                    <ShieldCheck size={16} className="text-mono-border group-hover:text-mono-accent transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      case 'writeups':
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12"
          >
            <div className="column-title">Intelligence_Extracts</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              {WRITEUPS.map((w) => (
                <div
                  key={w.id}
                  onClick={() => onOpenEntry({
                    title: w.title,
                    meta: `${w.category} · ${w.date}`,
                    content: safeText(w.content, w.excerpt),
                    heroImage: w.heroImage,
                    section: 'writeups',
                  })}
                  className="terminal-card group cursor-pointer hover:bg-mono-surface border-mono-border/50"
                >
                  {w.heroImage ? (
                    <div className="mb-5 overflow-hidden border border-mono-border/50">
                      <img
                        src={w.heroImage}
                        alt={w.title}
                        className="w-full h-40 object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      />
                    </div>
                  ) : null}
                  <div className="flex justify-between items-start mb-6">
                    <span className="px-2 py-1 bg-mono-accent/10 text-mono-accent font-mono text-[9px] uppercase tracking-widest border border-mono-accent/20">
                      {w.category}
                    </span>
                    <span className="text-mono-muted font-mono text-[10px]">{w.date}</span>
                  </div>
                  <h4 className="text-2xl font-display text-white mb-4 group-hover:text-mono-accent transition-colors leading-tight">{w.title}</h4>
                  <div className="text-sm text-mono-muted leading-relaxed mb-6 line-clamp-3">
                    <Markdown>{safeText(w.excerpt)}</Markdown>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-mono-accent opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
                    READ_INTEL <ChevronRight size={12} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      case 'projects':
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12"
          >
            <div className="column-title">Codebase_Repository</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              {PROJECTS.map((project) => (
                <div key={project.id} className="terminal-card group hover:scale-[1.01] transition-transform">
                   {project.heroImage ? (
                     <div className="mb-5 overflow-hidden border border-mono-border/50">
                       <img
                         src={project.heroImage}
                         alt={project.title}
                         className="w-full h-40 object-cover group-hover:scale-[1.03] transition-transform duration-500"
                       />
                     </div>
                   ) : null}
                   <div className="flex justify-between items-center mb-4">
                     <span className="font-mono text-xs text-mono-muted">{project.date}</span>
                     <ExternalLink size={16} className="text-mono-muted group-hover:text-mono-accent transition-colors cursor-pointer" />
                   </div>
                   <h3 className="text-2xl font-display text-white mb-4 group-hover:text-mono-accent transition-colors italic">{project.title}</h3>
                   <div className="text-sm text-mono-muted mb-6 leading-relaxed">
                     <Markdown>{safeText(project.description)}</Markdown>
                   </div>
                   <div className="flex flex-wrap gap-2">
                     {(project.tags || []).map(tag => (
                       <span key={tag} className="text-[10px] font-mono border border-mono-border px-2 py-1 uppercase text-mono-muted">
                         {tag}
                       </span>
                     ))}
                   </div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      case 'media':
        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12"
          >
            <div className="column-title">Media_Reviews</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {MEDIA.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onOpenEntry({
                    title: item.title,
                    meta: `${item.type} · ${item.date}`,
                    content: safeText(item.content, item.description),
                    heroImage: item.heroImage,
                    section: 'media',
                  })}
                  className="terminal-card relative aspect-video overflow-hidden group flex flex-col justify-end p-6 border-mono-border/50 cursor-pointer"
                >
                  {item.heroImage ? (
                    <img
                      src={item.heroImage}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-mono-surface/50 group-hover:bg-mono-surface/20 transition-all duration-700" />
                  <div className="relative z-10">
                    <div className="text-[9px] uppercase tracking-widest text-mono-muted mb-1">{item.type}</div>
                    <h3 className="text-lg font-display text-white group-hover:text-mono-accent transition-colors mb-1">{item.title}</h3>
                    <p className="text-[11px] text-mono-muted mb-2 line-clamp-2">{safeText(item.description)}</p>
                    <div className="flex gap-1 text-[11px] text-mono-accent">
                       {'★'.repeat(Math.round((item.rating || 0) / 2)) + '☆'.repeat(Math.max(0, 5 - Math.round((item.rating || 0) / 2)))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen w-full pb-24 px-4 md:px-8 lg:px-12 xl:px-16 pt-12 flex flex-col"
    >
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-center border-b border-mono-border pb-8 mb-8 gap-8">
        <div className="name-title">
          <button 
            onClick={() => setActiveSection('home')}
            className="text-2xl md:text-3xl font-display font-normal leading-none tracking-tighter hover:opacity-70 transition-opacity cursor-pointer text-white"
          >
            kathos <span className="text-xs font-mono text-mono-muted align-top tracking-widest ml-2">[{safeText(USER_INFO.name).split(' ')[2] || 'USER'}]</span>
          </button>
        </div>
        <nav className="flex flex-wrap justify-center gap-4 md:gap-8 text-[11px] uppercase tracking-[2px] font-sans">
          {[
            { id: 'home', label: 'Home' },
            { id: 'profile', label: 'About' },
            { id: 'writeups', label: 'Writeups' },
            { id: 'education', label: 'Education' },
            { id: 'achievements', label: 'Achievements' },
            { id: 'certifications', label: 'Certifications' },
            { id: 'projects', label: 'Projects' },
            { id: 'media', label: 'Media' },
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveSection(item.id)} 
              className={`hover:text-white cursor-pointer transition-all relative py-2 ${activeSection === item.id ? 'text-white' : 'text-mono-muted'}`}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 right-0 h-px bg-mono-accent" />
              )}
            </button>
          ))}
          <button onClick={onContact} className="text-mono-accent hover:text-white cursor-pointer transition-colors py-2 border-l border-mono-border pl-6 ml-2">Connect</button>
        </nav>
      </header>

      {/* Dynamic Content Area */}
      <main className="flex-1 flex flex-col">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="mt-20 pt-8 border-t border-mono-border flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] uppercase tracking-[3px] text-mono-muted/50">
        <div className="flex gap-4 items-center">
          <span className="w-1 h-1 bg-mono-accent rounded-full animate-pulse" />
          Node::{USER_INFO.location}
        </div>
        <div>System_Ver::2.4.0 // Build_612</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors"><Twitter size={12} /></a>
          <a href="#" className="hover:text-white transition-colors"><Github size={12} /></a>
          <a href="#" className="hover:text-white transition-colors"><Mail size={12} /></a>
        </div>
      </footer>
    </motion.div>
  );
};

const EntryPage = ({ entry, onBack }: { entry: DetailEntry; onBack: () => void }) => {
  const sectionName = entry.section === 'writeups' ? 'Writeups' : entry.section === 'achievements' ? 'Achievements' : 'Media';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className="min-h-screen w-full pb-24 px-4 md:px-8 lg:px-12 xl:px-16 pt-12"
    >
      <div className="max-w-5xl mx-auto">
        <button
          onClick={onBack}
          className="text-xs font-mono uppercase tracking-[2px] text-mono-muted hover:text-white transition-colors mb-8 cursor-pointer"
        >
          [Back_To_{sectionName}]
        </button>
        <div className="border-b border-mono-border pb-6 mb-8">
          <h1 className="text-4xl md:text-5xl font-display text-white leading-tight">{entry.title}</h1>
          {entry.meta ? <p className="mt-3 text-xs uppercase tracking-[2px] text-mono-muted">{entry.meta}</p> : null}
        </div>
        {entry.heroImage ? (
          <div className="mb-8 border border-mono-border/50 overflow-hidden">
            <img src={entry.heroImage} alt={entry.title} className="w-full max-h-[460px] object-cover" />
          </div>
        ) : null}
        <article className="terminal-card prose prose-invert max-w-none text-mono-muted">
          <Markdown>{safeText(entry.content)}</Markdown>
        </article>
      </div>
    </motion.div>
  );
};

// --- Terminal View Components ---

const TerminalView = () => {
  const [history, setHistory] = useState<string[]>([
    'MONOLITH OS [Version 2.4.0.512]',
    '(c) Monolith Corporation. All rights reserved.',
    '',
    'System initialization sequence complete.',
    'Neural link established.',
    '',
    'Type "help" to see available command directives.',
    ''
  ]);
  const [input, setInput] = useState('');
  const terminalEndRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = input.trim();
    if (!cleanInput) return;

    const cmd = cleanInput.toLowerCase();
    let response = [`user@monolith:~$ ${cleanInput}`];

    switch (cmd) {
      case 'help':
        response.push(
          'DIRECTORY COMMANDS:',
          '  ls          List available data modules',
          '  cat [file]  Read content of a module',
          'SYSTEM COMMANDS:',
          '  bio         Display user identity profile',
          '  whoami      Display current session identity',
          '  date        Display system temporal data',
          '  clear       Purge terminal buffer',
          '  exit        Return to graphical interface'
        );
        break;
      case 'whoami':
        response.push(`${USER_INFO.name} // ${USER_INFO.role}`);
        break;
      case 'date':
        response.push(new Date().toString());
        break;
      case 'bio':
        response.push(USER_INFO.bio, `Base: ${USER_INFO.location}`, `Active_Task: ${USER_INFO.currentlyBuilding}`);
        break;
      case 'ls':
        response.push('achievements.log  certifications.log  education.db  projects.list  media.archive  writeups.txt');
        break;
      case 'cat achievements.log':
        ACHIEVEMENTS.forEach(a => response.push(`[${a.date}] ${a.title} - ${a.issuer}`));
        break;
      case 'cat certifications.log':
        CERTIFICATIONS.forEach(c => response.push(`[${c.date}] ${c.title} - ${c.issuer}`));
        break;
      case 'cat projects.list':
        PROJECTS.forEach(p => response.push(`> ${p.title} (${p.date}): ${p.description}`));
        break;
      case 'cat media.archive':
        MEDIA.forEach(m => response.push(`[${m.type}] ${m.title} - Rating: ${m.rating}/10`));
        break;
      case 'cat writeups.txt':
        WRITEUPS.forEach(w => response.push(`${w.date}: ${w.title}`));
        break;
      case 'cat education.db':
        EDUCATION.forEach(e => response.push(`${e.institution}: ${e.degree} [${e.duration}]`));
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      default:
        if (cmd.startsWith('cat ')) {
          response.push(`Error: Module "${cmd.substring(4)}" not found or encrypted.`);
        } else {
          response.push(`monolith: command not found: ${cmd}`);
        }
    }

    setHistory([...history, ...response]);
    setInput('');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="fixed inset-0 z-40 bg-mono-bg p-4 md:p-8 font-mono text-mono-accent overflow-hidden flex flex-col pt-32 md:pt-36"
    >
      <div className="flex-1 overflow-y-auto space-y-1 mb-4 scrollbar-hide custom-scrollbar">
        {history.map((line, i) => (
          <div key={i} className={`whitespace-pre-wrap ${line.startsWith('user@monolith') ? 'text-white font-bold mt-2' : ''}`}>
            {line}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>
      <form onSubmit={handleCommand} className="flex gap-2 items-center bg-mono-surface border border-mono-border p-3 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
        <span className="text-white shrink-0">user@monolith:~$</span>
        <input 
          autoFocus
          className="flex-1 bg-transparent border-none outline-none text-mono-accent placeholder:text-mono-muted/20"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="input directive..."
        />
        <div className="w-2 h-5 bg-mono-accent animate-pulse" />
      </form>
    </motion.div>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  const [mode, setMode] = useState<'editorial' | 'terminal'>('editorial');
  const [activeSection, setActiveSection] = useState('home');

  // Flicker effect on mode change
  const [flickering, setFlickering] = useState(false);
  useEffect(() => {
    setFlickering(true);
    const timer = setTimeout(() => setFlickering(false), 200);
    return () => clearTimeout(timer);
  }, [mode, activeSection]);

  const [showContact, setShowContact] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<DetailEntry | null>(null);

  return (
    <div className={`relative bg-mono-bg text-gray-400 min-h-screen overflow-x-hidden ${flickering ? 'opacity-70' : 'opacity-100'}`}>
      <Scanlines />
      <ModeToggle mode={mode} setMode={setMode} />
      
      <AnimatePresence mode="wait">
        {mode === 'editorial' ? (
          selectedEntry ? (
            <EntryPage key={`entry-${selectedEntry.section}-${selectedEntry.title}`} entry={selectedEntry} onBack={() => setSelectedEntry(null)} />
          ) : (
            <EditorialView 
              key="editorial" 
              onContact={() => setShowContact(true)} 
              onOpenEntry={setSelectedEntry}
              activeSection={activeSection} 
              setActiveSection={setActiveSection} 
            />
          )
        ) : (
          <TerminalView key="terminal" />
        )}
      </AnimatePresence>

      {/* Contact Modal */}
      <AnimatePresence>
        {showContact && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-xl bg-mono-bg/60">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="terminal-card w-full max-w-lg relative"
            >
              <button 
                onClick={() => setShowContact(false)}
                className="absolute top-4 right-4 text-mono-muted hover:text-mono-accent cursor-pointer"
              >
                [X]_CLOSE
              </button>
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                <Mail size={24} className="text-mono-accent" /> Establish_Connection
              </h2>
              <form className="space-y-6">
                <div>
                  <label className="block font-mono text-xs text-mono-muted uppercase mb-2">Identifier_Name</label>
                  <input type="text" className="w-full bg-mono-bg border border-mono-border p-3 font-mono text-mono-accent outline-none focus:border-mono-accent/50" />
                </div>
                <div>
                  <label className="block font-mono text-xs text-mono-muted uppercase mb-2">Protocol_Email</label>
                  <input type="email" className="w-full bg-mono-bg border border-mono-border p-3 font-mono text-mono-accent outline-none focus:border-mono-accent/50" />
                </div>
                <div>
                  <label className="block font-mono text-xs text-mono-muted uppercase mb-2">Packet_Payload</label>
                  <textarea rows={4} className="w-full bg-mono-bg border border-mono-border p-3 font-mono text-mono-accent outline-none focus:border-mono-accent/50" />
                </div>
                <button className="btn-primary w-full cursor-pointer">
                  SEND_PACKET
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-mono-accent/5 to-transparent pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-64 h-64 bg-mono-accent/5 blur-[120px] rounded-full pointer-events-none" />
    </div>
  );
};

export default App;
