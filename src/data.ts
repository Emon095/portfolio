import contentRaw from './content.md?raw';

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

// Simple Parser for content.md
const parseMarkdown = (raw: string) => {
  const sections = raw.split('# ').slice(1);
  const data: any = {};

  sections.forEach(section => {
    const lines = section.trim().split('\n');
    const title = lines[0].trim();
    const body = lines.slice(1).join('\n').trim();

    if (title === 'PROFILE') {
      data.profile = {};
      body.split('\n').forEach(line => {
        const [key, ...val] = line.split(': ');
        if (key && val) data.profile[key.toLowerCase()] = val.join(': ').trim();
      });
    } else if (['ACHIEVEMENTS', 'PROJECTS', 'WRITEUPS', 'MEDIA'].includes(title)) {
      data[title.toLowerCase()] = body.split('---').map(block => {
        const item: any = {};
        block.trim().split('\n').forEach(line => {
          const match = line.match(/^- ([A-Z_]+): (.*)/);
          if (match) {
            item[match[1].toLowerCase()] = match[2].trim();
          }
        });
        // Special handling for tags (comma separated)
        if (item.tags) item.tags = item.tags.split(',').map((t: string) => t.trim());
        // Handle rating
        if (item.rating) item.rating = parseFloat(item.rating);
        // Add ID if missing
        item.id = item.title?.toLowerCase().replace(/ /g, '-');
        return item;
      }).filter(item => Object.keys(item).length > 0);
    } else if (title === 'EDUCATION') {
      data.education = body.split('---').map(block => {
        const item: any = {};
        block.trim().split('\n').forEach(line => {
          const match = line.match(/^- ([A-Z_]+): (.*)/);
          if (match) item[match[1].toLowerCase()] = match[2].trim();
        });
        return item;
      }).filter(item => Object.keys(item).length > 0);
    } else if (title === 'TECH_STACK') {
      data.tech_stack = body.split(',').map(t => t.trim());
    }
  });

  return data;
};

const parsed = parseMarkdown(contentRaw);

export const USER_INFO = {
  name: parsed.profile?.name || "SM Shahrier Emon",
  role: parsed.profile?.role || "Researcher",
  bio: parsed.profile?.bio || "",
  location: parsed.profile?.location || "",
  image: parsed.profile?.image || "",
  currentlyBuilding: parsed.profile?.current_building || "",
  github: "ShahrierEmon", // Keep static or add to MD
  twitter: "@ShahrierEmon",
  email: "shahrier.emon@example.com",
};

export const PROJECTS: Project[] = (parsed.projects || []).map((p: any) => ({
  ...p,
  title: p.title || 'Untitled Project',
  date: p.date || '',
  tags: Array.isArray(p.tags) ? p.tags : [],
  description: p.desc || '',
}));

export const ACHIEVEMENTS: Achievement[] = (parsed.achievements || []).map((a: any) => ({
  ...a,
  title: a.title || 'Untitled Achievement',
  issuer: a.issuer || '',
  date: a.date || '',
  description: a.desc || '',
}));

export const MEDIA: MediaRecord[] = parsed.media || [];

export const EDUCATION = parsed.education || [];

export const WRITEUPS = (parsed.writeups || []).map((w: any) => ({
  ...w,
  title: w.title || 'Untitled Writeup',
  date: w.date || '',
  category: w.category || 'General',
  excerpt: w.desc || '',
}));

export const TECH_STACK = parsed.tech_stack || [];
