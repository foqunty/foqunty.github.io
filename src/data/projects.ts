export interface Project { id: string; name: string; shortDescription: string; description: string; technologies: string[]; category: string; artwork?: string; screenshots?: string[]; githubUrl?: string; demoUrl?: string; releaseDate?: string; features?: string[]; problem?: string }

// Add only projects Sedat explicitly chooses to showcase.
export const projects: Project[] = [];
