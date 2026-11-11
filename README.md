# FOQUNTY — Terminal Portfolio

A responsive terminal-inspired portfolio for Sedat Çoban: dark surfaces, monospace typography, green accents, and an interactive local command interface. Projects are intentionally empty until Sedat approves entries.

## Development

Requires Node.js 22 or newer.

```bash
npm ci
npm run dev
npm run build
```

The build runs TypeScript and Vite. `source.html` is the entry template. The root `index.html`, `favicon.svg`, and `assets/` mirror the production build for branch-based Pages compatibility. The existing Actions workflow also builds and deploys `dist/`.

## Content

- `src/data/profile.ts`: public profile and skills.
- `src/data/projects.ts`: approved projects only.
- `src/main.tsx`: UI and command interface.
- `src/style.css`: responsive styles and reduced-motion support.

## Terminal

Commands: `help`, `whoami`, `about`, `skills`, `projects`, `github`, `pwd`, `clear`. Aliases include `cat about.txt`, `cat skills.json`, and `ls projects/`.

Press `/` outside text fields to focus the terminal. Up/Down browse session history, Tab completes a unique command, Ctrl/Cmd+L clears the focused terminal, and Escape leaves the input. Commands select local content; they never execute a shell or transmit input to a server. Input is rendered as text with bounded length/history. Session state is not persisted.

All sections also work through ordinary navigation links. No remote fonts, analytics, autoplay, or invented project entries are included.

## Publication

https://foqunty.github.io/

The existing Actions workflow builds and deploys on pushes to main. Keep the root build mirror current if branch-based Pages is enabled. Verify the deployment and live site after publishing.
