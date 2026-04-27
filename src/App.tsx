import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { 
  Terminal as TerminalIcon, 
  Layout as LayoutIcon, 
  Github, 
  Twitter, 
  Instagram,
  Linkedin,
  Mail, 
  ExternalLink, 
  Search, 
  Code2, 
  ShieldCheck, 
  Cpu, 
  Trophy,
  ChevronRight,
  Monitor,
  Moon,
  Sun
} from 'lucide-react';
import { USER_INFO, PROJECTS, ACHIEVEMENTS, CERTIFICATIONS, MEDIA, TECH_STACK, EDUCATION, WRITEUPS, EXPERIENCE } from './data';

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
  section: 'writeups' | 'achievements' | 'experience' | 'media';
};

const Scanlines = () => <div className="scanlines" />;

type ThemeMode = 'light' | 'dark' | 'classic';

const ModeToggle = ({ mode, setMode, theme }: { mode: 'editorial' | 'terminal', setMode: (m: 'editorial' | 'terminal') => void, theme: ThemeMode }) => (
  <div className={`fixed top-4 right-4 md:top-8 md:right-8 z-[60] flex items-center gap-2 backdrop-blur-md p-1 rounded-full border ${mode === 'editorial' ? (theme === 'dark' ? 'bg-[#171717]/85 border-white/15' : 'bg-white/85 border-black/20') : 'bg-mono-surface/80 border-mono-border'}`}>
    <button 
      onClick={() => setMode('editorial')}
      className={`p-2 rounded-full transition-all cursor-pointer ${mode === 'editorial' ? (theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white') : 'text-mono-muted hover:text-white'}`}
      title="Editorial View"
    >
      <LayoutIcon size={18} />
    </button>
    <button 
      onClick={() => setMode('terminal')}
      className={`p-2 rounded-full transition-all cursor-pointer ${mode === 'terminal' ? 'bg-mono-accent text-mono-bg' : mode === 'editorial' ? (theme === 'dark' ? 'text-white/65 hover:text-white' : 'text-black/60 hover:text-black') : 'text-mono-muted hover:text-white'}`}
      title="Terminal View"
    >
      <TerminalIcon size={18} />
    </button>
  </div>
);

// --- Editorial View Components ---

const EditorialView = ({ onContact, onOpenEntry, activeSection, setActiveSection, theme, onToggleTheme }: { onContact: () => void, onOpenEntry: (entry: DetailEntry) => void, activeSection: string, setActiveSection: (s: string) => void, theme: ThemeMode, onToggleTheme: () => void }) => {
  const isHome = true;
  const isLight = theme !== 'dark';
  const isClassic = theme === 'classic';
  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_420px] items-center gap-14 lg:gap-8 py-8 md:py-12"
          >
            <div className="max-w-xl text-left lg:pl-8">
              <h1 className={`text-5xl md:text-6xl lg:text-7xl font-sans font-semibold tracking-tight ${isLight ? 'text-[#0f0f0f]' : 'text-white'}`}>
                {USER_INFO.name}
              </h1>
              <div className={`mt-7 text-xl md:text-[34px] leading-tight ${isLight ? 'text-[#151515]' : 'text-white/90'}`}>
                <span className="inline-block mr-3 text-2xl md:text-3xl align-middle">-</span>
                <span className={`font-semibold px-2 py-1 ${isLight ? 'bg-[#efbbab] text-[#111]' : 'bg-white/15 text-white'}`}>
                  {USER_INFO.role}
                </span>
              </div>
              <p className={`mt-5 max-w-3xl text-[22px] md:text-[24px] leading-relaxed ${isLight ? 'text-[#303030]' : 'text-white/75'}`}>
                Cybersecurity enthusiast and CSE student at Bangladesh University of Professionals. Founder of RAB (top-ranked CTF team). Campus Ambassador at Hackvisor and Joint Secretary (Cyber Security) at BUP Computer Programming Club. Passionate about reverse engineering and system security.
              </p>
              <div className="mt-10 flex items-center gap-4">
                <button onClick={() => setActiveSection('profile')} className={`px-1 py-2 text-sm font-bold tracking-wide uppercase cursor-pointer transition-colors border-b ${isLight ? 'text-black border-black hover:opacity-70' : 'text-white border-white hover:opacity-80'}`}>
                  About Me
                </button>
                <button onClick={() => setActiveSection('projects')} className={`px-5 py-4 border text-sm font-semibold tracking-wide uppercase cursor-pointer transition-all ${isLight ? 'border-black text-black hover:bg-black hover:text-white' : 'border-white/70 text-white hover:bg-white hover:text-black'}`}>
                  Projects
                </button>
              </div>
              <div className={`mt-10 flex items-center gap-4 ${isLight ? 'text-[#444]' : 'text-white/70'}`}>
                <button onClick={() => setActiveSection('writeups')} className={`w-10 h-10 border flex items-center justify-center text-lg cursor-pointer transition-colors ${isLight ? 'border-black hover:bg-black hover:text-white' : 'border-white/70 hover:bg-white hover:text-black'}`}>
                  ↓
                </button>
                <span className="text-sm">Scroll Down</span>
              </div>
            </div>

            <div className="relative w-full flex justify-center lg:justify-end lg:pr-10">
              <div className="relative w-[320px] h-[430px] md:w-[360px] md:h-[490px]">
                <div className={`absolute inset-0 border-4 translate-x-4 translate-y-4 ${isLight ? 'border-black' : 'border-white/90'}`} />
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={USER_INFO.image}
                    alt={USER_INFO.name}
                    className="w-full h-full object-cover saturate-110"
                  />
                </div>
              </div>
              <span className={`absolute left-[calc(50%-16px)] top-[48%] w-4 h-4 rotate-45 ${isLight ? 'bg-[#ef5c2e] border border-black' : 'bg-[#ffc98f] border border-white/80'}`} />
              <div className="absolute right-[-2.9rem] md:right-[-3.4rem] top-1/2 -translate-y-1/2 flex flex-col gap-3">
                <a href="https://www.instagram.com/shahrier_emon__/" target="_blank" rel="noreferrer" className={`w-10 h-10 flex items-center justify-center transition-colors ${isLight ? 'bg-[#6d6d6d] text-white hover:bg-black' : 'bg-white/20 text-white hover:bg-white hover:text-black'}`}>
                  <Instagram size={16} />
                </a>
                <a href="https://www.linkedin.com/in/shahrier-emon/" target="_blank" rel="noreferrer" className={`w-10 h-10 flex items-center justify-center transition-colors ${isLight ? 'bg-[#6d6d6d] text-white hover:bg-black' : 'bg-white/20 text-white hover:bg-white hover:text-black'}`}>
                  <Linkedin size={16} />
                </a>
                <a href="https://github.com/Emon095" target="_blank" rel="noreferrer" className={`w-10 h-10 flex items-center justify-center transition-colors ${isLight ? 'bg-[#6d6d6d] text-white hover:bg-black' : 'bg-white/20 text-white hover:bg-white hover:text-black'}`}>
                  <Github size={16} />
                </a>
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
            <div className="relative mt-10">
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-mono-border/70 -translate-x-1/2" />
              <div className="space-y-10 md:space-y-14">
                {EDUCATION.map((edu, i) => {
                  const isLeft = i % 2 === 0;
                  return (
                    <div key={i} className={`relative flex md:block ${isLeft ? 'md:pr-[52%]' : 'md:pl-[52%]'}`}>
                      <div className={`terminal-card w-full ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                        <div className="font-mono text-sm text-mono-accent mb-2 uppercase tracking-widest">{edu.duration}</div>
                        <h3 className="text-3xl font-display text-white mb-2">{edu.institution}</h3>
                        <p className="text-xl text-mono-muted italic font-display mb-6">{edu.degree}</p>
                        <div className="text-sm text-mono-muted leading-relaxed">
                          <Markdown>{safeText(edu.details)}</Markdown>
                        </div>
                      </div>
                      <div className="hidden md:block absolute left-1/2 top-8 -translate-x-1/2 w-3 h-3 rounded-full bg-mono-accent shadow-[0_0_0_4px_rgba(8,8,8,1)]" />
                      <div className={`hidden md:block absolute top-8 w-10 h-px bg-mono-border ${isLeft ? 'right-[50%]' : 'left-[50%]'}`} />
                    </div>
                  );
                })}
                <div className="hidden md:block absolute left-1/2 bottom-0 -translate-x-1/2 w-3 h-3 rounded-full border border-mono-border bg-mono-bg" />
              </div>
            </div>
          </motion.div>
        );
      case 'achievements':
        {
          const groupedAchievements: Array<{
            category: 'International' | 'National' | 'Inter University';
            heroTitle: string;
            heroSubtitle: string;
            items: typeof ACHIEVEMENTS;
          }> = [
            {
              category: 'International',
              heroTitle: 'International Highlights',
              heroSubtitle: 'Global CTF rankings and placements',
              items: ACHIEVEMENTS.filter((item) => item.category === 'International'),
            },
            {
              category: 'National',
              heroTitle: 'National Highlights',
              heroSubtitle: 'Top placements across national events',
              items: ACHIEVEMENTS.filter((item) => item.category === 'National'),
            },
            {
              category: 'Inter University',
              heroTitle: 'Inter University Highlights',
              heroSubtitle: 'University-level CTF accomplishments',
              items: ACHIEVEMENTS.filter((item) => item.category === 'Inter University'),
            },
          ].filter((group) => group.items.length > 0);

        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12"
          >
            <div className="column-title">Achievements_Record</div>
            <div className="space-y-14 mt-8">
              {groupedAchievements.map((group) => {
                const categoryHeroImage = group.items.find((entry) => entry.heroImage)?.heroImage;
                return (
                  <section key={group.category} className="space-y-8">
                    <div className="flex items-center gap-4">
                      <h3 className="text-xl md:text-2xl font-display italic text-white">{group.category}</h3>
                      <div className="h-px flex-1 bg-mono-border" />
                    </div>
                    <div className="terminal-card p-0 overflow-hidden">
                      {categoryHeroImage ? (
                        <div className="relative h-48 md:h-56">
                          <img src={categoryHeroImage} alt={`${group.category} hero`} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-r from-black/65 to-black/20" />
                          <div className="absolute left-6 bottom-6">
                            <div className="text-2xl md:text-3xl font-display text-white">{group.heroTitle}</div>
                            <div className="font-mono text-xs uppercase tracking-[2px] text-white/80 mt-1">{group.heroSubtitle}</div>
                          </div>
                        </div>
                      ) : (
                        <div className="h-40 md:h-48 bg-gradient-to-r from-mono-surface to-mono-bg flex flex-col justify-center px-6">
                          <div className="text-2xl md:text-3xl font-display text-white">{group.heroTitle}</div>
                          <div className="font-mono text-xs uppercase tracking-[2px] text-mono-muted mt-1">{group.heroSubtitle}</div>
                        </div>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      {group.items.map((ach) => (
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
                  </section>
                );
              })}
            </div>
          </motion.div>
        );
        }
      case 'experience':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12 md:py-16"
          >
            <div className="text-center border-y border-mono-border py-10 md:py-12">
              <h2 className="text-5xl md:text-6xl font-display italic text-white">Experience</h2>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[4px] text-mono-muted">
                Professional_Journey // Page_1
              </p>
            </div>
            {EXPERIENCE.length === 0 ? (
              <div className="terminal-card mt-8 text-sm text-mono-muted">
                No experience entries found. Add markdown files in <code>src/content/experience</code> to populate this section.
              </div>
            ) : (
              <div className="relative mt-14 max-w-6xl mx-auto">
                <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-mono-border/60" />
                {EXPERIENCE.map((exp) => (
                  <div key={exp.id} className="relative pl-14 md:pl-24 py-8 md:py-10 border-b border-mono-border/30 last:border-b-0">
                    <span className="absolute left-[9px] md:left-[25px] top-12 w-3 h-3 rounded-full border border-mono-accent/80 bg-mono-bg" />
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 md:gap-10 items-start">
                      <div
                        onClick={() => onOpenEntry({
                          title: exp.title,
                          meta: `${formatDate(exp.date)}${exp.organization ? ` · ${exp.organization}` : ''}`,
                          content: safeText(exp.content, exp.description),
                          heroImage: exp.heroImage,
                          section: 'experience',
                        })}
                        className="group cursor-pointer"
                      >
                        <h3 className="text-4xl md:text-5xl font-display leading-tight text-white group-hover:text-mono-accent transition-colors">
                          {exp.title}
                          {exp.organization ? ` @ ${exp.organization}` : ''}
                        </h3>
                        {exp.link ? (
                          <a
                            href={exp.link}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(event) => event.stopPropagation()}
                            className="inline-flex items-center gap-2 mt-3 font-mono text-base md:text-xl text-mono-accent hover:text-white transition-colors break-all"
                          >
                            @ {exp.link}
                            <ExternalLink size={16} />
                          </a>
                        ) : null}
                        <div className="mt-5 flex flex-wrap gap-2">
                          {exp.type ? (
                            <span className="px-3 py-1 border border-mono-accent/40 bg-mono-accent/5 font-mono text-[10px] uppercase tracking-[2px] text-mono-accent">
                              {exp.type}
                            </span>
                          ) : null}
                          {exp.mode ? (
                            <span className="px-3 py-1 border border-mono-border font-mono text-[10px] uppercase tracking-[2px] text-mono-muted">
                              {exp.mode}
                            </span>
                          ) : null}
                          {exp.tags.map((tag) => (
                            <span key={tag} className="px-3 py-1 border border-mono-border/70 font-mono text-[10px] uppercase tracking-[2px] text-mono-muted">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="mt-6 text-base text-mono-muted leading-relaxed max-w-3xl">
                          <Markdown>{safeText(exp.description)}</Markdown>
                        </div>
                        <button className="mt-6 text-[11px] font-mono uppercase tracking-[3px] text-mono-muted hover:text-white transition-colors">
                          View_Details →
                        </button>
                      </div>
                      <div className="md:text-right">
                        <div className="font-mono text-xs uppercase tracking-[3px] text-mono-muted whitespace-nowrap">
                          {formatDate(exp.date)}
                        </div>
                        {exp.mode ? (
                          <div className="mt-2 font-mono text-[10px] uppercase tracking-[2px] text-mono-muted">
                            {exp.mode}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
      className={`${theme === 'dark' ? 'theme-dark bg-[#0e0e0e] text-[#ececec] shadow-[0_30px_70px_rgba(0,0,0,0.52)]' : theme === 'classic' ? 'theme-classic bg-[#e7dfd1] text-[#2a2118] shadow-[0_24px_56px_rgba(49,33,20,0.2)]' : 'theme-light bg-[#ececed] text-[#161616] shadow-[0_26px_60px_rgba(0,0,0,0.22)]'} min-h-screen w-full max-w-[1160px] mx-auto flex flex-col mt-6 md:mt-10 px-6 md:px-12 lg:px-16 pt-8 md:pt-10 pb-10 md:pb-14`}
    >
      {/* Header Section */}
      <header className={`flex flex-col md:flex-row justify-between items-center ${isHome ? 'pb-7 mb-4 gap-6' : 'border-b border-mono-border pb-8 mb-8 gap-8'}`}>
        <div className="name-title flex items-center gap-3">
          {isHome ? <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${isLight ? 'bg-black text-white' : 'bg-white text-black'}`}>{safeText(USER_INFO.name).charAt(0).toUpperCase() || 'U'}</span> : null}
          <button 
            onClick={() => setActiveSection('home')}
            className={`${isHome ? (isLight ? 'text-base md:text-lg font-semibold text-[#111]' : 'text-base md:text-lg font-semibold text-white') : 'text-2xl md:text-3xl font-display font-normal text-white'} leading-none tracking-tight hover:opacity-70 transition-opacity cursor-pointer`}
          >
            {isHome ? USER_INFO.name : 'kathos'} {!isHome ? <span className="text-xs font-mono text-mono-muted align-top tracking-widest ml-2">[{safeText(USER_INFO.name).split(' ')[2] || 'USER'}]</span> : null}
          </button>
        </div>
        <nav className={`flex flex-wrap justify-center ${isHome ? 'gap-4 md:gap-6 text-sm tracking-wide' : 'gap-4 md:gap-8 text-[11px] uppercase tracking-[2px]'} font-sans`}>
          {[
            { id: 'home', label: 'Home' },
            { id: 'profile', label: 'About' },
            { id: 'projects', label: 'Projects' },
            { id: 'writeups', label: 'Writeups' },
            { id: 'education', label: 'Education' },
            { id: 'achievements', label: 'Achievements' },
            { id: 'experience', label: 'Experience' },
            { id: 'certifications', label: 'Certifications' },
            { id: 'media', label: 'Media' },
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveSection(item.id)} 
              className={`${isHome ? (isLight ? 'hover:text-black' : 'hover:text-white') : 'hover:text-white'} cursor-pointer transition-all relative py-2 ${activeSection === item.id ? (isHome ? (isLight ? 'text-black' : 'text-white') : 'text-white') : (isHome ? (isLight ? 'text-[#595959]' : 'text-white/60') : 'text-mono-muted')}`}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.div layoutId="nav-underline" className={`absolute bottom-0 left-0 right-0 h-px ${isHome ? (isLight ? 'bg-black' : 'bg-white') : 'bg-mono-accent'}`} />
              )}
            </button>
          ))}
          <button onClick={onContact} className={`${isHome ? `${isLight ? 'text-black border-black' : 'text-white border-white'} font-bold py-2 ml-2 border-b hover:opacity-80` : 'text-mono-accent hover:text-white py-2 border-l border-mono-border pl-6 ml-2'} cursor-pointer transition-colors`}>
            {isHome ? 'Contact Me' : 'Connect'}
          </button>
          {isHome ? (
            <button onClick={onToggleTheme} className={`px-2 cursor-pointer transition-colors ${isLight ? 'text-[#666] hover:text-black' : 'text-white/70 hover:text-white'}`} aria-label="Toggle theme">
              {theme === 'light' ? <Moon size={16} /> : theme === 'dark' ? <Sun size={16} /> : <Monitor size={16} />}
            </button>
          ) : null}
        </nav>
      </header>

      {/* Dynamic Content Area */}
      <main className="flex-1 flex flex-col">
        {renderContent()}
      </main>

      {/* Footer */}
      {!isHome ? (
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
      ) : null}
    </motion.div>
  );
};

const EntryPage = ({ entry, onBack, theme }: { entry: DetailEntry; onBack: () => void, theme: ThemeMode }) => {
  const isLight = theme !== 'dark';
  const sectionName = entry.section === 'writeups'
    ? 'Writeups'
    : entry.section === 'achievements'
      ? 'Achievements'
      : entry.section === 'experience'
        ? 'Experience'
        : 'Media';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className={`${theme === 'dark' ? 'theme-dark bg-[#0e0e0e] text-[#ececec] shadow-[0_30px_70px_rgba(0,0,0,0.52)]' : theme === 'classic' ? 'theme-classic bg-[#e7dfd1] text-[#2a2118] shadow-[0_24px_56px_rgba(49,33,20,0.2)]' : 'theme-light bg-[#ececed] text-[#161616] shadow-[0_26px_60px_rgba(0,0,0,0.22)]'} min-h-screen w-full max-w-[1160px] mx-auto mt-6 md:mt-10 pb-16 px-6 md:px-12 lg:px-16 pt-10`}
    >
      <div className="max-w-5xl mx-auto">
        <button
          onClick={onBack}
          className={`text-xs font-mono uppercase tracking-[2px] text-mono-muted transition-colors mb-8 cursor-pointer ${isLight ? 'hover:text-black' : 'hover:text-white'}`}
        >
          [Back_To_{sectionName}]
        </button>
        <div className="border-b border-mono-border pb-6 mb-8">
          <h1 className={`text-4xl md:text-5xl font-display leading-tight ${isLight ? 'text-[#121212]' : 'text-white'}`}>{entry.title}</h1>
          {entry.meta ? <p className="mt-3 text-xs uppercase tracking-[2px] text-mono-muted">{entry.meta}</p> : null}
        </div>
        {entry.heroImage ? (
          <div className="mb-8 border border-mono-border/50 overflow-hidden">
            <img src={entry.heroImage} alt={entry.title} className="w-full max-h-[460px] object-cover" />
          </div>
        ) : null}
        <article className={`terminal-card prose max-w-none text-mono-muted ${isLight ? '' : 'prose-invert'}`}>
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
        response.push('achievements.log  experience.log  certifications.log  education.db  projects.list  media.archive  writeups.txt');
        break;
      case 'cat achievements.log':
        ACHIEVEMENTS.forEach(a => response.push(`[${a.date}] ${a.title} - ${a.issuer}`));
        break;
      case 'cat experience.log':
        EXPERIENCE.forEach(e => response.push(`[${e.date}] ${e.title}${e.organization ? ` - ${e.organization}` : ''}`));
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
  const [theme, setTheme] = useState<ThemeMode>('classic');
  const isEditorial = mode === 'editorial';

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
    <div className={`relative min-h-screen overflow-x-hidden ${isEditorial ? (theme === 'dark' ? 'bg-[#090909] text-[#ededed]' : theme === 'classic' ? 'bg-[#d4c9b6] text-[#2a2118]' : 'bg-[#d8d8d8] text-[#1a1a1a]') : 'bg-mono-bg text-gray-400'} ${flickering ? 'opacity-70' : 'opacity-100'}`}>
      {!isEditorial ? <Scanlines /> : null}
      <ModeToggle mode={mode} setMode={setMode} theme={theme} />
      
      <AnimatePresence mode="wait">
        {mode === 'editorial' ? (
          selectedEntry ? (
            <EntryPage key={`entry-${selectedEntry.section}-${selectedEntry.title}`} entry={selectedEntry} onBack={() => setSelectedEntry(null)} theme={theme} />
          ) : (
            <EditorialView 
              key="editorial" 
              onContact={() => setShowContact(true)} 
              onOpenEntry={setSelectedEntry}
              activeSection={activeSection} 
              setActiveSection={setActiveSection}
              theme={theme}
              onToggleTheme={() => setTheme((prev) => (prev === 'light' ? 'dark' : prev === 'dark' ? 'classic' : 'light'))}
            />
          )
        ) : (
          <TerminalView key="terminal" />
        )}
      </AnimatePresence>

      {/* Contact Modal */}
      <AnimatePresence>
        {showContact && (
          <div className={`fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-xl ${isEditorial ? (theme === 'dark' ? 'bg-black/55' : 'bg-black/25') : 'bg-mono-bg/60'}`}>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`${isEditorial ? (theme === 'dark' ? 'theme-dark' : theme === 'classic' ? 'theme-classic' : 'theme-light') : ''} terminal-card w-full max-w-lg relative`}
            >
              <button 
                onClick={() => setShowContact(false)}
                className={`absolute top-4 right-4 ${isEditorial ? (theme === 'dark' ? 'text-white/65 hover:text-white' : 'text-black/55 hover:text-black') : 'text-mono-muted hover:text-mono-accent'} cursor-pointer`}
              >
                [X]_CLOSE
              </button>
              <h2 className={`text-2xl font-bold mb-8 flex items-center gap-2 ${isEditorial ? (theme === 'dark' ? 'text-white' : 'text-black') : ''}`}>
                <Mail size={24} className={`${isEditorial ? (theme === 'dark' ? 'text-white' : 'text-black') : 'text-mono-accent'}`} /> Establish_Connection
              </h2>
              <form className="space-y-6">
                <div>
                  <label className="block font-mono text-xs text-mono-muted uppercase mb-2">Identifier_Name</label>
                  <input type="text" className={`w-full border border-mono-border p-3 font-mono text-mono-accent outline-none focus:border-mono-accent/50 ${isEditorial ? (theme === 'dark' ? 'bg-white/5' : 'bg-white/70') : 'bg-mono-bg'}`} />
                </div>
                <div>
                  <label className="block font-mono text-xs text-mono-muted uppercase mb-2">Protocol_Email</label>
                  <input type="email" className={`w-full border border-mono-border p-3 font-mono text-mono-accent outline-none focus:border-mono-accent/50 ${isEditorial ? (theme === 'dark' ? 'bg-white/5' : 'bg-white/70') : 'bg-mono-bg'}`} />
                </div>
                <div>
                  <label className="block font-mono text-xs text-mono-muted uppercase mb-2">Packet_Payload</label>
                  <textarea rows={4} className={`w-full border border-mono-border p-3 font-mono text-mono-accent outline-none focus:border-mono-accent/50 ${isEditorial ? (theme === 'dark' ? 'bg-white/5' : 'bg-white/70') : 'bg-mono-bg'}`} />
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
      {!isEditorial ? (
        <>
          <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-mono-accent/5 to-transparent pointer-events-none" />
          <div className="fixed bottom-0 right-0 w-64 h-64 bg-mono-accent/5 blur-[120px] rounded-full pointer-events-none" />
        </>
      ) : null}
    </div>
  );
};

export default App;
