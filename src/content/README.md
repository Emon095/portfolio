# Portfolio Content (Obsidian-Friendly)

Each section now loads **all markdown files** from its folder.

## Folders

- `home/` -> homepage identity fields (`NAME`, `ROLE`, `LOCATION`, `CURRENT_BUILDING`, `IMAGE`)
- `about/` -> about section fields (`BIO`, `TECH_STACK`)
- `writeups/` -> one writeup per file
- `education/` -> one education record per file
- `certifications/` -> one certification record per file
- `achievements/` -> one achievement record per file
- `projects/` -> one project per file
- `media/` -> one movie/series review per file

## File Format

- Preferred format for every file: `KEY: value` (one field per line)
- Supported for compatibility: `- KEY: value`
- Filename can be anything; sorting is alphabetical, so prefixes like `001-`, `002-` control order.
- For card hero images, use `HERO_IMAGE: https://...` (alias supported: `IMAGE`).
- For short card description, use `DESC: ...`.
- Put a blank line after metadata, then write full markdown content below. Clicking a card opens this full content.

Parsed by `src/data.ts` at build/runtime.
