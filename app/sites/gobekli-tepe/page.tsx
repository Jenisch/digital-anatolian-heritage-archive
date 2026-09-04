import type { Metadata } from "next";
import record from "@/data/sites/gobekli-tepe.json";

export const metadata: Metadata = {
  title: "Göbekli Tepe | Digital Anatolian Heritage Archive",
  description:
    "A sourced digital heritage record for Göbekli Tepe covering chronology, archaeological context, excavation history, provenance, and media rights.",
};

function CitationLinks({ ids }: { ids: string[] }) {
  return (
    <span className="citation-links" aria-label="Sources">
      {ids.map((id) => {
        const index = record.bibliography.findIndex((source) => source.id === id) + 1;
        return index > 0 ? (
          <a key={id} href={`#source-${index}`} aria-label={`Source ${index}`}>
            [{index}]
          </a>
        ) : null;
      })}
    </span>
  );
}

export default function GobekliTepePage() {
  const image = record.media[0];

  return (
    <main>
      <header className="site-header shell">
        <a className="wordmark" href="/" aria-label="Digital Anatolian Heritage Archive home">
          DAHA
        </a>
        <nav aria-label="Record navigation">
          <a href="#overview">Overview</a>
          <a href="#chronology">Chronology</a>
          <a href="#sources">Sources</a>
        </nav>
      </header>

      <section className="record-hero shell">
        <div>
          <p className="eyebrow">Research record · v{record.recordVersion}</p>
          <h1>{record.canonicalName}</h1>
          <p className="record-location">
            {record.modernLocation.locality}, {record.modernLocation.district}, {record.modernLocation.province}
          </p>
        </div>
        <dl className="record-facts">
          <div>
            <dt>Period</dt>
            <dd>Pre-Pottery Neolithic</dd>
          </div>
          <div>
            <dt>Coordinates</dt>
            <dd>{record.coordinates.latitude}° N · {record.coordinates.longitude}° E</dd>
          </div>
          <div>
            <dt>Heritage status</dt>
            <dd>UNESCO World Heritage · 2018</dd>
          </div>
          <div>
            <dt>Last reviewed</dt>
            <dd>{record.lastReviewed}</dd>
          </div>
        </dl>
      </section>

      <figure className="record-figure shell">
        <div
          className="record-image"
          role="img"
          aria-label="Excavated monumental structures at Göbekli Tepe"
        />
        <figcaption>
          {image.title} · {image.creator}. <a href={image.sourceUrl ?? undefined}>Wikimedia Commons</a> ·{" "}
          <a href={image.licenceUrl ?? undefined}>{image.rightsStatus}</a>
        </figcaption>
      </figure>

      <section className="record-section shell" id="overview">
        <div className="record-section-label">
          <p className="section-label">Context · 01</p>
        </div>
        <div className="record-copy">
          <h2>More than a “first temple” story.</h2>
          <p>
            {record.historicalContext.text}
            <CitationLinks ids={record.historicalContext.sourceIds} />
          </p>
          <p>
            {record.archaeologicalSignificance.text}
            <CitationLinks ids={record.archaeologicalSignificance.sourceIds} />
          </p>
          <aside className="editorial-note">
            <span>Editorial note</span>
            <p>{record.editorialNotes}</p>
          </aside>
        </div>
      </section>

      <section className="record-section shell" id="chronology">
        <div className="record-section-label">
          <p className="section-label">Chronology · 02</p>
        </div>
        <div className="record-copy">
          <h2>Dating without false precision.</h2>
          <div className="chronology-list">
            {record.chronology.map((phase) => (
              <article key={phase.label}>
                <div>
                  <p className="chronology-date">{phase.displayDate}</p>
                  <h3>{phase.label}</h3>
                </div>
                <div>
                  <p>{phase.note}</p>
                  <p className="chronology-meta">
                    Certainty: {phase.certainty} · Basis: {phase.datingBasis}
                    <CitationLinks ids={phase.sourceIds} />
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="record-section shell">
        <div className="record-section-label">
          <p className="section-label">Excavation · 03</p>
        </div>
        <div className="record-copy">
          <h2>From survey to long-term research.</h2>
          <p>
            {record.excavationHistory.text}
            <CitationLinks ids={record.excavationHistory.sourceIds} />
          </p>
        </div>
      </section>

      <section className="record-section shell">
        <div className="record-section-label">
          <p className="section-label">Identifiers · 04</p>
        </div>
        <div className="record-copy">
          <h2>Linked, but not outsourced.</h2>
          <p>
            External identifiers support reconciliation and discovery. They are not treated as substitutes for scholarly evidence.
          </p>
          <div className="identifier-grid">
            <a href="https://whc.unesco.org/en/list/1572/">
              <span>UNESCO</span>
              <strong>{record.externalIdentifiers.unesco}</strong>
            </a>
            <a href={`https://www.wikidata.org/wiki/${record.externalIdentifiers.wikidata}`}>
              <span>Wikidata</span>
              <strong>{record.externalIdentifiers.wikidata}</strong>
            </a>
          </div>
        </div>
      </section>

      <section className="sources shell" id="sources">
        <div className="section-heading">
          <div>
            <p className="section-label">Bibliography · 05</p>
            <h2>Sources behind the record.</h2>
          </div>
          <p>
            Institutional heritage records, excavation documentation, and academic publications are kept distinct from authority-data identifiers.
          </p>
        </div>
        <ol className="bibliography-list">
          {record.bibliography.map((source, index) => (
            <li id={`source-${index + 1}`} key={source.id}>
              <div>
                <span className="source-type">{source.sourceType}</span>
                <p>{source.citation}</p>
              </div>
              {source.url ? (
                <a href={source.url} target="_blank" rel="noreferrer">
                  Open source ↗
                </a>
              ) : null}
            </li>
          ))}
        </ol>
      </section>

      <footer className="shell">
        <p>Digital Anatolian Heritage Archive</p>
        <p>Record {record.id} · version {record.recordVersion}</p>
      </footer>
    </main>
  );
}
