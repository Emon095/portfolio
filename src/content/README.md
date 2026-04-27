# Portfolio Content (Obsidian-Friendly)

Each section now loads **all markdown files** from its folder.

## Folders

- `home/` -> homepage identity fields (`NAME`, `ROLE`, `LOCATION`, `CURRENT_BUILDING`, `IMAGE`)
- `about/` -> about section fields (`BIO`, `TECH_STACK`)
- `writeups/` -> one writeup per file
- `education/` -> one education record per file
- `certifications/` -> one certification record per file
- `achievements/` -> optional extra achievement records (merged with certifications)
- `projects/` -> one project per file
- `vault/` -> one vault/media item per file

## File Format

- Preferred format for every file: `KEY: value` (one field per line)
- Supported for compatibility: `- KEY: value`
- Filename can be anything; sorting is alphabetical, so prefixes like `001-`, `002-` control order.

Parsed by `src/data.ts` at build/runtime.
