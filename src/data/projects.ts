export interface Project { id: string; name: string; shortDescription: string; description: string; technologies: string[]; category: string; artwork?: string; screenshots?: string[]; githubUrl?: string; demoUrl?: string; releaseDate?: string; features?: string[]; problem?: string }

// Only showcase projects explicitly selected for this portfolio.
export const projects: Project[] = [
  {
    id: 'pomodoro-app',
    name: 'Pomodoro App',
    shortDescription: 'A calm, minimal focus timer with breaks, ambient sound, and offline support.',
    description: 'My first web app: a Pomodoro timer designed to make focused work and regular breaks easier. It includes adjustable focus and break sessions, ambient background audio, session notifications, saved progress, and an optional keep-screen-awake setting.',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'PWA'],
    category: 'WEB APP',
    githubUrl: 'https://github.com/foqunty/Pomodoro-app',
    demoUrl: 'https://pomodoro-app-iota-gules.vercel.app/',
    releaseDate: '2026',
    problem: 'I wanted a simple tool for studying and coding without a distracting interface.',
    features: [
      'Customizable focus, short-break, and long-break sessions',
      'Ambient audio and completion notifications',
      'Saved progress across page reloads',
      'Offline-ready and installable as a PWA',
    ],
  },
];
