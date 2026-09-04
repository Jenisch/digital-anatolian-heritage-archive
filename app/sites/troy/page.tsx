import Link from "next/link";
import type { Metadata } from "next";
import VisualDossier from "@/components/visual-dossier";
import record from "@/data/sites/troy.json";
import dossiers from "@/data/visual-dossiers.json";

export const metadata: Metadata = {
  title: "Troy | Digital Anatolian Heritage Archive",
  description:
    "Explore Troy through stratigraphy, Bronze Age urbanism, Homeric reception, Greek and Roman Ilion, excavation history, and current research.",
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

export default function TroyPage() {
  const image = record.media[0];
  const dossier = dossiers.troy;

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
          <div><dt>Sequence</dt><dd>Bronze Age → Roman</dd></div>
          <div><dt>Major framework</dt><dd>Troy I–IX</dd></div>
          <div><dt>Late Bronze Age</dt><dd>Troy VI–VIIa · c. 1750–1180 BCE</dd></div>
          <div><dt>Heritage</dt><dd>UNESCO World Heritage · 1998</dd></div>
        </dl>
      </section>

      <figure className="record-figure shell">
        <div className="record-image" role="img" aria-label="Stone fortification at the east gate of Troy VI" style={{backgroundImage:'linear-gradient(rgba(23,23,20,.04), rgba(23,23,20,.04)), url("https://commons.wikimedia.org/wiki/Special:Redirect/file/Troy%20%28Ilion%29%2C%20Turkey%20%287446473680%29.jpg")'}} />
        <figcaption>{image.title} · {image.creator}. <a href={image.sourceUrl ?? undefined}>Wikimedia Commons</a> ·{" "}<a href={image.licenceUrl ?? undefined}>{image.rightsStatus}</a></figcaption>
      </figure>

      <section className="record-introduction shell" id="story">
        <p className="section-label">The tell · 01</p>
        <div>
          <p className="record-deck">Troy is most useful when the legend is treated as one layer among many—not as the explanation for the site.</p>
          <p>{record.historicalContext.text}<CitationLinks ids={record.historicalContext.sourceIds} /></p>
          <p>{record.archaeologicalSignificance.text}<CitationLinks ids={record.archaeologicalSignificance.sourceIds} /></p>
        </div>
      </section>

      <section className="record-highlights shell" aria-label="Troy at a glance">
        <article><span>01</span><strong>46</strong><p>Distinct strata differentiated by the Cincinnati excavations within nine major horizons.</p></article>
        <article><span>02</span><strong>30 ha</strong><p>Approximate Late Bronze Age lower-city extent described by UNESCO.</p></article>
        <article><span>03</span><strong>1870</strong><p>Beginning of Schliemann's major excavation campaigns at Hisarlık.</p></article>
        <article><span>04</span><strong>1998</strong><p>Year Troy entered the UNESCO World Heritage List.</p></article>
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
          <h2>One mound, several archaeological systems of time.</h2>
          <p className="section-intro">The familiar Troy I–IX labels make a difficult sequence navigable, but the archive preserves overlap, continuity and uncertainty instead of presenting each numbered horizon as a completely new city.</p>
          <div className="chronology-list">{record.chronology.map((phase) => <article key={phase.label}><div><p className="chronology-date">{phase.displayDate}</p><h3>{phase.label}</h3></div><div><p>{phase.note}</p><p className="chronology-meta">{phase.certainty} dating · {phase.datingBasis} basis<CitationLinks ids={phase.sourceIds} /></p></div></article>)}</div>
        </div>
      </section>

      <section className="record-section shell" id="research">
        <div className="record-section-label"><p className="section-label">Research history · 09</p></div>
        <div className="record-copy">
          <h2>The history of Troy is also the history of archaeology correcting itself.</h2>
          <p>{record.excavationHistory.text}<CitationLinks ids={record.excavationHistory.sourceIds} /></p>
          <div className="research-timeline">
            <article><strong>1863</strong><span>Frank Calvert begins excavation at Hisarlık.</span></article>
            <article><strong>1870–90</strong><span>Heinrich Schliemann's campaigns make Troy a global archaeological story while removing major portions of later strata.</span></article>
            <article><strong>1893–94</strong><span>Wilhelm Dörpfeld demonstrates the importance of Troy VI and revises Schliemann's Homeric identification.</span></article>
            <article><strong>1932–38</strong><span>Carl Blegen's Cincinnati team establishes the detailed stratigraphic framework of the mound.</span></article>
            <article><strong>1988–2012</strong><span>The Tübingen–Cincinnati project combines Bronze Age, lower-city and post-Bronze Age research.</span></article>
            <article><strong>2015–</strong><span>Rüstem Aslan directs the current Turkish excavation programme through Çanakkale Onsekiz Mart University.</span></article>
            <article><strong>2025</strong><span>A gold ring-brooch and rare jade object from an Early Bronze Age context return attention to Troy's third-millennium exchange networks.</span></article>
          </div>
          <aside className="editorial-note"><span>Interpretive caution</span><p>{record.editorialNotes}</p></aside>
        </div>
      </section>

      <section className="record-notes shell" id="sources">
        <div><p className="section-label">Record notes · 10</p><h2>Legend remains visible, but evidence controls the chronology.</h2></div>
        <div className="record-note-grid">
          <div><span>Coordinates</span><strong>{record.coordinates.latitude}° N · {record.coordinates.longitude}° E</strong></div>
          <a href="https://whc.unesco.org/en/list/849/"><span>UNESCO property</span><strong>{record.externalIdentifiers.unesco}</strong></a>
          <a href={`https://www.wikidata.org/wiki/${record.externalIdentifiers.wikidata}`}><span>Wikidata authority</span><strong>{record.externalIdentifiers.wikidata}</strong></a>
        </div>
        <details className="source-disclosure"><summary>View {record.bibliography.length} references</summary><ol className="bibliography-list">{record.bibliography.map((source, index) => <li id={`source-${index + 1}`} key={source.id}><div><span className="source-type">{source.sourceType}</span><p>{source.citation}</p></div>{source.url ? <a href={source.url} target="_blank" rel="noreferrer">Open ↗</a> : null}</li>)}</ol></details>
      </section>

      <footer className="shell"><p>Digital Anatolian Heritage Archive</p><p>Record {record.id} · reviewed {record.lastReviewed}</p></footer>
    </main>
  );
}
