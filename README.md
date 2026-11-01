# Ariel Sulton Portfolio

Personal portfolio built with TanStack Start, React, TypeScript, and Tailwind CSS. The iOS-inspired interface supports light and dark themes, an animated WebGL hero, Dynamic Island navigation, project filters and disclosures, a skills browser, an experience timeline, achievements, CV download, and a Web3Forms contact form.

## Development

```bash
bun install --frozen-lockfile
bun run dev
```

Use Node.js 22.12 or newer and Bun. The development server uses port 3000. Portfolio content lives in `src/data`, sections in `src/components/sections`, and media in `public/images`. The only public page is `/`; unknown paths use the custom not-found screen. Starter demo routes and APIs have been removed.

## Validation and build

```bash
bunx tsc --noEmit
bunx biome check src/components src/data src/lib src/routes
bun run build
```

The generated route tree is maintained by the TanStack Vite plugin. Do not edit it manually. The Netlify TanStack Start plugin packages the server-rendered build; Vite's static preview alone does not serve the SSR application.

## Branding and publication

The favicon, home-screen icons, and 1200 x 630 social preview use a still of the hero's light-mode wallpaper without text. Asset sources are recorded in `.impeccable/asset-provenance.json`.

Canonical and social URLs use `https://arielsulton.netlify.app` in `src/routes/__root.tsx`. Update that value if the public domain changes. The contact form is configured in `src/components/sections/contact.tsx`. The CV remains at `public/cv/CV_Mochammad Ariel Sulton.pdf` until its replacement is supplied.

Respect `prefers-reduced-motion` and preserve the static CSS wallpaper fallback. Website copy uses ordinary hyphens and contains no em dashes.


## Dependency security

```bash
bun run audit
bun audit --prod
bun run test
```

Security updates use the committed Bun lockfile. `glob` and `minimatch` have explicit safe-version overrides pending updates to Netlify's transitive ranges. `deepmerge` resolves to the MIT-licensed local security fork in `vendor/deepmerge`; keep that directory with the manifest and lockfile. See its README for the patch, upstream advisory, and removal conditions. The regression suite also checks Netlify configuration merging and function packaging. No advisory is ignored.
