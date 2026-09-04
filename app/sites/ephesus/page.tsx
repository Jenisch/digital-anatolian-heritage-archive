import Link from "next/link";
import type { Metadata } from "next";
import VisualDossier from "@/components/visual-dossier";
import record from "@/data/sites/ephesus.json";
import dossiers from "@/data/visual-dossiers.json";

export const metadata: Metadata = {
  title: "Ephesus | Digital Anatolian Heritage Archive",
  description:
    "Explore Ephesus through changing coastlines, Hellenistic urbanism, Roman domestic life, sacred landscapes, conservation, and excavation history.",
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

export default function EphesusPage() {
  const image = record.media[0];
  const dossier = dossiers.ephesus;

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
          <div><dt>Landscape</dt><dd>Neolithic → Byzantine</dd></div>
          <div><dt>Visible city</dt><dd>Hellenistic → Roman</dd></div>
          <div><dt>UNESCO</dt><dd>4 serial components</dd></div>
          <div><dt>Heritage</dt><dd>World Heritage · 2015</dd></div>
        </dl>
      </section>

      <figure className="record-figure shell">
        <div
          className="record-image"
          role="img"
          aria-label="Library of Celsus at Ephesus"
          style={{
            backgroundImage:
              'linear-gradient(rgba(23,23,20,.04), rgba(23,23,20,.04)), url("https://commons.wikimedia.org/wiki/Special:Redirect/file/Library%20of%20Celsus%20-%20Ephesus%2C%20Sel%C3%A7uk%2C%20%C4%B0zmir%20Province%2C%20Turkey%20-%20October%207%2C%202025.jpg")',
          }}
        />
        <figcaption>{image.title} · {image.creator}. <a href={image.sourceUrl ?? undefined}>Wikimedia Commons</a> ·{" "}<a href={image.licenceUrl ?? undefined}>{image.rightsStatus}</a></figcaption>
      </figure>

      <section className="record-introduction shell" id="story">
        <p className="section-label">The moving city · 01</p>
        <div>
          <p className="record-deck">Ephesus is not one city preserved in place. It is a settlement landscape repeatedly reorganised by shoreline, harbour, empire and pilgrimage.</p>
          <p>{record.historicalContext.text}<CitationLinks ids={record.historicalContext.sourceIds} /></p>
          <p>{record.archaeologicalSignificance.text}<CitationLinks ids={record.archaeologicalSignificance.sourceIds} /></p>
        </div>
      </section>

      <section className="record-highlights shell" aria-label="Ephesus at a glance">
        <article><span>01</span><strong>4</strong><p>Serial UNESCO components connect prehistoric, ancient, medieval and pilgrimage landscapes.</p></article>
        <article><span>02</span><strong>4,000 m²</strong><p>Approximate area of Terrace House 2, containing seven Roman elite residences.</p></article>
        <article><span>03</span><strong>1895</strong><p>Beginning of the long-running Austrian excavation programme at Ephesos.</p></article>
        <article><span>04</span><strong>2015</strong><p>Year Ephesus entered the UNESCO World Heritage List.</p></article>
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
          <h2>The monumental Roman city is only one position in a moving landscape.</h2>
          <p className="section-intro">The chronology keeps Çukuriçi Höyük, the probable Late Bronze Age regional centre, Archaic-Classical coastal quarters, the Lysimachan city and Late Antique Ephesus separate instead of treating the Library of Celsus as the beginning and end of the site.</p>
          <div className="chronology-list">{record.chronology.map((phase) => <article key={phase.label}><div><p className="chronology-date">{phase.displayDate}</p><h3>{phase.label}</h3></div><div><p>{phase.note}</p><p className="chronology-meta">{phase.certainty} dating · {phase.datingBasis} basis<CitationLinks ids={phase.sourceIds} /></p></div></article>)}</div>
        </div>
      </section>

      <section className="record-section shell" id="research">
        <div className="record-section-label"><p className="section-label">Research history · 09</p></div>
        <div className="record-copy">
          <h2>Excavation, reconstruction and conservation now belong to the same history.</h2>
          <p>{record.excavationHistory.text}<CitationLinks ids={record.excavationHistory.sourceIds} /></p>
          <div className="research-timeline">
            <article><strong>1895</strong><span>Otto Benndorf begins the Austrian excavation, first at the Artemision and then at Ayasuluk Hill.</span></article>
            <article><strong>1896</strong><span>The expedition house is built in Selçuk; it remains a base for the project.</span></article>
            <article><strong>1970–78</strong><span>The façade of the Celsus Library is reconstructed by anastylosis.</span></article>
            <article><strong>2015</strong><span>Ephesus is inscribed on the UNESCO World Heritage List under criteria (iii), (iv) and (vi).</span></article>
            <article><strong>2024</strong><span>New urban research begins at the probable Coressian Gate; conservation of the Celsus Library also enters a new multi-year phase.</span></article>
            <article><strong>2027</strong><span>Current programme target for completion of the Celsus Library conservation campaign.</span></article>
          </div>
          <aside className="editorial-note"><span>Interpretive caution</span><p>{record.editorialNotes}</p></aside>
        </div>
      </section>

      <section className="record-notes shell" id="sources">
        <div><p className="section-label">Record notes · 10</p><h2>The iconic façade is only useful when the landscape behind it remains visible.</h2></div>
        <div className="record-note-grid">
          <div><span>Ancient city coordinates</span><strong>{record.coordinates.latitude}° N · {record.coordinates.longitude}° E</strong></div>
          <a href="https://whc.unesco.org/en/list/1018/"><span>UNESCO property</span><strong>{record.externalIdentifiers.unesco}</strong></a>
          <a href={`https://www.wikidata.org/wiki/${record.externalIdentifiers.wikidata}`}><span>Wikidata authority</span><strong>{record.externalIdentifiers.wikidata}</strong></a>
        </div>
        <details className="source-disclosure"><summary>View {record.bibliography.length} references</summary><ol className="bibliography-list">{record.bibliography.map((source, index) => <li id={`source-${index + 1}`} key={source.id}><div><span className="source-type">{source.sourceType}</span><p>{source.citation}</p></div>{source.url ? <a href={source.url} target="_blank" rel="noreferrer">Open ↗</a> : null}</li>)}</ol></details>
      </section>

      <footer className="shell"><p>Digital Anatolian Heritage Archive</p><p>Record {record.id} · reviewed {record.lastReviewed}</p></footer>
    </main>
  );
}
