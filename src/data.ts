import aboutRaw from './content/about.md?raw';
import certificationsRaw from './content/certifications.md?raw';
import educationRaw from './content/education.md?raw';
import homeRaw from './content/home.md?raw';
import projectsRaw from './content/projects.md?raw';
import vaultRaw from './content/vault.md?raw';
import writeupsRaw from './content/writeups.md?raw';

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  date: string;
}

export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
}

export interface MediaRecord {
  id: string;
  title: string;
  type: 'Movie' | 'Series' | 'Book';
  status: 'Completed' | 'Watching' | 'Planned';
  rating?: number;
  date: string;
}

type MarkdownRecord = Record<string, string>;

const toId = (value: string, fallback: string) =>
  (value || fallback)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const parseKeyValueDocument = (raw: string): MarkdownRecord => {
  const result: MarkdownRecord = {};
  raw
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .forEach((line) => {
      const idx = line.indexOf(':');
      if (idx === -1) return;
      const key = line.slice(0, idx).trim().toLowerCase();
      const value = line.slice(idx + 1).trim();
      if (key) result[key] = value;
    });
  return result;
};

const parseListDocument = (raw: string): MarkdownRecord[] =>
  raw
    .split('\n---')
    .map((block) =>
      block
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
        .reduce<MarkdownRecord>((acc, line) => {
          if (!line.startsWith('- ')) return acc;
          const stripped = line.slice(2);
          const idx = stripped.indexOf(':');
          if (idx === -1) return acc;
          const key = stripped.slice(0, idx).trim().toLowerCase();
          const value = stripped.slice(idx + 1).trim();
          if (key) acc[key] = value;
          return acc;
        }, {}),
    )
    .filter((item) => Object.keys(item).length > 0);

const home = parseKeyValueDocument(homeRaw);
const about = parseKeyValueDocument(aboutRaw);
const certifications = parseListDocument(certificationsRaw);
const projects = parseListDocument(projectsRaw);
const writeups = parseListDocument(writeupsRaw);
const education = parseListDocument(educationRaw);
const vault = parseListDocument(vaultRaw);

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
}));

export const ACHIEVEMENTS: Achievement[] = certifications.map((item, index) => ({
  id: toId(item.title || '', `certification-${index + 1}`),
  title: item.title || 'Untitled Achievement',
  issuer: item.issuer || '',
  date: item.date || '',
  description: item.desc || '',
}));

export const WRITEUPS = writeups.map((item, index) => ({
  id: toId(item.title || '', `writeup-${index + 1}`),
  title: item.title || 'Untitled Writeup',
  date: item.date || '',
  category: item.category || 'General',
  excerpt: item.desc || '',
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
}));
