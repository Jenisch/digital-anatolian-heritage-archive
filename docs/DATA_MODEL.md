# Data Model

The canonical draft schema is [`data/schema/site.schema.json`](../data/schema/site.schema.json).

## Design goals

The site record is designed around five requirements:

1. a place can have several names;
2. a place can contain several chronological phases;
3. dates can be uncertain or disputed;
4. interpretive claims need identifiable sources;
5. media needs provenance and rights metadata.

## Identifiers

Every record receives an internal identifier using the form `site:<slug>` as well as a stable URL slug.

External identifiers are stored separately. They are used for reconciliation and linking rather than as primary evidence.

## Dates

Each chronology entry contains both a `displayDate` and optional numeric `startYear` / `endYear` fields.

For computation:

- BCE years are negative integers;
- CE years are positive integers;
- uncertain dates can remain null until a defensible range is available.

The `certainty` field is mandatory and currently accepts:

- `exact`
- `approximate`
- `range`
- `disputed`
- `unknown`

A separate `datingBasis` value records whether the phase depends primarily on archaeological interpretation, historical evidence, radiocarbon dating, mixed evidence, or an unknown basis.

## Sources and sourced narratives

Bibliographic entries receive local IDs. Chronology phases reference these IDs through `sourceIds`. The same mechanism is now required for the three narrative fields that carry the greatest interpretive weight:

- `historicalContext`
- `archaeologicalSignificance`
- `excavationHistory`

These fields are stored as `{ text, sourceIds }` objects rather than unreferenced prose. This change was introduced while building the first real site record: a plain string could not satisfy the archive's own principle that interpretive claims remain traceable to evidence.

This is record-level provenance, not sentence-level annotation. Finer-grained citation remains a future extension where a long narrative contains claims from substantially different sources.

## Coordinates

Coordinates require latitude and longitude plus a precision category:

- `site`
- `approximate`
- `regional`

This prevents an approximate point from being presented with the same confidence as a surveyed site location.

## Media

Media metadata is stored independently from descriptive prose. A media item records its type, source, rights status, and—where available—creator, source URL, and licence URL.

The repository must not assume that externally hosted media is reusable merely because it is publicly visible.

## Versioning

`recordVersion` is required. `lastReviewed` records editorial review rather than file modification time. Git remains the audit trail for changes during the foundation stage.

## Planned extensions

The next schema iterations will investigate:

- controlled vocabularies for chronology and site types;
- multilingual labels;
- people, objects, excavations, and institutions as linked entities;
- finer-grained citation anchors within long prose statements;
- spatial extents in addition to point coordinates;
- relationships between sites;
- compatibility with established cultural-heritage metadata standards.
