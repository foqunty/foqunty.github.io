export interface Project { id: string; name: string; shortDescription: string; description: string; technologies: string[]; category: string; artwork?: string; screenshots?: string[]; githubUrl?: string; demoUrl?: string; releaseDate?: string; features?: string[]; problem?: string }

// Projects shown on the site.
export const projects: Project[] = [
  {
    id: 'turkish-summary-benchmark',
    name: 'Turkish Summary Hallucination Benchmark',
    shortDescription: 'Do LLMs keep the numbers, dates and names when they summarize Turkish text? 10 models tested.',
    description: 'A benchmark I built to test LLM summaries in Turkish. Each question is a Turkish paragraph with three critical facts: a number, a date and a name. A model is correct only if its summary keeps all three and invents nothing. A Python scorer handles Turkish spellings (12 Mart = 12.03, yüzde 45 = %45) and flags made-up numbers and names. I ran 3 Claude models and 7 open models on my Mac with Ollama, then added a memorization trap: real Turkish Wikipedia texts with one fact changed (Malazgirt 1071 → 1074) to see if models trust the text or their memory.',
    technologies: ['Python', 'Ollama', 'LLM evaluation', 'matplotlib'],
    category: 'AI / EVALUATION',
    githubUrl: 'https://github.com/foqunty/turkce-ozet-halusinasyon-benchmark',
    demoUrl: 'https://foqunty.github.io/#/benchmark',
    releaseDate: '2026',
    problem: 'Summaries that silently change a number or a name are dangerous, and there was no small Turkish test for it.',
    features: [
      'Claude Opus and Sonnet 50/50; best open models Mistral 7B (37/50) and Aya Expanse 8B (33/50)',
      'Two failure types: models that drop facts vs. models that invent them (Llama 3.1 8B: 54% of summaries)',
      'Memorization trap: none of the 10 models wrote the memorized value over the changed text',
      'Llama 3.2 3B beat the larger Llama 3.1 8B (21 vs 0 out of 50)',
    ],
  },
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
