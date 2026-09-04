# Digital Anatolian Heritage Archive

A digital humanities project for exploring the archaeological and cultural heritage of Anatolia through structured data, chronology, mapping, and scholarly sources.

## Research question

> How can archaeological heritage from different periods of Anatolia be represented digitally without reducing complex historical information to a simple tourist catalogue?

The archive treats cultural heritage as structured, sourced, and sometimes uncertain knowledge. It is designed to preserve chronological complexity, expose provenance, and make scholarly context legible to a public audience.

## Foundation scope

The first research dataset is intentionally small. Eight sites were selected to test the model across different periods, geographies, and types of archaeological evidence:

- Göbekli Tepe — Pre-Pottery Neolithic
- Çatalhöyük — Neolithic
- Arslantepe — Chalcolithic / Early Bronze Age
- Hattusa — Hittite
- Gordion — Phrygian
- Troy — multi-period Bronze Age to Roman occupation
- Ephesus — Greek / Roman
- Ani — Medieval

Selection does not imply a canon of the “most important” Anatolian sites. The set is a methodological test bed and will expand as the data model matures.

## Methodological principles

1. **Uncertainty is data.** Approximate, disputed, ranged, and unknown dates are represented explicitly rather than converted into false precision.
2. **Claims require provenance.** Interpretive and chronological claims should resolve to identifiable sources.
3. **Authority data is not evidence.** Identifiers such as Wikidata are useful for entity linking but do not replace archaeological or institutional sources.
4. **Public access should preserve complexity.** Interface simplification must not erase disagreement, multiple occupation phases, or changing interpretations.
5. **Media rights are part of the record.** Creator, source, and licence information are stored alongside media references.

See [Methodology](docs/METHODOLOGY.md) and [Data Model](docs/DATA_MODEL.md).

## Planned experience

The public interface will combine:

- an interactive archaeological map,
- a chronology explorer,
- filters by period, geography, culture, and site type,
- detailed site records with source-linked timelines,
- related-site discovery,
- transparent bibliography and image credits.

## Repository structure

```text
app/                  Web interface
components/           Reusable interface components
data/
  foundation-sites.json
  schema/
    site.schema.json  Canonical site-record schema
docs/
  DATA_MODEL.md
  METHODOLOGY.md
```

## Technology

The first interface is built with Next.js and TypeScript. The initial research layer is file-based and schema-driven so that the metadata model can be evaluated before introducing a database. Mapping and persistent storage will be added after the model stabilises.

## Status

Early research and prototyping. The current milestone establishes the information architecture, visual direction, research methodology, and metadata contract before full data entry begins.

## Licensing

This repository uses separate terms for software and project-authored content. See [LICENSE.md](LICENSE.md) for scope and third-party media rules.
