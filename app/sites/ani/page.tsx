import Link from "next/link";
import type { Metadata } from "next";
import VisualDossier from "@/components/visual-dossier";
import record from "@/data/sites/ani.json";
import dossier from "@/data/visual-dossiers/ani.json";

export const metadata: Metadata = {
  title: "Ani | Digital Anatolian Heritage Archive",
  description:
    "Explore Ani through Bagratid urbanism, Silk Road commerce, Armenian, Georgian and Islamic architectural exchange, conservation, and current excavation.",
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

export default function AniPage() {
  const image = record.media[0];

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
          <div><dt>Focus</dt><dd>Medieval capital and merchant city</dd></div>
          <div><dt>Bagratid capital</dt><dd>961–1045 CE</dd></div>
          <div><dt>Landscape</dt><dd>Silk Roads · frontier plateau</dd></div>
          <div><dt>Heritage</dt><dd>UNESCO World Heritage · 2016</dd></div>
        </dl>
      </section>

      <figure className="record-figure shell">
        <div
          className="record-image"
          role="img"
          aria-label="Cathedral of Ani on the Kars plateau"
          style={{
            backgroundImage:
              'linear-gradient(rgba(23,23,20,.04), rgba(23,23,20,.04)), url("https://commons.wikimedia.org/wiki/Special:Redirect/file/Cathedral%20of%20Ani%2C%20Kars%20Province.jpg")',
          }}
        />
        <figcaption>{image.title} · {image.creator}. <a href={image.sourceUrl ?? undefined}>Wikimedia Commons</a> ·{" "}<a href={image.licenceUrl ?? undefined}>{image.rightsStatus}</a></figcaption>
      </figure>

      <section className="record-introduction shell" id="story">
        <p className="section-label">The frontier city · 01</p>
        <div>
          <p className="record-deck">Ani is not a field of isolated monuments. It is a medieval city whose walls, markets, churches, mosque, houses and routes record centuries of political and cultural overlap.</p>
          <p>{record.historicalContext.text}<CitationLinks ids={record.historicalContext.sourceIds} /></p>
          <p>{record.archaeologicalSignificance.text}<CitationLinks ids={record.archaeologicalSignificance.sourceIds} /></p>
        </div>
      </section>

      <section className="record-highlights shell" aria-label="Ani at a glance">
        <article><span>01</span><strong>961</strong><p>Year Ashot III established Ani as the Bagratid royal capital.</p></article>
        <article><span>02</span><strong>250.7 ha</strong><p>Area of the UNESCO World Heritage property on the frontier plateau.</p></article>
        <article><span>03</span><strong>1215</strong><p>Date inscribed at the Church of Saint Gregory of Tigran Honents, founded by a merchant patron.</p></article>
        <article><span>04</span><strong>2016</strong><p>Year Ani entered the UNESCO World Heritage List.</p></article>
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
        <div className="record-section-label"><p className="section-label">Chronology · 09</p></div>
        <div className="record-copy">
          <h2>The medieval capital belongs inside a longer sequence of occupation and urban change.</h2>
          <p className="section-intro">The record separates the Bagratid capital, Byzantine interlude, Seljuk-Shaddadid city, Georgian-Zakarid commercial phase and Mongol-era transformation instead of turning each conquest into a new city with no continuity.</p>
          <div className="chronology-list">{record.chronology.map((phase) => <article key={phase.label}><div><p className="chronology-date">{phase.displayDate}</p><h3>{phase.label}</h3></div><div><p>{phase.note}</p><p className="chronology-meta">{phase.certainty} dating · {phase.datingBasis} basis<CitationLinks ids={phase.sourceIds} /></p></div></article>)}</div>
        </div>
      </section>

      <section className="record-section shell" id="research">
        <div className="record-section-label"><p className="section-label">Research history · 10</p></div>
        <div className="record-copy">
          <h2>Excavation and conservation are now part of Ani's archaeological record.</h2>
          <p>{record.excavationHistory.text}<CitationLinks ids={record.excavationHistory.sourceIds} /></p>
          <div className="research-timeline">
            <article><strong>1892–93</strong><span>Nikolai Marr leads the first systematic excavation campaigns at Ani.</span></article>
            <article><strong>1904–17</strong><span>Marr's expedition resumes with excavation, architectural recording, epigraphy, photography and early site museums.</span></article>
            <article><strong>2016</strong><span>Ani is inscribed on the UNESCO World Heritage List under criteria (ii), (iii) and (iv).</span></article>
            <article><strong>2019–</strong><span>Excavation and conservation continue under Muhammet Arslan with Kafkas University and the Ministry of Culture and Tourism.</span></article>
            <article><strong>2026</strong><span>The current campaign works across multiple areas of the city; excavation in the Seljuk bazaar exposes a storage zone with five large jars.</span></article>
          </div>
          <aside className="editorial-note"><span>Interpretive caution</span><p>{record.editorialNotes}</p></aside>
        </div>
      </section>

      <section className="record-notes shell" id="sources">
        <div><p className="section-label">Record notes · 11</p><h2>A frontier city becomes clearer when succession is replaced by continuity, exchange and evidence.</h2></div>
        <div className="record-note-grid">
          <div><span>UNESCO coordinates</span><strong>{record.coordinates.latitude}° N · {record.coordinates.longitude}° E</strong></div>
          <a href="https://whc.unesco.org/en/list/1518/"><span>UNESCO property</span><strong>{record.externalIdentifiers.unesco}</strong></a>
          <a href={`https://www.wikidata.org/wiki/${record.externalIdentifiers.wikidata}`}><span>Wikidata authority</span><strong>{record.externalIdentifiers.wikidata}</strong></a>
        </div>
        <details className="source-disclosure"><summary>View {record.bibliography.length} references</summary><ol className="bibliography-list">{record.bibliography.map((source, index) => <li id={`source-${index + 1}`} key={source.id}><div><span className="source-type">{source.sourceType}</span><p>{source.citation}</p></div>{source.url ? <a href={source.url} target="_blank" rel="noreferrer">Open ↗</a> : null}</li>)}</ol></details>
      </section>

      <footer className="shell"><p>Digital Anatolian Heritage Archive</p><p>Record {record.id} · reviewed {record.lastReviewed}</p></footer>
    </main>
  );
}
