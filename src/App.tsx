import {useState, type CSSProperties} from 'react';
import Markdown from 'react-markdown';
import {
  Award,
  BadgeCheck,
  Code2,
  ExternalLink,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Download,
  MoreVertical,
  ShieldCheck,
  Terminal,
} from 'lucide-react';
import {
  ACHIEVEMENTS,
  CERTIFICATIONS,
  EDUCATION,
  EXPERIENCE,
  PROJECTS,
  TECH_STACK,
  USER_INFO,
  WRITEUPS,
} from './data';

const firstName = USER_INFO.name.split(' ')[0] || USER_INFO.name;
const isProgrammingAchievement = (title: string, issuer: string) => {
  const text = `${title} ${issuer}`.toLowerCase();
  return text.includes('icpc') || text.includes('programming') || text.includes('problem-solving');
};
const achievementScore = (rank: string) => {
  const text = rank.toLowerCase();
  const hashRank = text.match(/#\s*(\d+)/);
  if (hashRank) return Number(hashRank[1]) + 10;
  if (text.includes('1st') || text.includes('champion')) return 1;
  if (text.includes('2nd') || text.includes('runner-up')) return 2;
  if (text.includes('3rd')) return 3;
  if (text.includes('4th')) return 4;
  const numberRank = text.match(/(\d+)(?:st|nd|rd|th)?\s*place/);
  return numberRank ? Number(numberRank[1]) : 999;
};
const sortAchievements = (items: typeof ACHIEVEMENTS) =>
  [...items].sort((a, b) => achievementScore(a.description) - achievementScore(b.description));
const programmingAchievements = sortAchievements(
  ACHIEVEMENTS.filter((item) => isProgrammingAchievement(item.title, item.issuer)),
);
const ctfAchievements = sortAchievements(
  ACHIEVEMENTS.filter((item) => !isProgrammingAchievement(item.title, item.issuer)),
);
const monthIndex = (value: string) => {
  const month = value.slice(0, 3).toLowerCase();
  return {
    jan: 1,
    feb: 2,
    mar: 3,
    apr: 4,
    may: 5,
    jun: 6,
    jul: 7,
    aug: 8,
    sep: 9,
    oct: 10,
    nov: 11,
    dec: 12,
  }[month] || 0;
};
const experienceScore = (date: string) => {
  const year = Number((date.match(/(19|20)\d{2}/)?.[0] || '0'));
  const month = monthIndex(date);
  return year * 100 + month;
};
const featuredExperience = [...EXPERIENCE].sort((a, b) => experienceScore(b.date) - experienceScore(a.date));
const extraProjects = [
  {
    id: 'event-bazar',
    title: 'Event Bazar',
    date: 'GitHub',
    description:
      'A community-powered discovery platform for CTFs, programming contests, hackathons, workshops, and career events.',
    tags: ['Next.js', 'FastAPI', 'PWA'],
    link: 'https://github.com/Emon095/Event_Bazar',
  },
  {
    id: 'swe-project',
    title: 'SWE-Project',
    date: 'GitHub',
    description:
      'A secure information hiding system using steganography with optional password protection and secret extraction.',
    tags: ['Steganography', 'Security', 'Course Project'],
    link: 'https://github.com/Emon095/SWE-Project',
  },
  {
    id: 'hope',
    title: 'Hope - Transparent MicroFinance',
    date: 'GitHub',
    description:
      'A full-stack microfinance loan management MVP for borrower workflows, repayment tracking, and role-based dashboards.',
    tags: ['React', 'Express', 'MongoDB'],
    link: 'https://github.com/hakimshifat/Hope---Transparent-MicroFinance',
  },
];
const allProjects = [...PROJECTS, ...extraProjects];

const socialLinks = [
  {label: 'Instagram', href: 'https://www.instagram.com/shahrier_emon__/', icon: Instagram},
  {label: 'GitHub', href: 'https://github.com/Emon095', icon: Github},
  {label: 'LinkedIn', href: 'https://www.linkedin.com/in/shahrier-emon/', icon: Linkedin},
];

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({behavior: 'smooth', block: 'start'});
};

const formatRank = (value: string) => {
  const rank = value.trim();
  if (!rank) return 'Rank - Listed';
  return /^rank\s*-/i.test(rank) ? rank : `Rank - ${rank}`;
};

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="portfolio-shell">
      <div className="animated-bg" aria-hidden="true" />
      <header className="site-header">
        <button className="brand" onClick={() => scrollTo('home')}>
          <strong>{firstName}</strong>
          <span>{USER_INFO.name.replace(firstName, '')}</span>
        </button>

        <nav className={`nav-links${menuOpen ? ' is-open' : ''}`} aria-label="Primary navigation">
          <button onClick={() => { setMenuOpen(false); scrollTo('home'); }}>Home</button>
          <button onClick={() => { setMenuOpen(false); scrollTo('achievements'); }}>Achievements</button>
          <button onClick={() => { setMenuOpen(false); scrollTo('about'); }}>About</button>
          <button onClick={() => { setMenuOpen(false); scrollTo('projects'); }}>Projects</button>
          <button onClick={() => { setMenuOpen(false); scrollTo('experience'); }}>Experience</button>
          <button onClick={() => { setMenuOpen(false); scrollTo('contact'); }}>Contacts</button>
        </nav>

        <div className="socials">
          {socialLinks.map(({label, href, icon: Icon}) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
              <Icon size={22} strokeWidth={2.4} />
            </a>
          ))}
        </div>
        <button
          className="mobile-menu-button"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <MoreVertical size={22} />
        </button>
      </header>

      <section id="home" className="hero-section">
        <div className="grain" />

        <div className="hero-content">
          <div className="hero-copy">
            <p className="intro hero-reveal delay-1">Hi, I&apos;m {USER_INFO.name}</p>
            <h1 className="hero-reveal delay-2">I&apos;m a Cybersecurity Researcher</h1>
            <p className="summary hero-reveal delay-3">
              CSE student, CTF player, and founder of RAB. I build security tools, research vulnerable systems,
              and turn hard technical problems into practical defenses.
            </p>
            <div className="hero-actions hero-reveal delay-4">
              <button className="underline-link" onClick={() => scrollTo('achievements')}>
                View My Achievements
              </button>
              <a className="cv-download" href="/files/SM-Shahrier-Emon-CV.pdf" download>
                <Download size={19} />
                Download My CV
              </a>
            </div>
          </div>

          <div className="portrait-wrap hero-reveal delay-3" aria-label={`${USER_INFO.name} portrait`}>
            <span className="portrait-label" aria-hidden="true">Shahrier</span>
            <img src={USER_INFO.image} alt={USER_INFO.name} className="portrait" />
          </div>
        </div>
      </section>

      <section id="achievements" className="content-section reveal-section">
        <div className="section-heading reveal-up">
          <span>Competition Records</span>
          <h2>Achievements</h2>
        </div>
        <div className="achievement-subsection reveal-up">
          <div className="achievement-subtitle">
            <span>01</span>
            <h3>Programming</h3>
          </div>
          <div className="achievement-grid programming-grid">
            {programmingAchievements.map((item, index) => (
              <article key={item.id} className="achievement-card reveal-card" style={{'--delay': `${index * 55}ms`} as CSSProperties}>
                <div className="achievement-card-top">
                  <Award size={22} />
                  <span>{item.category}</span>
                </div>
                <p className="meta">{item.date || 'Programming Record'}</p>
                <h3>{item.title}</h3>
                <p className="achievement-rank">{formatRank(item.description)}</p>
                <div className="achievement-foot">
                  <span>{item.issuer}</span>
                  <span>CP</span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="achievement-subsection reveal-up">
          <div className="achievement-subtitle">
            <span>02</span>
            <h3>CTF</h3>
          </div>
          <div className="achievement-grid">
            {ctfAchievements.map((item, index) => (
              <article key={item.id} className="achievement-card reveal-card" style={{'--delay': `${index * 55}ms`} as CSSProperties}>
                <div className="achievement-card-top">
                  <Award size={22} />
                  <span>{item.category}</span>
                </div>
                <p className="meta">{item.date || 'CTF Record'}</p>
                <h3>{item.title}</h3>
                <p className="achievement-rank">{formatRank(item.description)}</p>
                <div className="achievement-foot">
                  <span>{item.issuer}</span>
                  <span>RAB</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="content-section about-section reveal-section">
        <div className="section-heading reveal-up">
          <span>Profile</span>
          <h2>About</h2>
        </div>
        <div className="about-layout">
          <div className="about-copy reveal-left">
            <div className="markdown"><Markdown>{USER_INFO.bio}</Markdown></div>
          </div>
          <aside className="profile-panel reveal-right">
            <div>
              <MapPin size={19} />
              <span>{USER_INFO.location}</span>
            </div>
            <div>
              <Terminal size={19} />
              <span>Building: {USER_INFO.currentlyBuilding || 'Security research tools'}</span>
            </div>
            <div className="tech-stack">
              {TECH_STACK.map((tech) => <span key={tech}>{tech}</span>)}
            </div>
          </aside>
        </div>
        <div className="education-block reveal-up">
          <div className="section-heading compact">
            <span>Academic Track</span>
            <h2>Education</h2>
          </div>
          <div className="education-list">
            {EDUCATION.map((edu, index) => (
              <article key={edu.id} className="education-card reveal-card" style={{'--delay': `${index * 80}ms`} as CSSProperties}>
                <p className="meta">{edu.duration}</p>
                <h3>{edu.institution}</h3>
                <span>{edu.degree}</span>
                <div className="markdown muted">
                  <Markdown>{edu.details}</Markdown>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="content-section reveal-section">
        <div className="reveal-left">
          <div className="section-heading compact">
            <span>Timeline</span>
            <h2>Experience</h2>
          </div>
          <div className="timeline">
            {featuredExperience.map((item, index) => (
              <article key={item.id} className="reveal-card" style={{'--delay': `${index * 80}ms`} as CSSProperties}>
                <p>{item.date}</p>
                <h3>{item.title}</h3>
                <span>{item.organization}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="content-section reveal-section">
        <div className="section-heading reveal-up">
          <span>Selected Builds</span>
          <h2>Projects</h2>
        </div>
        <div className="project-grid">
          {allProjects.map((project, index) => (
            <article key={project.id} className="project-card reveal-card" style={{'--delay': `${index * 75}ms`} as CSSProperties}>
              <a className="project-toplink" href={project.link || '#'} target={project.link ? '_blank' : undefined} rel={project.link ? 'noreferrer' : undefined}>
                <div className="card-icon"><Code2 size={22} /></div>
                <ExternalLink size={16} />
              </a>
              <p className="meta">{project.date || 'Project'}</p>
              <h3>{project.title}</h3>
              <div className="markdown muted">
                <Markdown>{project.description}</Markdown>
              </div>
              <div className="tags">
                {project.tags.slice(0, 5).map((tag) => <span key={tag}>{tag}</span>)}
              </div>
              {project.link ? (
                <a className="project-link" href={project.link} target="_blank" rel="noreferrer">
                  Open Repository <ExternalLink size={14} />
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section id="certifications" className="content-section reveal-section">
        <div className="section-heading reveal-up">
          <span>Validation</span>
          <h2>Certifications</h2>
        </div>
        <div className="cert-grid">
          {CERTIFICATIONS.map((cert, index) => (
            <article key={cert.id} className="cert-card reveal-card" style={{'--delay': `${index * 90}ms`} as CSSProperties}>
              <div className="cert-badge">
                <BadgeCheck size={24} />
              </div>
              <div>
                <p className="meta">{cert.date || 'Certified'}</p>
                <h3>{cert.title}</h3>
                <span>{cert.issuer}</span>
                <div className="markdown muted">
                  <Markdown>{cert.description}</Markdown>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="contact-section reveal-section">
        <div>
          <ShieldCheck size={30} />
          <h2>Let&apos;s build something secure.</h2>
          <p>Available for cybersecurity research, CTF collaboration, and software development projects.</p>
        </div>
        <a href="mailto:smshahrieremon@gmail.com" className="contact-button">
          <Mail size={20} />
          Contact Me
        </a>
      </section>

      <footer>
        <span>{USER_INFO.name}</span>
        <span>{EDUCATION[0]?.institution || 'Bangladesh University of Professionals'}</span>
      </footer>
    </main>
  );
}

export default App;
