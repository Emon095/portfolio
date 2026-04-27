# Portfolio Content (Obsidian-Friendly)

Each section now loads **all markdown files** from its folder.

## Obsidian Setup (Recommended)

- Open vault at: `src/content`
- Obsidian attachment folder: `_assets`
- Use Obsidian Git plugin to commit/push from the vault
- Image assets are automatically synced to `public/content-assets` on `npm run dev` and `npm run build`

## Folders

- `home/` -> homepage identity fields (`NAME`, `ROLE`, `LOCATION`, `CURRENT_BUILDING`, `IMAGE`)
- `about/` -> about section fields (`BIO`, `TECH_STACK`)
- `writeups/` -> one writeup per file
- `education/` -> one education record per file
- `certifications/` -> one certification record per file
- `achievements/` -> one achievement record per file
- `projects/` -> one project per file
- `media/` -> one movie/series review per file
- `_assets/` -> images/files attached from Obsidian

## File Format

- Preferred format for every file: `KEY: value` (one field per line)
- Supported for compatibility: `- KEY: value`
- Filename can be anything; sorting is alphabetical, so prefixes like `001-`, `002-` control order.
- For card hero images, use `HERO_IMAGE: ...` (alias supported: `IMAGE`).
- `HERO_IMAGE` supports:
  - remote URL: `https://...`
  - public absolute path: `/images/x.png`
  - vault asset path: `_assets/x.png`
  - plain filename: `x.png` (resolved to `/content-assets/x.png`)
- For short card description, use `DESC: ...`.
- Put a blank line after metadata, then write full markdown content below. Clicking a card opens this full content.
- Obsidian embeds like `![[image.png]]` are supported and auto-resolved to `/content-assets/image.png`.

Parsed by `src/data.ts` at build/runtime.
