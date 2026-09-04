import Link from "next/link";
import type { Metadata } from "next";
import VisualDossier from "@/components/visual-dossier";
import record from "@/data/sites/gordion.json";
import dossiers from "@/data/visual-dossiers.json";

export const metadata: Metadata = {
  title: "Gordion | Digital Anatolian Heritage Archive",
  description:
    "Explore Gordion through Phrygian citadel architecture, destruction chronology, textile production, elite tumuli, craft, and excavation history.",
};

function CitationLinks({ ids }: { ids: string[] }) {
  return (
    <sup className="citation-links" aria-label="Sources">
      {ids.map((id) => {
        const index = record.bibliography.findIndex((source) => source.id === id) + 1;
        return index > 0 ? <a key={id} href={`#source-${index}`} aria-label={`Source ${index}`}>{index}</a> : null;
      })}
    </sup>
  );
}

export default function GordionPage() {
  const image = record.media[0];
  const dossier = dossiers.gordion;

  return (
    <main>
      <header className="site-header shell">
        <Link className="wordmark" href="/" aria-label="Digital Anatolian Heritage Archive home">DAHA</Link>
        <nav aria-label="Record navigation"><a href="#story">Story</a><a href="#chronology">Chronology</a><a href="#research">Research</a></nav>
      </header>

      <section className="record-hero shell">
        <div className="record-title-block">
          <p className="eyebrow">Research record · v{record.recordVersion}</p>
          <h1>{record.canonicalName}</h1>
          <p className="record-location">{record.modernLocation.locality}, {record.modernLocation.district}, {record.modernLocation.province}</p>
        </div>
        <dl className="record-facts">
          <div><dt>Focus</dt><dd>Phrygian Iron Age capital</dd></div>
          <div><dt>Destruction</dt><dd>c. 800 BCE</dd></div>
          <div><dt>Royal landscape</dt><dd>130 known burial mounds around the citadel</dd></div>
          <div><dt>Heritage</dt><dd>UNESCO World Heritage · 2023</dd></div>
        </dl>
      </section>

      <figure className="record-figure shell">
        <div
          className="record-image"
          role="img"
          aria-label="Aerial view of the Citadel Mound at Gordion"
          style={{
            backgroundImage:
              'linear-gradient(rgba(23,23,20,.04), rgba(23,23,20,.04)), url("https://commons.wikimedia.org/wiki/Special:Redirect/file/Gordion%20Citadel%20Mound%20aerial%20overview%202017.jpg")',
          }}
        />
        <figcaption>{image.title} · {image.creator}. <a href={image.sourceUrl ?? undefined}>Wikimedia Commons</a> ·{" "}<a href={image.licenceUrl ?? undefined}>{image.rightsStatus}</a></figcaption>
      </figure>

      <section className="record-introduction shell" id="story">
        <p className="section-label">The capital · 01</p>
        <div>
          <p className="record-deck">Gordion is strongest when Midas is treated as one historical layer among architecture, craft, fire, burial and a much longer archaeological sequence.</p>
          <p>{record.historicalContext.text}<CitationLinks ids={record.historicalContext.sourceIds} /></p>
          <p>{record.archaeologicalSignificance.text}<CitationLinks ids={record.archaeologicalSignificance.sourceIds} /></p>
        </div>
      </section>

      <section className="record-highlights shell" aria-label="Gordion at a glance">
        <article><span>01</span><strong>10 m</strong><p>Approximate surviving height of the Early Phrygian gate's stone walls.</p></article>
        <article><span>02</span><strong>130</strong><p>Burial mounds documented around the citadel in current project reporting.</p></article>
        <article><span>03</span><strong>c. 740 BCE</strong><p>Current tree-ring-based date for Tumulus MM, the conventional “Midas Mound.”</p></article>
        <article><span>04</span><strong>2023</strong><p>Year Gordion entered the UNESCO World Heritage List.</p></article>
      </section>

      <VisualDossier title={dossier.title} intro={dossier.intro} images={dossier.images} />

      <section className="story-sections shell">
        {record.narrativeSections.map((section, index) => (
          <article className="story-section" id={section.id} key={section.id}>
            <div className="story-index"><p className="section-label">{section.label} · {String(index + 2).padStart(2, "0")}</p></div>
            <div className="story-copy">
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph, paragraphIndex) => <p key={`${section.id}-${paragraphIndex}`}>{paragraph}{paragraphIndex === section.paragraphs.length - 1 ? <CitationLinks ids={section.sourceIds} /> : null}</p>)}
            </div>
          </article>
        ))}
      </section>

      <section className="record-section shell" id="chronology">
        <div className="record-section-label"><p className="section-label">Chronology · 08</p></div>
        <div className="record-copy">
          <h2>The “age of Midas” sits inside a much longer sequence.</h2>
          <p className="section-intro">The record keeps Bronze Age occupation, Early and Middle Phrygian phases, the c. 800 BCE destruction, Tumulus MM and Achaemenid Gordion separate so that named rulers do not flatten archaeological time.</p>
          <div className="chronology-list">{record.chronology.map((phase) => <article key={phase.label}><div><p className="chronology-date">{phase.displayDate}</p><h3>{phase.label}</h3></div><div><p>{phase.note}</p><p className="chronology-meta">{phase.certainty} dating · {phase.datingBasis} basis<CitationLinks ids={phase.sourceIds} /></p></div></article>)}</div>
        </div>
      </section>

      <section className="record-section shell" id="research">
        <div className="record-section-label"><p className="section-label">Research history · 09</p></div>
        <div className="record-copy">
          <h2>A century of excavation keeps undoing convenient stories.</h2>
          <p>{record.excavationHistory.text}<CitationLinks ids={record.excavationHistory.sourceIds} /></p>
          <div className="research-timeline">
            <article><strong>1893</strong><span>Alfred Körte identifies the archaeological site as ancient Gordion.</span></article>
            <article><strong>1900</strong><span>Alfred and Gustav Körte conduct the first controlled excavation campaign.</span></article>
            <article><strong>1950</strong><span>Rodney S. Young begins the long-term Penn Museum excavation programme.</span></article>
            <article><strong>1988</strong><span>Fieldwork resumes under Mary M. Voigt with new stratigraphic and scientific approaches.</span></article>
            <article><strong>2023</strong><span>Gordion is inscribed on the UNESCO World Heritage List under criterion (iii).</span></article>
            <article><strong>2025</strong><span>Tumulus T-26 reveals an unrobbed c. 750 BCE elite cremation burial, moving the appearance of elite cremation at Gordion more than a century earlier.</span></article>
          </div>
          <aside className="editorial-note"><span>Interpretive caution</span><p>{record.editorialNotes}</p></aside>
        </div>
      </section>

      <section className="record-notes shell" id="sources">
        <div><p className="section-label">Record notes · 10</p><h2>Legend remains visible, but evidence controls the chronology.</h2></div>
        <div className="record-note-grid">
          <div><span>Coordinates</span><strong>{record.coordinates.latitude}° N · {record.coordinates.longitude}° E</strong></div>
          <a href="https://whc.unesco.org/en/list/1669/"><span>UNESCO property</span><strong>{record.externalIdentifiers.unesco}</strong></a>
          <a href={`https://www.wikidata.org/wiki/${record.externalIdentifiers.wikidata}`}><span>Wikidata authority</span><strong>{record.externalIdentifiers.wikidata}</strong></a>
        </div>
        <details className="source-disclosure"><summary>View {record.bibliography.length} references</summary><ol className="bibliography-list">{record.bibliography.map((source, index) => <li id={`source-${index + 1}`} key={source.id}><div><span className="source-type">{source.sourceType}</span><p>{source.citation}</p></div>{source.url ? <a href={source.url} target="_blank" rel="noreferrer">Open ↗</a> : null}</li>)}</ol></details>
      </section>

      <footer className="shell"><p>Digital Anatolian Heritage Archive</p><p>Record {record.id} · reviewed {record.lastReviewed}</p></footer>
    </main>
  );
}
