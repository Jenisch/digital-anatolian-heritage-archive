import Link from "next/link";
import type { Metadata } from "next";
import VisualDossier from "@/components/visual-dossier";
import record from "@/data/sites/hattusa.json";
import dossiers from "@/data/visual-dossiers.json";

export const metadata: Metadata = {
  title: "Hattusa | Digital Anatolian Heritage Archive",
  description:
    "Explore Hattusa through its urban form, fortifications, royal citadel, ritual landscape, chronology, and excavation history.",
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

export default function HattusaPage() {
  const image = record.media[0];
  const dossier = dossiers.hattusa;

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
          <div><dt>Period</dt><dd>Late Bronze Age · Iron Age sequence</dd></div>
          <div><dt>Imperial phase</dt><dd>c. 1650–1180 BCE</dd></div>
          <div><dt>Urban scale</dt><dd>8+ km monumental enclosure wall</dd></div>
          <div><dt>Heritage</dt><dd>UNESCO World Heritage · 1986</dd></div>
        </dl>
      </section>

      <figure className="record-figure shell">
        <div className="record-image" role="img" aria-label="Lion Gate at Hattusa" style={{backgroundImage:'linear-gradient(rgba(23,23,20,.05), rgba(23,23,20,.05)), url("https://commons.wikimedia.org/wiki/Special:Redirect/file/Hattusa%20Lion%20Gate.JPG")'}} />
        <figcaption>{image.title} · {image.creator}. <a href={image.sourceUrl ?? undefined}>Wikimedia Commons</a> ·{" "}<a href={image.licenceUrl ?? undefined}>{image.rightsStatus}</a></figcaption>
      </figure>

      <section className="record-introduction shell" id="story">
        <p className="section-label">The capital · 01</p>
        <div>
          <p className="record-deck">Hattusa was not only a royal seat. It was a fortified political, administrative and ritual landscape built across a difficult Central Anatolian terrain.</p>
          <p>{record.historicalContext.text}<CitationLinks ids={record.historicalContext.sourceIds} /></p>
          <p>{record.archaeologicalSignificance.text}<CitationLinks ids={record.archaeologicalSignificance.sourceIds} /></p>
        </div>
      </section>

      <section className="record-highlights shell" aria-label="Hattusa at a glance">
        <article><span>01</span><strong>8+ km</strong><p>Monumental enclosure wall around the UNESCO property.</p></article>
        <article><span>02</span><strong>100+</strong><p>Towers identified along sections of the Upper City fortification system.</p></article>
        <article><span>03</span><strong>1906</strong><p>Beginning of large-scale excavation at Boğazköy.</p></article>
        <article><span>04</span><strong>1986</strong><p>Year Hattusa entered the UNESCO World Heritage List.</p></article>
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
        <div className="record-section-label"><p className="section-label">Chronology · 06</p></div>
        <div className="record-copy">
          <h2>The imperial capital is only one layer of the site.</h2>
          <p className="section-intro">Hattusa's chronology distinguishes long-term occupation from the narrower phase in which it functioned as the Hittite imperial capital.</p>
          <div className="chronology-list">
            {record.chronology.map((phase) => <article key={phase.label}><div><p className="chronology-date">{phase.displayDate}</p><h3>{phase.label}</h3></div><div><p>{phase.note}</p><p className="chronology-meta">{phase.certainty} dating · {phase.datingBasis} basis<CitationLinks ids={phase.sourceIds} /></p></div></article>)}
          </div>
        </div>
      </section>

      <section className="record-section shell" id="research">
        <div className="record-section-label"><p className="section-label">Research history · 07</p></div>
        <div className="record-copy">
          <h2>A century of excavation keeps changing the map of the capital.</h2>
          <p>{record.excavationHistory.text}<CitationLinks ids={record.excavationHistory.sourceIds} /></p>
          <div className="research-timeline">
            <article><strong>1906</strong><span>Large-scale excavation begins with the Deutsche Orient-Gesellschaft and Ottoman Museum.</span></article>
            <article><strong>1907</strong><span>DAI fieldwork under Otto Puchstein continues investigation of the ruins.</span></article>
            <article><strong>1931</strong><span>Long-term DAI research programme begins.</span></article>
            <article><strong>1986</strong><span>Hattusa is inscribed on the UNESCO World Heritage List.</span></article>
            <article><strong>2021–24</strong><span>New Büyükkale excavations refine the chronology and density of the royal citadel.</span></article>
          </div>
          <aside className="editorial-note"><span>Interpretive caution</span><p>{record.editorialNotes}</p></aside>
        </div>
      </section>

      <section className="record-notes shell" id="sources">
        <div><p className="section-label">Record notes · 08</p><h2>Evidence remains inspectable without overwhelming the narrative.</h2></div>
        <div className="record-note-grid">
          <div><span>Coordinates</span><strong>{record.coordinates.latitude}° N · {record.coordinates.longitude}° E</strong></div>
          <a href="https://whc.unesco.org/en/list/377/"><span>UNESCO property</span><strong>{record.externalIdentifiers.unesco}</strong></a>
          <a href={`https://www.wikidata.org/wiki/${record.externalIdentifiers.wikidata}`}><span>Wikidata authority</span><strong>{record.externalIdentifiers.wikidata}</strong></a>
        </div>
        <details className="source-disclosure"><summary>View {record.bibliography.length} references</summary><ol className="bibliography-list">{record.bibliography.map((source, index) => <li id={`source-${index + 1}`} key={source.id}><div><span className="source-type">{source.sourceType}</span><p>{source.citation}</p></div>{source.url ? <a href={source.url} target="_blank" rel="noreferrer">Open ↗</a> : null}</li>)}</ol></details>
      </section>

      <footer className="shell"><p>Digital Anatolian Heritage Archive</p><p>Record {record.id} · reviewed {record.lastReviewed}</p></footer>
    </main>
  );
}
