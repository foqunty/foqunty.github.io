import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDown, ArrowUpRight, Check, ChevronRight, Command, Copy, FileCode2, Folder, Github, Shield, Terminal, X } from 'lucide-react';
import { projects, type Project } from './data/projects';
import { profile } from './data/profile';
import './style.css';

const commands = ['help', 'whoami', 'about', 'skills', 'projects', 'github', 'email', 'pwd', 'clear'];
type Kind = 'help' | 'whoami' | 'about' | 'skills' | 'projects' | 'github' | 'email' | 'pwd' | 'unknown';
type Entry = { id: number; command: string; kind: Kind };
const navigation = [{ id: 'home', label: '~/home' }, { id: 'about', label: 'about' }, { id: 'skills', label: 'skills' }, { id: 'projects', label: 'projects' }];

function Prompt({ compact = false }: { compact?: boolean }) {
  return <span className="prompt" aria-hidden="true"><span>{compact ? '~' : 'foqunty@portfolio'}</span>{!compact && <span className="prompt-path">:~</span>}<span className="prompt-dollar">$</span></span>;
}

function CommandOutput({ kind }: { kind: Kind }) {
  if (kind === 'help') return <div className="help-output">{[['whoami', 'Sedat Çoban · Computer Engineering Student'], ['about', 'My interests, experience and learning journey'], ['skills', 'C++, C#, Python, Linux and cybersecurity'], ['projects', 'My Pomodoro App and other selected work'], ['github', 'github.com/foqunty'], ['email', 'Email me directly'], ['pwd', '/home/foqunty/portfolio'], ['clear', 'Clear terminal output']].map(([name, description]) => <div key={name}><span>{name}</span><span>{description}</span></div>)}</div>;
  if (kind === 'whoami') return <div className="identity-output"><strong>{profile.name}</strong><span>{profile.role} · @foqunty</span><p>I build web projects, learn by experimenting, and explore how software works and how it can break. Currently interested in cybersecurity, with hands-on practice in C++, C#, Python and Linux.</p></div>;
  if (kind === 'about') return <div className="identity-output"><strong>About me</strong><span>Learning by building</span><p>I'm a computer engineering student interested in software development and cybersecurity. My first published web app is a Pomodoro focus timer. I enjoy turning small ideas into working projects, testing what I build, and improving things as I learn.</p></div>;
  if (kind === 'skills') return <div className="help-output">{profile.skills.map(skill => <div key={skill.name}><span>{skill.name}</span><span>{skill.description}</span></div>)}</div>;
  if (kind === 'projects') return projects.length ? <div className="project-output"><span className="output-muted">~/projects/</span>{projects.map(project => <div key={project.id}><strong>{project.name}</strong><p>{project.shortDescription}</p><a href={project.demoUrl || project.githubUrl || '#projects'} target="_blank" rel="noopener noreferrer">{project.demoUrl ? 'Open live app' : 'View source'} <ArrowUpRight size={12} /></a></div>)}</div> : <div><span className="output-muted">~/projects/</span><p>No published projects here yet.<br />The directory is ready for what comes next.</p></div>;
  if (kind === 'github') return <a className="terminal-link" href={profile.github} target="_blank" rel="noopener noreferrer">github.com/foqunty <ArrowUpRight size={13} /></a>;
  if (kind === 'email') return <a className="terminal-link" href={`mailto:${profile.email}`}>{profile.email} <ArrowUpRight size={13} /></a>;
  if (kind === 'pwd') return <span>/home/foqunty/portfolio</span>;
  return <span className="unknown-output">Command not found. Type <strong>help</strong> to see what’s available.</span>;
}

function InteractiveTerminal() {
  const [entries, setEntries] = useState<Entry[]>([{ id: 0, command: 'whoami', kind: 'whoami' }]);
  const [value, setValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [announcement, setAnnouncement] = useState('');
  const [copied, setCopied] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const output = useRef<HTMLDivElement>(null);
  const sequence = useRef(1);
  const copyTimeout = useRef<number | undefined>(undefined);
  useEffect(() => { if (output.current) output.current.scrollTop = output.current.scrollHeight; }, [entries]);
  useEffect(() => {
    function focusTerminal(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (target?.closest('input, textarea, select, [contenteditable="true"]')) return;
      if (event.key === '/' && !event.ctrlKey && !event.metaKey && !event.altKey) { event.preventDefault(); input.current?.focus(); }
    }
    document.addEventListener('keydown', focusTerminal);
    return () => { document.removeEventListener('keydown', focusTerminal); window.clearTimeout(copyTimeout.current); };
  }, []);
  function run(raw: string) {
    const command = raw.trim().slice(0, 160);
    if (!command) return;
    const normalized = command.toLowerCase().replace(/\s+/g, ' ');
    setHistory(previous => [command, ...previous].slice(0, 30));
    setHistoryIndex(-1);
    setValue('');
    if (normalized === 'clear') { setEntries([]); setAnnouncement('Terminal cleared.'); return; }
    const kind: Kind = normalized === 'whoami' ? 'whoami' : ['about', 'cat about.txt'].includes(normalized) ? 'about'
      : ['skills', 'cat skills.json'].includes(normalized) ? 'skills'
      : ['projects', 'ls', 'ls projects', 'ls projects/', 'ls -la projects/'].includes(normalized) ? 'projects'
      : normalized === 'help' ? 'help' : normalized === 'github' ? 'github' : ['email', 'mail', 'contact'].includes(normalized) ? 'email' : normalized === 'pwd' ? 'pwd' : 'unknown';
    const id = sequence.current++;
    setEntries(previous => [...previous.slice(-29), { id, command, kind }]);
    setAnnouncement(kind === 'unknown' ? 'Command not found. Type help for available commands.' : `${command} completed. Output is in the terminal history.`);
  }
  async function copyProfile() {
    try {
      await navigator.clipboard.writeText(`${profile.name}\n${profile.role}\n${profile.github}`);
      setCopied(true); setAnnouncement('Public profile copied.');
      window.clearTimeout(copyTimeout.current);
      copyTimeout.current = window.setTimeout(() => setCopied(false), 2000);
    } catch { setAnnouncement('Could not copy. You can select the profile text in the terminal.'); }
  }
  return <section className="terminal-window" aria-labelledby="terminal-title">
    <div className="terminal-titlebar"><span className="window-dots" aria-hidden="true"><i /><i /><i /></span><span id="terminal-title"><Terminal size={13} /> foqunty — portfolio</span><button className="icon-button" onClick={copyProfile} aria-label={copied ? 'Profile copied' : 'Copy public profile'} title="Copy public profile">{copied ? <Check size={14} /> : <Copy size={14} />}</button></div>
    <div className="terminal-tab"><Terminal size={13} /><span>~/portfolio</span><span className="tab-index">01</span></div>
    <div className="terminal-body"><div className="terminal-welcome"><span>Welcome to my corner of the internet.</span><span>Type <strong>help</strong> to look around.</span></div>
      <div className="terminal-history" ref={output} role="region" aria-label="Terminal command history" tabIndex={0}>{entries.length ? entries.map(entry => <div className="terminal-entry" key={entry.id}><div className="command-echo"><Prompt compact /><span>{entry.command}</span></div><div className="command-output"><CommandOutput kind={entry.kind} /></div></div>) : <span className="output-muted">A clean slate. What’s next?</span>}</div>
      <form className="terminal-input-line" onSubmit={event => { event.preventDefault(); run(value); }}><label htmlFor="terminal-command"><Prompt compact /><span className="sr-only">Terminal command</span></label><input id="terminal-command" ref={input} value={value} onChange={event => { setValue(event.target.value); setHistoryIndex(-1); }} autoComplete="off" autoCapitalize="off" spellCheck={false} maxLength={160} placeholder="type a command…" aria-describedby="terminal-instructions" onKeyDown={event => {
        if (event.key === 'ArrowUp' && history.length) { event.preventDefault(); const next = Math.min(historyIndex + 1, history.length - 1); setHistoryIndex(next); setValue(history[next]); }
        if (event.key === 'ArrowDown') { event.preventDefault(); const next = Math.max(historyIndex - 1, -1); setHistoryIndex(next); setValue(next < 0 ? '' : history[next]); }
        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'l') { event.preventDefault(); run('clear'); }
        if (event.key === 'Tab' && value.trim()) { const matches = commands.filter(command => command.startsWith(value.trim().toLowerCase())); if (matches.length === 1) { event.preventDefault(); setValue(matches[0]); } }
        if (event.key === 'Escape') input.current?.blur();
      }} /><button className="execute-button" type="submit" aria-label="Run command" disabled={!value.trim()}><ChevronRight size={18} /></button></form><span className="sr-only" role="status">{announcement}</span>
    </div>
    <div className="terminal-quick"><span>try</span>{['help', 'skills', 'projects'].map(command => <button key={command} onClick={() => run(command)}>{command}</button>)}</div>
    <div className="terminal-bottom" id="terminal-instructions"><span><span className="green-dot" /> interactive portfolio</span><span><kbd>↑</kbd><kbd>↓</kbd> history <span className="tab-hint">· TAB complete</span></span></div>
  </section>;
}

function SectionHeading({ command, title, count }: { command: string; title: string; count: string }) {
  return <div className="section-heading"><div><span className="section-command"><span className="green-text">~ $</span> {command}</span><h2>{title}<span className="green-text">.</span></h2></div><span className="section-count">{count}</span></div>;
}

function ProjectDetails({ project }: { project: Project }) {
  const safeLink = (value?: string) => value && /^https:\/\//i.test(value) ? value : undefined;
  return <div className="project-details"><h4>{project.name}</h4><p>{project.description}</p>{project.problem && <p>{project.problem}</p>}{project.features?.length ? <ul>{project.features.map(feature => <li key={feature}>{feature}</li>)}</ul> : null}<div className="project-tags">{project.technologies.map(technology => <span key={technology}>{technology}</span>)}</div><div className="project-links">{safeLink(project.githubUrl) && <a href={safeLink(project.githubUrl)} target="_blank" rel="noopener noreferrer">Source code <ArrowUpRight size={14} /></a>}{safeLink(project.demoUrl) && <a href={safeLink(project.demoUrl)} target="_blank" rel="noopener noreferrer">Live site <ArrowUpRight size={14} /></a>}</div></div>;
}

function App() {
  const [selected, setSelected] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');
  useEffect(() => {
    const observer = new IntersectionObserver(records => {
      const visible = records.filter(record => record.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]) setActive(visible[0].target.id);
    }, { rootMargin: '-15% 0px -55% 0px', threshold: [0, .1, .3] });
    for (const item of navigation) { const element = document.getElementById(item.id); if (element) observer.observe(element); }
    return () => observer.disconnect();
  }, []);
  const navLinks = (location: string) => navigation.map(item => <a href={`#${item.id}`} key={`${location}-${item.id}`} className={active === item.id ? 'active' : ''} aria-current={active === item.id ? 'location' : undefined} onClick={() => { setActive(item.id); setMenuOpen(false); }}>{item.label}</a>);
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header"><div className="header-inner"><a className="brand" href="#home" aria-label="FOQUNTY home"><span className="brand-mark"><Terminal size={19} strokeWidth={2.4} /></span><span>foqunty<span className="green-text">_</span></span></a><nav className="desktop-nav" aria-label="Main navigation">{navLinks('desktop')}</nav><a className="header-github" href={profile.github} target="_blank" rel="noopener noreferrer"><Github size={16} /><span>GitHub</span><ArrowUpRight size={14} /></a><button className="menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={20} /> : <Command size={20} />}</button></div>{menuOpen && <nav id="mobile-menu" className="mobile-menu" aria-label="Mobile navigation" onKeyDown={event => { if (event.key === 'Escape') { setMenuOpen(false); document.querySelector<HTMLButtonElement>('.menu-toggle')?.focus(); } }}>{navLinks('mobile')}</nav>}</header>
    <main id="main">
      <section className="hero section-container" id="home"><div className="hero-copy"><span className="session-label"><span className="green-dot" /> PERSONAL PORTFOLIO <span className="label-divider">/</span> v2.0</span><div className="hero-command"><Prompt /><span>whoami</span></div><h1>Sedat<br /><span>Çoban<span className="name-period">.</span></span><span className="hero-cursor" aria-hidden="true">_</span></h1><p className="role-label"><span aria-hidden="true">↳</span> {profile.role}</p><p className="hero-description">{profile.intro}<br /><span>Code, curiosity, and a growing interest in cybersecurity.</span></p><div className="hero-actions"><a className="primary-button" href="#projects"><Folder size={16} /> Explore projects <ArrowUpRight size={16} /></a><a className="secondary-button" href="#about">cat about.txt <ArrowDown size={15} /></a></div><div className="hero-meta"><span><span className="meta-square" /> ALWAYS LEARNING</span><span className="hero-shortcut">press <kbd>/</kbd> to use the terminal</span></div></div><div className="hero-terminal"><InteractiveTerminal /><span className="terminal-caption"><span>01 / THE INTERACTIVE PART</span><span>Go ahead. Try a command.</span></span></div></section>
      <div className="stack-strip"><div className="section-container stack-inner"><span className="stack-label">CURRENT TOOLKIT</span>{['C++', 'C#', 'Python', 'Linux'].map(name => <span className="stack-item" key={name}><span className="stack-plus">+</span> {name}</span>)}<span className="stack-interest"><Shield size={14} /> cybersecurity<span className="stack-learning"> / exploring</span></span></div></div>
      <section className="section-container content-section about-section" id="about"><SectionHeading command="cat about.txt" title="A little context" count="01" /><div className="about-grid"><div className="about-statement">Curiosity first.<br />Code follows<span className="green-text">.</span></div><div className="about-copy"><p>{profile.bio}</p><p>This is my space to share what I choose to build and the things I learn along the way. Still learning. Still figuring things out. Always moving forward.</p><a href={profile.github} target="_blank" rel="noopener noreferrer">Find me on GitHub <ArrowUpRight size={15} /></a></div></div></section>
      <section className="section-container content-section" id="skills"><SectionHeading command="cat skills.json" title="The current toolkit" count="05 ENTRIES" /><p className="section-description">Languages I work with. Systems I’m learning. Questions I keep asking.</p><div className="skills-grid">{profile.skills.map((skill, index) => <article className={`skill-card ${skill.extension === 'sec' ? 'security-card' : ''}`} key={skill.name}><div className="skill-card-top"><span className="file-icon">{skill.extension === 'sec' ? <Shield size={22} /> : skill.extension === 'sh' ? <Terminal size={22} /> : <FileCode2 size={22} />}</span><span className="skill-file">.{skill.extension}</span></div><div><span className="skill-number">0{index + 1}</span><h3>{skill.name}</h3><p>{skill.description}</p></div><div className="skill-bottom"><span>{skill.tag}</span><span>{skill.extension === 'sec' ? '↗' : '·'}</span></div></article>)}</div></section>
      <section className="section-container content-section projects-section" id="projects"><SectionHeading command="ls -la projects/" title="The project directory" count={`${String(projects.length).padStart(2, '0')} PUBLISHED`} /><p className="section-description">A place for the work I choose to put out into the world.</p>{projects.length ? <div className="project-list">{projects.map((project, index) => <article key={project.id}><button className="project-row" onClick={() => setSelected(selected === project.id ? null : project.id)} aria-expanded={selected === project.id} aria-controls={`project-${project.id}`}><span className="project-index">{String(index + 1).padStart(2, '0')}</span><Folder size={22} /><span><strong>{project.name}</strong><small>{project.shortDescription}</small></span><span className="project-category">{project.category}</span><ChevronRight className={selected === project.id ? 'rotated' : ''} size={18} /></button>{selected === project.id && <div id={`project-${project.id}`}><ProjectDetails project={project} /></div>}</article>)}</div> : <div className="empty-projects"><div className="directory-symbol" aria-hidden="true"><Folder size={49} strokeWidth={1} /><span>+</span></div><span className="empty-path">~/projects/</span><h3>A clean directory.<br />Room for what’s next.</h3><p>No published projects here yet.<br />When there’s something to share, it’ll live right here.</p><span className="directory-output"><span className="green-text">➜</span> 0 projects <span className="output-muted">· more to come</span></span></div>}</section>
      <section className="section-container contact-section"><div><span className="section-command"><span className="green-text">~ $</span> open github</span><h2>Follow the next commit<span className="green-text">.</span></h2><p>The learning continues. You can find me on GitHub or reach out by email.</p><a className="terminal-link" href={`mailto:${profile.email}`}>{profile.email} <ArrowUpRight size={14} /></a></div><a className="primary-button" href={profile.github} target="_blank" rel="noopener noreferrer"><Github size={17} /> github.com/foqunty <ArrowUpRight size={16} /></a></section>
    </main>
    <footer className="site-footer"><div className="section-container footer-inner"><a className="footer-brand" href="#home"><Terminal size={16} /> foqunty<span className="green-text">_</span></a><span>© {new Date().getFullYear()} Sedat Çoban</span><a href="#home">Back to top <ArrowUpRight size={13} /></a></div></footer>
    <div className="statusbar"><span><span className="green-dot" /> portfolio / main</span><span>Built with curiosity<span className="status-right">UTF-8</span></span></div>
  </>;
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);
