# Portfolio Content Files (Obsidian-Friendly)

Edit these files to update each section of the site:

- `home.md` -> Homepage identity fields (name, role, location, image, current building)
- `about.md` -> About section (`BIO`) and stack (`TECH_STACK`)
- `writeups.md` -> Writeups section
- `education.md` -> Education section
- `certifications.md` -> Certifications section
- `projects.md` -> Projects section
- `vault.md` -> Vault/media section

Format notes:

- Single-record files use `KEY: value`
- Multi-record files use list items: `- KEY: value`
- Separate records with `---`

These files are parsed directly by `src/data.ts` during build/runtime.
