export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  date: string;
  heroImage?: string;
}

export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  heroImage?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  heroImage?: string;
}

export interface MediaRecord {
  id: string;
  title: string;
  type: 'Movie' | 'Series' | 'Book';
  status: 'Completed' | 'Watching' | 'Planned';
  rating?: number;
  date: string;
  heroImage?: string;
}

type MarkdownRecord = Record<string, string>;

const toId = (value: string, fallback: string) =>
  (value || fallback)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const getSortedRawContents = (files: Record<string, string>): string[] =>
  Object.entries(files)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, content]) => content);

const parseKeyValueDocument = (raw: string): MarkdownRecord => {
  const result: MarkdownRecord = {};
  raw
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .forEach((line) => {
      const normalized = line.startsWith('- ') ? line.slice(2).trim() : line;
      const idx = normalized.indexOf(':');
      if (idx === -1) return;
      const key = normalized.slice(0, idx).trim().toLowerCase();
      const value = normalized.slice(idx + 1).trim();
      if (key) result[key] = value;
    });
  return result;
};

const parseCollection = (files: Record<string, string>): MarkdownRecord[] =>
  getSortedRawContents(files)
    .map((raw) => parseKeyValueDocument(raw))
    .filter((item) => Object.keys(item).length > 0);

const mergeKeyValueCollection = (files: Record<string, string>): MarkdownRecord =>
  parseCollection(files).reduce<MarkdownRecord>((acc, item) => ({...acc, ...item}), {});

const homeFiles = import.meta.glob('./content/home/*.md', {eager: true, query: '?raw', import: 'default'}) as Record<string, string>;
const aboutFiles = import.meta.glob('./content/about/*.md', {eager: true, query: '?raw', import: 'default'}) as Record<string, string>;
const certificationFiles = import.meta.glob('./content/certifications/*.md', {eager: true, query: '?raw', import: 'default'}) as Record<string, string>;
const achievementFiles = import.meta.glob('./content/achievements/*.md', {eager: true, query: '?raw', import: 'default'}) as Record<string, string>;
const projectFiles = import.meta.glob('./content/projects/*.md', {eager: true, query: '?raw', import: 'default'}) as Record<string, string>;
const writeupFiles = import.meta.glob('./content/writeups/*.md', {eager: true, query: '?raw', import: 'default'}) as Record<string, string>;
const educationFiles = import.meta.glob('./content/education/*.md', {eager: true, query: '?raw', import: 'default'}) as Record<string, string>;
const vaultFiles = import.meta.glob('./content/vault/*.md', {eager: true, query: '?raw', import: 'default'}) as Record<string, string>;

const home = mergeKeyValueCollection(homeFiles);
const about = mergeKeyValueCollection(aboutFiles);
const certifications = parseCollection(certificationFiles);
const achievements = parseCollection(achievementFiles);
const projects = parseCollection(projectFiles);
const writeups = parseCollection(writeupFiles);
const education = parseCollection(educationFiles);
const vault = parseCollection(vaultFiles);

export const USER_INFO = {
  name: home.name || 'SM Shahrier Emon',
  role: home.role || 'Researcher',
  bio: about.bio || '',
  location: home.location || '',
  image: home.image || '',
  currentlyBuilding: home.current_building || '',
  github: 'ShahrierEmon',
  twitter: '@ShahrierEmon',
  email: 'shahrier.emon@example.com',
};

export const TECH_STACK = (about.tech_stack || '')
  .split(',')
  .map((item) => item.trim())
  .filter(Boolean);

export const PROJECTS: Project[] = projects.map((item, index) => ({
  id: toId(item.title || '', `project-${index + 1}`),
  title: item.title || 'Untitled Project',
  description: item.desc || '',
  tags: (item.tags || '')
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean),
  link: item.link || undefined,
  date: item.date || '',
  heroImage: item.hero_image || item.image || undefined,
}));

export const CERTIFICATIONS: Certification[] = certifications.map((item, index) => ({
  id: toId(item.title || '', `certification-${index + 1}`),
  title: item.title || 'Untitled Certification',
  issuer: item.issuer || '',
  date: item.date || '',
  description: item.desc || '',
  heroImage: item.hero_image || item.image || undefined,
}));

export const ACHIEVEMENTS: Achievement[] = achievements.map((item, index) => ({
  id: toId(item.title || '', `achievement-${index + 1}`),
  title: item.title || 'Untitled Achievement',
  issuer: item.issuer || '',
  date: item.date || '',
  description: item.desc || '',
  heroImage: item.hero_image || item.image || undefined,
}));

export const WRITEUPS = writeups.map((item, index) => ({
  id: toId(item.title || '', `writeup-${index + 1}`),
  title: item.title || 'Untitled Writeup',
  date: item.date || '',
  category: item.category || 'General',
  excerpt: item.desc || '',
  heroImage: item.hero_image || item.image || undefined,
}));

export const EDUCATION = education.map((item, index) => ({
  id: toId(item.institution || '', `education-${index + 1}`),
  institution: item.institution || '',
  degree: item.degree || '',
  duration: item.duration || '',
  details: item.details || '',
}));

export const MEDIA: MediaRecord[] = vault.map((item, index) => ({
  id: toId(item.title || '', `media-${index + 1}`),
  title: item.title || 'Untitled',
  type: (item.type as MediaRecord['type']) || 'Series',
  status: (item.status as MediaRecord['status']) || 'Completed',
  rating: item.rating ? Number(item.rating) : undefined,
  date: item.date || '',
  heroImage: item.hero_image || item.image || undefined,
}));
