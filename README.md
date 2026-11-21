# foqunty.github.io

My personal portfolio: https://foqunty.github.io/

It looks like a terminal because I like working in one. You can type commands like `help`, `about`, `skills` or `projects`, but everything is also on the page normally, so you don't have to.

## Projects

- **Turkish Summary Hallucination Benchmark**: tests whether 10 LLMs keep numbers, dates and names when summarizing Turkish text (NEXA Week 4). [Source](https://github.com/foqunty/turkce-ozet-halusinasyon-benchmark)
- **Pomodoro App**: a focus timer I built with React and TypeScript. [Live app](https://pomodoro-app-iota-gules.vercel.app/) · [Source](https://github.com/foqunty/Pomodoro-app)

## Run it locally

Needs Node.js 22+.

```bash
npm ci
npm run dev
```

`npm run build` makes the production build. Pushing to `main` deploys it with GitHub Actions.

## Where things are

- `src/data/profile.ts`: my info and skills
- `src/data/projects.ts`: projects shown on the site
- `src/main.tsx`: the page and the terminal
- `src/style.css`: styles

I used Claude Code while building this site. I check and edit what it writes before publishing.
