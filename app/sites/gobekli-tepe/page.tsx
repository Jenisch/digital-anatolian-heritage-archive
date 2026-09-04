import type { Metadata } from "next";
import Link from "next/link";
import VisualDossier from "@/components/visual-dossier";
import record from "@/data/sites/gobekli-tepe.json";
import dossiers from "@/data/visual-dossiers.json";

export const metadata: Metadata = {
  title: "Göbekli Tepe | Digital Anatolian Heritage Archive",
  description:
    "Explore Göbekli Tepe through its landscape, monumental architecture, imagery, changing archaeological interpretation, chronology, and research history.",
};

function CitationLinks({ ids }: { ids: string[] }) {
  return (
    <sup className="citation-links" aria-label="Sources">
      {ids.map((id) => {
        const index = record.bibliography.findIndex((source) => source.id === id) + 1;
        return index > 0 ? (
          <a key={id} href={`#source-${index}`} aria-label={`Source ${index}`}>
            {index}
          </a>
        ) : null;
      })}
    </sup>
  );
}

export default function GobekliTepePage() {
  const image = record.media[0];
  const dossier = dossiers["gobekli-tepe"];

  return (
    <main>
      <header className="site-header shell">
        <Link className="wordmark" href="/" aria-label="Digital Anatolian Heritage Archive home">
          DAHA
        </Link>
        <nav aria-label="Record navigation">
          <a href="#story">Story</a>
          <a href="#chronology">Chronology</a>
          <a href="#research">Research</a>
        </nav>
      </header>

      <section className="record-hero shell">
        <div className="record-title-block">
          <p className="eyebrow">Research record · v{record.recordVersion}</p>
          <h1>{record.canonicalName}</h1>
          <p className="record-location">
            {record.modernLocation.locality}, {record.modernLocation.district}, {record.modernLocation.province}
          </p>
        </div>
        <dl className="record-facts">
          <div><dt>Period</dt><dd>Pre-Pottery Neolithic</dd></div>
          <div><dt>Occupation</dt><dd>c. 9500/9250–8000/7750 BCE</dd></div>
          <div><dt>Landscape</dt><dd>Germuş Mountains · c. 770 m</dd></div>
          <div><dt>Heritage</dt><dd>UNESCO World Heritage · 2018</dd></div>
        </dl>
      </section>

      <figure className="record-figure shell">
        <div className="record-image" role="img" aria-label="Excavated monumental structures at Göbekli Tepe" />
        <figcaption>
          {image.title} · {image.creator}. <a href={image.sourceUrl ?? undefined}>Wikimedia Commons</a> ·{" "}
          <a href={image.licenceUrl ?? undefined}>{image.rightsStatus}</a>
        </figcaption>
      </figure>

      <section className="record-introduction shell" id="story">
        <p className="section-label">The site · 01</p>
        <div>
          <p className="record-deck">
            Monumental stone architecture, settlement evidence and an unusually dense visual world make Göbekli Tepe one of the key places for understanding the social transformations of the early Neolithic.
          </p>
          <p>{record.historicalContext.text}<CitationLinks ids={record.historicalContext.sourceIds} /></p>
          <p>{record.archaeologicalSignificance.text}<CitationLinks ids={record.archaeologicalSignificance.sourceIds} /></p>
        </div>
      </section>

      <section className="record-highlights shell" aria-label="Göbekli Tepe at a glance">
        <article><span>01</span><strong>5.5 m</strong><p>Height reached by some of the monumental T-shaped limestone pillars.</p></article>
        <article><span>02</span><strong>c. 11,000 years</strong><p>Approximate distance between the site's early occupation and the present.</p></article>
        <article><span>03</span><strong>15 km</strong><p>Approximate distance northwest of the modern city of Şanlıurfa.</p></article>
        <article><span>04</span><strong>2018</strong><p>Year Göbekli Tepe entered the UNESCO World Heritage List.</p></article>
      </section>

      <VisualDossier title={dossier.title} intro={dossier.intro} images={dossier.images} />

      <section className="story-sections shell">
        {record.narrativeSections.map((section, index) => (
          <article className="story-section" id={section.id} key={section.id}>
            <div className="story-index"><p className="section-label">{section.label} · {String(index + 2).padStart(2, "0")}</p></div>
            <div className="story-copy">
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph, paragraphIndex) => (
                <p key={`${section.id}-${paragraphIndex}`}>
                  {paragraph}
                  {paragraphIndex === section.paragraphs.length - 1 ? <CitationLinks ids={section.sourceIds} /> : null}
                </p>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="record-section shell" id="chronology">
        <div className="record-section-label"><p className="section-label">Chronology · 06</p></div>
        <div className="record-copy">
          <h2>A long sequence, not a single moment.</h2>
          <p className="section-intro">Dates are presented as ranges because the archaeological sequence is reconstructed from stratigraphy, material evidence and scientific dating rather than a written calendar.</p>
          <div className="chronology-list">
            {record.chronology.map((phase) => (
              <article key={phase.label}>
                <div><p className="chronology-date">{phase.displayDate}</p><h3>{phase.label}</h3></div>
                <div>
                  <p>{phase.note}</p>
                  <p className="chronology-meta">{phase.certainty} dating · {phase.datingBasis} basis<CitationLinks ids={phase.sourceIds} /></p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="record-section shell" id="research">
        <div className="record-section-label"><p className="section-label">Research history · 07</p></div>
        <div className="record-copy">
          <h2>The interpretation changed as the excavation expanded.</h2>
          <p>{record.excavationHistory.text}<CitationLinks ids={record.excavationHistory.sourceIds} /></p>
          <div className="research-timeline">
            <article><strong>1963</strong><span>Site recorded during an Istanbul–Chicago survey.</span></article>
            <article><strong>1994</strong><span>Klaus Schmidt, Mehmet Akman and Michael Morsch recognise its significance during survey work.</span></article>
            <article><strong>1995</strong><span>Systematic excavations begin.</span></article>
            <article><strong>2018</strong><span>Göbekli Tepe is inscribed on the UNESCO World Heritage List.</span></article>
            <article><strong>2023</strong><span>A life-size painted wild boar statue is documented in Special Building D.</span></article>
          </div>
          <aside className="editorial-note"><span>Interpretive caution</span><p>{record.editorialNotes}</p></aside>
        </div>
      </section>

      <section className="record-notes shell" id="sources">
        <div>
          <p className="section-label">Record notes · 08</p>
          <h2>Evidence stays available without dominating the story.</h2>
        </div>
        <div className="record-note-grid">
          <div><span>Coordinates</span><strong>{record.coordinates.latitude}° N · {record.coordinates.longitude}° E</strong></div>
          <a href="https://whc.unesco.org/en/list/1572/"><span>UNESCO property</span><strong>{record.externalIdentifiers.unesco}</strong></a>
          <a href={`https://www.wikidata.org/wiki/${record.externalIdentifiers.wikidata}`}><span>Wikidata authority</span><strong>{record.externalIdentifiers.wikidata}</strong></a>
        </div>
        <details className="source-disclosure">
          <summary>View {record.bibliography.length} references</summary>
          <ol className="bibliography-list">
            {record.bibliography.map((source, index) => (
              <li id={`source-${index + 1}`} key={source.id}>
                <div><span className="source-type">{source.sourceType}</span><p>{source.citation}</p></div>
                {source.url ? <a href={source.url} target="_blank" rel="noreferrer">Open ↗</a> : null}
              </li>
            ))}
          </ol>
        </details>
      </section>

      <footer className="shell">
        <p>Digital Anatolian Heritage Archive</p>
        <p>Record {record.id} · reviewed {record.lastReviewed}</p>
      </footer>
    </main>
  );
}
