# Ariel Sulton Portfolio

[![CI](https://github.com/ArielSulton/tanstack-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/ArielSulton/tanstack-portfolio/actions/workflows/ci.yml)

Personal portfolio built with TanStack Start, React, TypeScript, and Tailwind CSS. The iOS-inspired interface supports light and dark themes, an animated WebGL hero, Dynamic Island navigation, project filters and disclosures, a skills browser, an experience timeline, achievements, CV download, and a Web3Forms contact form.

## Development

```bash
bun install --frozen-lockfile
bun run dev
```

Use Node.js 22.12 or newer and Bun 1.4.4 or newer. Netlify pins the tested Node.js 22.23.4 and Bun 1.4.4 versions. The development server uses port 3000. Portfolio content lives in `src/data`, sections in `src/components/sections`, and media in `public/images`. The public pages are `/` and `/apps/simak`; unknown paths use the custom not-found screen. Starter demo routes and APIs have been removed.

## Validation and build

```bash
bun run typecheck
bunx biome check src/components src/data src/lib src/routes
bun run build
```

The generated route tree is maintained by the TanStack Vite plugin. Do not edit it manually. The Netlify TanStack Start plugin packages the server-rendered build; Vite's static preview alone does not serve the SSR application.

## Halaman aplikasi

`/apps/simak` adalah halaman pengenal aplikasi desktop Simak (Simak Ayat). Rutenya ada di `src/routes/apps/simak.tsx` dan tampilannya di `src/components/sections/simak-page.tsx`. Semua fakta, angka, dan tautan (status, jumlah surah, daftar surah yang tidak didukung, platform yang sudah diverifikasi, tautan repositori, tautan unduhan, license MIT beserta tautan LICENSE dan panduan kontribusi, daftar help wanted) ada di `src/data/simak.ts`; ubah berkas itu saat aplikasi dirilis. `downloads` tetap `null` sampai rilis nyata ada, dan selama itu halaman hanya menampilkan "Segera hadir". Tangkapan layar widget ada di `public/images/simak/` dan dicatat di `.impeccable/asset-provenance.json`. Teks halaman memakai tanda hubung biasa tanpa tanda pisah em.

## Branding and publication

The favicon, home-screen icons, and 1200 x 630 social preview use a still of the hero's light-mode wallpaper without text. Asset sources are recorded in `.impeccable/asset-provenance.json`.

Canonical and social URLs use `https://arielsulton.web.id` in `src/routes/__root.tsx`. Update that value if the public domain changes. The contact form is configured in `src/components/sections/contact.tsx`. The CV remains at `public/cv/CV_Mochammad Ariel Sulton.pdf` until its replacement is supplied.

Respect `prefers-reduced-motion` and preserve the static CSS wallpaper fallback. Website copy uses ordinary hyphens and contains no em dashes.


## Dependency security

```bash
bun run audit
bun audit --prod
bun run test
```

Security updates use the committed Bun lockfile. `glob` and `minimatch` have explicit safe-version overrides pending updates to Netlify's transitive ranges. `deepmerge` resolves to the MIT-licensed local security fork in `vendor/deepmerge`; keep that directory with the manifest and lockfile. See its README for the patch, upstream advisory, and removal conditions. The regression suite also checks Netlify configuration merging and function packaging. No advisory is ignored.


Netlify uses the Bun and Node versions pinned in `netlify.toml`. Its build command first runs `bun install --frozen-lockfile` to reconcile restored dependency caches before loading Vite. Bun 1.2.18 can report a successful install while leaving the local transitive `deepmerge` override unresolved; Bun 1.4.4 correctly installs it, including over an existing older cache. Keep the Netlify Bun pin and `packageManager` declaration aligned when upgrading the installer.


## Continuous integration

The `CI` GitHub Actions workflow runs on pushes, pull requests, and manual dispatch. It performs a fresh frozen-lockfile install, runs the regression suite, checks TypeScript, builds the production client/SSR application, and audits all dependencies. A failed check fails the job.

Node and Bun versions are read from `netlify.toml`; the workflow also checks that `packageManager` agrees with the Bun pin. It uses read-only repository permissions, SHA-pinned actions, and no restored `node_modules` cache. Repeated runs for the same ref cancel the older run. No additional repository secrets are needed.

## Planned updates

- **v2.2:** Replace the CV with the updated version and add project case studies.


## Search indexing

The canonical homepage is `https://arielsulton.web.id/`; `https://arielsulton.web.id/apps/simak` is the only other page. Each route declares its own canonical link in its `head` (the root declares none, because TanStack does not deduplicate links). `public/sitemap.xml` lists both pages and `public/robots.txt` advertises the sitemap. The Netlify hostname permanently redirects to the custom domain while preserving paths. Section fragments are parts of the homepage and are not separate sitemap pages.

Verify `https://arielsulton.web.id/` as a URL-prefix property in Google Search Console, submit `sitemap.xml`, and inspect the homepage URL to request indexing. Ownership verification requires the site owner's Google-provided HTML tag/file or DNS record. A successful deploy and valid sitemap make the page discoverable but do not guarantee inclusion or ranking in Google.
