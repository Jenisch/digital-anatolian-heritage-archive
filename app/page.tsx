import HeritageExplorer from "@/components/heritage-explorer";
import sites from "@/data/foundation-sites.json";

export default function Home() {
  return (
    <main>
      <header className="site-header shell">
        <a className="wordmark" href="#top" aria-label="Digital Anatolian Heritage Archive home">
          DAHA
        </a>
        <nav aria-label="Primary navigation">
          <a href="#explore">Explore</a>
          <a href="#corpus">Corpus</a>
          <a href="#methodology">Methodology</a>
        </nav>
      </header>

      <section className="hero shell" id="top">
        <p className="eyebrow">Digital humanities · Cultural heritage · Anatolia</p>
        <h1>History is not a single layer.</h1>
        <p className="lede">
          The Digital Anatolian Heritage Archive is a research-led interface for exploring archaeological places through chronology, geography, evidence, and scholarly context.
        </p>
        <div className="hero-actions">
          <a className="primary-action" href="#explore">Open the interactive explorer</a>
          <a className="text-action" href="#methodology">Read the methodology</a>
        </div>
      </section>

      <section className="research-question shell" aria-labelledby="research-question-heading">
        <p className="section-label" id="research-question-heading">Research question</p>
        <blockquote>
          How can archaeological heritage from different periods of Anatolia be represented digitally without reducing complex historical information to a simple tourist catalogue?
        </blockquote>
      </section>

      <section className="explore explorer-interactive shell" id="explore" aria-labelledby="explore-heading">
        <div className="section-heading">
          <div>
            <p className="section-label">Interactive explorer · 01</p>
            <h2 id="explore-heading">Move through place and time.</h2>
          </div>
          <p>
            Filter the foundation corpus by historical period and a broad chronological window, then move directly from spatial discovery into sourced research records.
          </p>
        </div>
        <HeritageExplorer />
      </section>

      <section className="explore shell" id="corpus" aria-labelledby="corpus-heading">
        <div className="section-heading">
          <div>
            <p className="section-label">Foundation corpus · 02</p>
            <h2 id="corpus-heading">Eight sites, multiple historical layers.</h2>
          </div>
          <p>
            A deliberately small corpus for testing chronology, provenance, uncertainty, and cross-period discovery before the archive expands.
          </p>
        </div>

        <div className="site-grid">
          {sites.map((site, index) => {
            const recordReady = ["gobekli-tepe", "hattusa"].includes(site.slug);

            return (
              <article className={`site-card${recordReady ? " site-card-ready" : ""}`} key={site.slug}>
                <div className="site-index">{String(index + 1).padStart(2, "0")}</div>
                <div>
                  <p className="site-region">{site.modernRegion}</p>
                  <h3>{site.name}</h3>
                  <p>{site.context}</p>
                </div>
                {recordReady ? (
                  <a className="record-action" href={`/sites/${site.slug}`}>
                    View sourced record →
                  </a>
                ) : (
                  <span className="status">Research record pending</span>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <section className="methodology shell" id="methodology" aria-labelledby="methodology-heading">
        <div>
          <p className="section-label">Methodology · 03</p>
          <h2 id="methodology-heading">Complexity should survive the interface.</h2>
        </div>
        <div className="principles">
          <article>
            <span>01</span>
            <h3>Uncertainty is data</h3>
            <p>Approximate, ranged, disputed, and unknown dates remain explicit instead of being converted into false precision.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Claims carry provenance</h3>
            <p>Chronological and interpretive claims are designed to resolve to identifiable scholarly or institutional sources.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Exploration is not evidence</h3>
            <p>Broad map and timeline windows support discovery. Sourced site records remain the authoritative layer for archaeological claims.</p>
          </article>
        </div>
      </section>

      <section className="about shell" id="about" aria-labelledby="about-heading">
        <p className="section-label">About · 04</p>
        <div>
          <h2 id="about-heading">A public-facing archaeological information system.</h2>
          <p>
            The archive is being developed in stages: metadata, sourced site records, chronological and geographic exploration, then linked discovery across periods, places, people, and objects.
          </p>
        </div>
      </section>

      <footer className="shell">
        <p>Digital Anatolian Heritage Archive</p>
        <p>Research prototype · 2026</p>
      </footer>
    </main>
  );
}
