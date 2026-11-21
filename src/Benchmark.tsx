import { ArrowUpRight } from 'lucide-react';

// Scores from github.com/foqunty/turkce-ozet-halusinasyon-benchmark (prompt v1, temperature 0).
// main: 50 fictional paragraphs · wiki: 25 real Wikipedia texts, original / one fact changed.
type Row = { model: string; open: boolean; main: number; facts: number; fabNum: number; fabName: number; sec?: number; wikiOrig: number; wikiChanged: number };
const rows: Row[] = [
  { model: 'Claude Opus 5.5', open: false, main: 100, facts: 3.0, fabNum: 0, fabName: 0, wikiOrig: 25, wikiChanged: 25 },
  { model: 'Claude Sonnet 5.5', open: false, main: 100, facts: 3.0, fabNum: 0, fabName: 0, wikiOrig: 23, wikiChanged: 23 },
  { model: 'Claude Haiku 5.5', open: false, main: 94, facts: 2.94, fabNum: 0, fabName: 0, wikiOrig: 20, wikiChanged: 17 },
  { model: 'Mistral 7B', open: true, main: 74, facts: 2.72, fabNum: 4, fabName: 2, sec: 10.8, wikiOrig: 12, wikiChanged: 11 },
  { model: 'Aya Expanse 8B', open: true, main: 66, facts: 2.62, fabNum: 0, fabName: 0, sec: 7.0, wikiOrig: 10, wikiChanged: 10 },
  { model: 'Llama 3.2 3B', open: true, main: 42, facts: 2.26, fabNum: 0, fabName: 0, sec: 3.0, wikiOrig: 9, wikiChanged: 9 },
  { model: 'Phi 3.5 3.8B', open: true, main: 24, facts: 2.32, fabNum: 48, fabName: 46, sec: 10.7, wikiOrig: 2, wikiChanged: 3 },
  { model: 'Qwen 2.5 7B', open: true, main: 22, facts: 1.98, fabNum: 0, fabName: 2, sec: 4.3, wikiOrig: 6, wikiChanged: 5 },
  { model: 'Gemma 2 9B', open: true, main: 18, facts: 1.88, fabNum: 0, fabName: 0, sec: 6.3, wikiOrig: 5, wikiChanged: 5 },
  { model: 'Llama 3.1 8B', open: true, main: 0, facts: 0.78, fabNum: 46, fabName: 22, sec: 3.9, wikiOrig: 1, wikiChanged: 1 },
];
const repo = 'https://github.com/foqunty/turkce-ozet-halusinasyon-benchmark';

export function BenchmarkPage() {
  return <main id="main" className="section-container content-section benchmark-page">
    <a className="benchmark-back" href="#home">← back to portfolio</a>
    <span className="section-command"><span className="green-text">~ $</span> cat leaderboard.md</span>
    <h2>Turkish summary benchmark<span className="green-text">.</span></h2>
    <p className="section-description">Each question is a short Turkish paragraph with three critical facts: a number, a date and a name. A summary is correct only if it keeps all three and invents nothing. Scoring is done by code from the raw model output. Same prompt for every model, temperature 0, open models run locally with Ollama on an Apple M4 (16 GB).</p>
    <div className="benchmark-table-wrap"><table className="benchmark-table">
      <thead><tr><th>#</th><th>model</th><th>correct</th><th>facts / 3</th><th>made-up numbers</th><th>made-up names</th><th>s / question</th><th>wiki orig.</th><th>wiki changed</th></tr></thead>
      <tbody>{rows.map((r, i) => <tr key={r.model}><td>{i + 1}</td><td>{r.model}{r.open && <span className="benchmark-open">open</span>}</td><td><span className="benchmark-bar" style={{ width: `${r.main}%` }} /><strong>{r.main}%</strong></td><td>{r.facts.toFixed(2)}</td><td className={r.fabNum >= 20 ? 'benchmark-bad' : ''}>{r.fabNum}%</td><td className={r.fabName >= 20 ? 'benchmark-bad' : ''}>{r.fabName}%</td><td>{r.sec ? r.sec.toFixed(1) : '–'}</td><td>{r.wikiOrig}/25</td><td>{r.wikiChanged}/25</td></tr>)}</tbody>
    </table></div>
    <p className="section-description">"Wiki changed" is a memorization trap: real Wikipedia texts with one fact altered (e.g. Malazgirt 1071 → 1074). None of the 10 models wrote the memorized value instead of the one in the text. Cost is $0 for all runs (local models and a subscription UI), so time per question is shown instead.</p>
    <div className="benchmark-charts">
      <figure><img src="./benchmark/model_kategori.png" alt="Accuracy by model and category" loading="lazy" /><figcaption>Accuracy by category (news · science · sports)</figcaption></figure>
      <figure><img src="./benchmark/maliyet_dogruluk.png" alt="Accuracy versus time per question" loading="lazy" /><figcaption>Accuracy vs. time per question</figcaption></figure>
    </div>
    <div className="project-links"><a href={repo} target="_blank" rel="noopener noreferrer">Source code and method <ArrowUpRight size={14} /></a></div>
  </main>;
}
