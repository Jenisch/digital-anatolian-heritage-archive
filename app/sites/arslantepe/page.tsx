import Link from "next/link";
import type { Metadata } from "next";
import VisualDossier from "@/components/visual-dossier";
import record from "@/data/sites/arslantepe.json";
import dossiers from "@/data/visual-dossiers.json";

export const metadata: Metadata = {
  title: "Arslantepe | Digital Anatolian Heritage Archive",
  description:
    "Explore Arslantepe through early state formation, palace architecture, administration, metal weapons, political change, chronology, and excavation history.",
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

export default function ArslantepePage() {
  const image = record.media[0];
  const dossier = dossiers.arslantepe;

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
          <div><dt>Sequence</dt><dd>Late Chalcolithic → Iron Age</dd></div>
          <div><dt>Palatial phase</dt><dd>3400–3100 BCE</dd></div>
          <div><dt>Administration</dt><dd>2,200+ clay sealings</dd></div>
          <div><dt>Heritage</dt><dd>UNESCO World Heritage · 2021</dd></div>
        </dl>
      </section>

      <figure className="record-figure shell">
        <div className="record-image" role="img" aria-label="Archaeological remains at Arslantepe in Malatya" style={{backgroundImage:'linear-gradient(rgba(23,23,20,.04), rgba(23,23,20,.04)), url("https://commons.wikimedia.org/wiki/Special:Redirect/file/Arslantepe%20Ruins%2C%20Malatya%202018-09-28%2004.jpg")'}} />
        <figcaption>{image.title} · {image.creator}. <a href={image.sourceUrl ?? undefined}>Wikimedia Commons</a> ·{" "}<a href={image.licenceUrl ?? undefined}>{image.rightsStatus}</a></figcaption>
      </figure>

      <section className="record-introduction shell" id="story">
        <p className="section-label">The political centre · 01</p>
        <div>
          <p className="record-deck">At Arslantepe, power becomes visible not through a written royal archive, but through rooms, food, seals, images, weapons and controlled movement.</p>
          <p>{record.historicalContext.text}<CitationLinks ids={record.historicalContext.sourceIds} /></p>
          <p>{record.archaeologicalSignificance.text}<CitationLinks ids={record.archaeologicalSignificance.sourceIds} /></p>
        </div>
      </section>

      <section className="record-highlights shell" aria-label="Arslantepe at a glance">
        <article><span>01</span><strong>30 m</strong><p>Approximate height of the archaeological tell above the Malatya plain.</p></article>
        <article><span>02</span><strong>4.5 ha</strong><p>Approximate surface area of the mound described by UNESCO.</p></article>
        <article><span>03</span><strong>2,200+</strong><p>Clay sealings studied from the fourth-millennium administrative system.</p></article>
        <article><span>04</span><strong>2021</strong><p>Year Arslantepe entered the UNESCO World Heritage List.</p></article>
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
          <h2>Centralisation was a phase, not the identity of the whole mound.</h2>
          <p className="section-intro">The famous palace belongs to a narrow interval within a sequence that stretches across changing domestic, administrative, funerary and imperial landscapes.</p>
          <div className="chronology-list">{record.chronology.map((phase) => <article key={phase.label}><div><p className="chronology-date">{phase.displayDate}</p><h3>{phase.label}</h3></div><div><p>{phase.note}</p><p className="chronology-meta">{phase.certainty} dating · {phase.datingBasis} basis<CitationLinks ids={phase.sourceIds} /></p></div></article>)}</div>
        </div>
      </section>

      <section className="record-section shell" id="research">
        <div className="record-section-label"><p className="section-label">Research history · 09</p></div>
        <div className="record-copy">
          <h2>Sixty-five years of excavation now meet a new public presentation.</h2>
          <p>{record.excavationHistory.text}<CitationLinks ids={record.excavationHistory.sourceIds} /></p>
          <div className="research-timeline">
            <article><strong>1961</strong><span>Sapienza-led systematic excavation begins under Salvatore M. Puglisi.</span></article>
            <article><strong>1990</strong><span>Marcella Frangipane assumes direction and expands research on the fourth-millennium political system.</span></article>
            <article><strong>2021</strong><span>Arslantepe is inscribed on the UNESCO World Heritage List.</span></article>
            <article><strong>2025</strong><span>New work on the western slope refines the earliest well-documented Late Chalcolithic domestic sequence.</span></article>
            <article><strong>2026</strong><span>A new visitor route and expanded protective roofing over the palatial complex open in August.</span></article>
          </div>
          <aside className="editorial-note"><span>Interpretive caution</span><p>{record.editorialNotes}</p></aside>
        </div>
      </section>

      <section className="record-notes shell" id="sources">
        <div><p className="section-label">Record notes · 10</p><h2>State formation is presented as evidence and process, not an origin myth.</h2></div>
        <div className="record-note-grid">
          <div><span>Coordinates</span><strong>{record.coordinates.latitude}° N · {record.coordinates.longitude}° E</strong></div>
          <a href="https://whc.unesco.org/en/list/1622/"><span>UNESCO property</span><strong>{record.externalIdentifiers.unesco}</strong></a>
          <a href={`https://www.wikidata.org/wiki/${record.externalIdentifiers.wikidata}`}><span>Wikidata authority</span><strong>{record.externalIdentifiers.wikidata}</strong></a>
        </div>
        <details className="source-disclosure"><summary>View {record.bibliography.length} references</summary><ol className="bibliography-list">{record.bibliography.map((source, index) => <li id={`source-${index + 1}`} key={source.id}><div><span className="source-type">{source.sourceType}</span><p>{source.citation}</p></div>{source.url ? <a href={source.url} target="_blank" rel="noreferrer">Open ↗</a> : null}</li>)}</ol></details>
      </section>

      <footer className="shell"><p>Digital Anatolian Heritage Archive</p><p>Record {record.id} · reviewed {record.lastReviewed}</p></footer>
    </main>
  );
}
