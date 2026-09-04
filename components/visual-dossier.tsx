type VisualDossierImage = {
  label: string;
  title: string;
  caption: string;
  alt: string;
  creator: string;
  sourceUrl: string;
  imageUrl: string;
  rightsStatus: string;
  licenceUrl: string;
};

type VisualDossierProps = {
  title: string;
  intro: string;
  images: VisualDossierImage[];
};

export default function VisualDossier({ title, intro, images }: VisualDossierProps) {
  return (
    <section className="visual-dossier shell" aria-labelledby="visual-dossier-heading">
      <div className="visual-dossier-heading">
        <p className="section-label">Visual dossier</p>
        <div>
          <h2 id="visual-dossier-heading">{title}</h2>
          <p>{intro}</p>
        </div>
      </div>

      <div className="visual-dossier-grid">
        {images.map((image, index) => (
          <figure className={`visual-dossier-card visual-dossier-card-${index + 1}`} key={image.sourceUrl}>
            <a
              className="visual-dossier-image"
              href={image.sourceUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open source image for ${image.title}`}
              style={{
                backgroundImage: `linear-gradient(rgba(23,23,20,.03), rgba(23,23,20,.03)), url("${image.imageUrl}")`,
              }}
            >
              <span className="visually-hidden">{image.alt}</span>
            </a>
            <figcaption>
              <p className="visual-dossier-label">{String(index + 1).padStart(2, "0")} · {image.label}</p>
              <h3>{image.title}</h3>
              <p>{image.caption}</p>
              <p className="visual-dossier-credit">
                {image.creator} · <a href={image.sourceUrl} target="_blank" rel="noreferrer">Wikimedia Commons</a> ·{" "}
                <a href={image.licenceUrl} target="_blank" rel="noreferrer">{image.rightsStatus}</a>
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
