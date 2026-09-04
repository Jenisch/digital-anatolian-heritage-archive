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
          <a href="#methodology">Methodology</a>
          <a href="#about">About</a>
        </nav>
      </header>

      <section className="hero shell" id="top">
        <p className="eyebrow">Digital humanities · Cultural heritage · Anatolia</p>
        <h1>History is not a single layer.</h1>
        <p className="lede">
          The Digital Anatolian Heritage Archive is a research-led interface for exploring archaeological places through chronology, geography, evidence, and scholarly context.
        </p>
        <div className="hero-actions">
          <a className="primary-action" href="#explore">Explore the foundation dataset</a>
          <a className="text-action" href="#methodology">Read the methodology</a>
        </div>
      </section>

      <section className="research-question shell" aria-labelledby="research-question-heading">
        <p className="section-label" id="research-question-heading">Research question</p>
        <blockquote>
          How can archaeological heritage from different periods of Anatolia be represented digitally without reducing complex historical information to a simple tourist catalogue?
        </blockquote>
      </section>

      <section className="explore shell" id="explore" aria-labelledby="explore-heading">
        <div className="section-heading">
          <div>
            <p className="section-label">Foundation dataset · 01</p>
            <h2 id="explore-heading">Eight sites, multiple historical layers.</h2>
          </div>
          <p>
            A deliberately small corpus for testing chronology, provenance, uncertainty, and cross-period discovery before the archive expands.
          </p>
        </div>

        <div className="site-grid">
          {sites.map((site, index) => (
            <article className="site-card" key={site.slug}>
              <div className="site-index">{String(index + 1).padStart(2, "0")}</div>
              <div>
                <p className="site-region">{site.modernRegion}</p>
                <h3>{site.name}</h3>
                <p>{site.context}</p>
              </div>
              <span className="status">Research record pending</span>
            </article>
          ))}
        </div>
      </section>

      <section className="methodology shell" id="methodology" aria-labelledby="methodology-heading">
        <div>
          <p className="section-label">Methodology · 02</p>
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
            <h3>Rights remain visible</h3>
            <p>Media provenance and licensing are treated as part of the cultural record rather than presentation-layer metadata.</p>
          </article>
        </div>
      </section>

      <section className="about shell" id="about" aria-labelledby="about-heading">
        <p className="section-label">About · 03</p>
        <div>
          <h2 id="about-heading">A public-facing archaeological information system.</h2>
          <p>
            The archive is being developed in stages: metadata first, then site records, chronology, geographic exploration, and finally linked discovery across periods and places.
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
