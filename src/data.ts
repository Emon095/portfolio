export interface Project {
  id: string;
  title: string;
  description: string;
  content: string;
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
  content: string;
  heroImage?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  content: string;
  heroImage?: string;
}

export interface Writeup {
  id: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content: string;
  heroImage?: string;
}

export interface MediaRecord {
  id: string;
  title: string;
  type: 'Movie' | 'Series' | 'Book';
  status: 'Completed' | 'Watching' | 'Planned';
  rating?: number;
  date: string;
  description: string;
  content: string;
  heroImage?: string;
}

type MarkdownRecord = Record<string, string>;

interface ParsedMarkdownDoc {
  fields: MarkdownRecord;
  content: string;
}

const ASSET_PREFIX = '/content-assets/';

const normalizeFieldValue = (value: string): string => {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1).trim();
  }
  return trimmed;
};

const resolveContentAssetPath = (value?: string): string | undefined => {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('data:') ||
    trimmed.startsWith('/')
  ) {
    return trimmed;
  }
  if (trimmed.startsWith('_assets/')) {
    return `${ASSET_PREFIX}${trimmed.slice('_assets/'.length)}`;
  }
  if (trimmed.startsWith('content-assets/')) {
    return `/${trimmed}`;
  }
  return `${ASSET_PREFIX}${trimmed}`;
};

const normalizeMarkdownBody = (content: string): string => {
  if (!content) return content;

  // Obsidian embed syntax: ![[image.png]] or ![[folder/image.png|caption]]
  let normalized = content.replace(/!\[\[([^\]]+)\]\]/g, (_all, targetRaw: string) => {
    const [target] = targetRaw.split('|');
    const resolved = resolveContentAssetPath(target.trim()) || target.trim();
    return `![](${resolved})`;
  });

  // Standard markdown image syntax with vault-relative attachments.
  normalized = normalized.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_all, alt: string, targetRaw: string) => {
    const target = targetRaw.trim().replace(/^["']|["']$/g, '');
    const resolved = resolveContentAssetPath(target) || target;
    return `![${alt}](${resolved})`;
  });

  return normalized;
};

const toId = (value: string, fallback: string) =>
  (value || fallback)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const getSortedRawContents = (files: Record<string, string>): string[] =>
  Object.entries(files)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, content]) => content);

const parseMarkdownDocument = (raw: string): ParsedMarkdownDoc => {
  const fields: MarkdownRecord = {};
  const lines = raw.split('\n');
  const bodyLines: string[] = [];
  let inMeta = true;

  for (const line of lines) {
    const trimmed = line.trim();

    if (inMeta && !trimmed) {
      inMeta = false;
      continue;
    }

    if (inMeta) {
      const normalized = trimmed.startsWith('- ') ? trimmed.slice(2).trim() : trimmed;
      const idx = normalized.indexOf(':');

      if (idx > 0) {
        const key = normalized.slice(0, idx).trim();
        if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(key)) {
          fields[key.toLowerCase()] = normalizeFieldValue(normalized.slice(idx + 1));
          continue;
        }
      }

      inMeta = false;
    }

    bodyLines.push(line);
  }

  return {
    fields,
    content: bodyLines.join('\n').trim(),
  };
};

const parseCollection = (files: Record<string, string>): ParsedMarkdownDoc[] =>
  getSortedRawContents(files)
    .map((raw) => parseMarkdownDocument(raw))
    .filter((doc) => Object.keys(doc.fields).length > 0 || doc.content.length > 0);

const mergeKeyValueCollection = (files: Record<string, string>): MarkdownRecord =>
  parseCollection(files).reduce<MarkdownRecord>((acc, doc) => ({...acc, ...doc.fields}), {});

const homeFiles = import.meta.glob('./content/home/*.md', {eager: true, query: '?raw', import: 'default'}) as Record<string, string>;
const aboutFiles = import.meta.glob('./content/about/*.md', {eager: true, query: '?raw', import: 'default'}) as Record<string, string>;
const certificationFiles = import.meta.glob('./content/certifications/*.md', {eager: true, query: '?raw', import: 'default'}) as Record<string, string>;
const achievementFiles = import.meta.glob('./content/achievements/*.md', {eager: true, query: '?raw', import: 'default'}) as Record<string, string>;
const projectFiles = import.meta.glob('./content/projects/*.md', {eager: true, query: '?raw', import: 'default'}) as Record<string, string>;
const writeupFiles = import.meta.glob('./content/writeups/*.md', {eager: true, query: '?raw', import: 'default'}) as Record<string, string>;
const educationFiles = import.meta.glob('./content/education/*.md', {eager: true, query: '?raw', import: 'default'}) as Record<string, string>;
const mediaFiles = import.meta.glob('./content/media/*.md', {eager: true, query: '?raw', import: 'default'}) as Record<string, string>;

const home = mergeKeyValueCollection(homeFiles);
const about = mergeKeyValueCollection(aboutFiles);
const certifications = parseCollection(certificationFiles);
const achievements = parseCollection(achievementFiles);
const projects = parseCollection(projectFiles);
const writeups = parseCollection(writeupFiles);
const education = parseCollection(educationFiles);
const media = parseCollection(mediaFiles);

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

export const PROJECTS: Project[] = projects.map((doc, index) => {
  const item = doc.fields;
  return {
    id: toId(item.title || '', `project-${index + 1}`),
    title: item.title || 'Untitled Project',
    description: item.desc || '',
    content: normalizeMarkdownBody(doc.content || item.desc || ''),
    tags: (item.tags || '')
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean),
    link: item.link || undefined,
    date: item.date || '',
    heroImage: resolveContentAssetPath(item.hero_image || item.image),
  };
});

export const CERTIFICATIONS: Certification[] = certifications.map((doc, index) => {
  const item = doc.fields;
  return {
    id: toId(item.title || '', `certification-${index + 1}`),
    title: item.title || 'Untitled Certification',
    issuer: item.issuer || '',
    date: item.date || '',
    description: item.desc || '',
    content: normalizeMarkdownBody(doc.content || item.desc || ''),
    heroImage: resolveContentAssetPath(item.hero_image || item.image),
  };
});

export const ACHIEVEMENTS: Achievement[] = achievements.map((doc, index) => {
  const item = doc.fields;
  return {
    id: toId(item.title || '', `achievement-${index + 1}`),
    title: item.title || 'Untitled Achievement',
    issuer: item.issuer || '',
    date: item.date || '',
    description: item.desc || '',
    content: normalizeMarkdownBody(doc.content || item.desc || ''),
    heroImage: resolveContentAssetPath(item.hero_image || item.image),
  };
});

export const WRITEUPS: Writeup[] = writeups.map((doc, index) => {
  const item = doc.fields;
  return {
    id: toId(item.title || '', `writeup-${index + 1}`),
    title: item.title || 'Untitled Writeup',
    date: item.date || '',
    category: item.category || 'General',
    excerpt: item.desc || '',
    content: normalizeMarkdownBody(doc.content || item.desc || ''),
    heroImage: resolveContentAssetPath(item.hero_image || item.image),
  };
});

export const EDUCATION = education.map((doc, index) => {
  const item = doc.fields;
  return {
    id: toId(item.institution || '', `education-${index + 1}`),
    institution: item.institution || '',
    degree: item.degree || '',
    duration: item.duration || '',
    details: item.details || doc.content || '',
  };
});

export const MEDIA: MediaRecord[] = media.map((doc, index) => {
  const item = doc.fields;
  return {
    id: toId(item.title || '', `media-${index + 1}`),
    title: item.title || 'Untitled',
    type: (item.type as MediaRecord['type']) || 'Series',
    status: (item.status as MediaRecord['status']) || 'Completed',
    rating: item.rating ? Number(item.rating) : undefined,
    date: item.date || '',
    description: item.desc || '',
    content: normalizeMarkdownBody(doc.content || item.desc || ''),
    heroImage: resolveContentAssetPath(item.hero_image || item.image),
  };
});
