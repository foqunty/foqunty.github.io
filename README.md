# FOQUNTY

An interactive, music library inspired portfolio for Sedat Çoban. The project library starts empty by design.

## Development

Requires Node.js 22 or newer.

```bash
npm ci
npm run dev
```

Run `npm run build` before deployment. `source.html` is the Vite entry template; the root `index.html` and `assets/` are built output mirrored for the repository's branch-based Pages setting.

## Adding projects

Edit `src/data/projects.ts`. Add an object to the `projects` array following the `Project` interface. Only include projects Sedat has approved for display. Optional artwork and screenshots may be placed in `public/` and referenced by root relative URLs. The library, details panel, and player draw from the same data.

## GitHub Pages

Create the public repository `foqunty/foqunty.github.io`, push this source to `main`, then select **Settings → Pages → Build and deployment → Source: GitHub Actions**. The workflow builds Vite and deploys `dist/`. The site is served at `https://foqunty.github.io/`.
