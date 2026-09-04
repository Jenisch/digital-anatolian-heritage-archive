# Methodology

## 1. Purpose

The Digital Anatolian Heritage Archive is a public-facing digital humanities project. Its purpose is not to rank archaeological sites or reproduce a tourism catalogue. It aims to model historical places as layered records whose dates, interpretations, sources, names, and rights information can be inspected rather than hidden behind a single narrative.

The project therefore treats interface design and data modelling as interpretive decisions.

## 2. Scope and selection

The foundation corpus contains eight sites spanning different regions and historical periods. The corpus is intentionally small so that the metadata model can be challenged before large-scale data entry begins.

A site may be included when it can support meaningful testing of one or more of the following:

- multiple occupation phases,
- chronological uncertainty,
- changing names or political contexts,
- substantial archaeological research,
- heritage designation or institutional documentation,
- relationships to other sites, cultures, or periods.

Inclusion is not a statement of relative historical importance.

## 3. Source hierarchy

Research should prefer sources in roughly the following order, depending on the claim being made:

1. peer-reviewed scholarship, excavation publications, catalogues, and specialist monographs;
2. excavation projects, museums, universities, archaeological institutes, and heritage authorities;
3. official heritage registers and intergovernmental cultural-heritage records;
4. authority data and stable identifiers for entity linking;
5. secondary public references used only when stronger sources are unavailable and the limitation is recorded.

No source category is automatically authoritative for every field. A heritage register may be appropriate for designation status while an excavation publication may be more appropriate for chronology.

## 4. Chronology and uncertainty

The project must not invent precision for interface convenience.

Chronological entries distinguish between exact, approximate, ranged, disputed, and unknown dating. Human-readable date strings are stored alongside sortable numeric values. Numeric years use negative integers for BCE and positive integers for CE; this representation exists for computation and does not replace the display form.

Where sources disagree materially, the record should preserve the disagreement or competing ranges rather than silently selecting one date.

## 5. Provenance

Interpretive fields and chronological phases should be traceable to source identifiers stored in the same record. Authority identifiers such as Wikidata may connect entities across systems, but they are not treated as substitutes for archaeological evidence.

Bibliographic records should preserve stable identifiers such as DOI values where available.

## 6. Geographic representation

Coordinates describe archaeological places, not modern administrative centres. Coordinate precision is recorded because some records may identify a site precisely while others can only be represented approximately or regionally.

Future mapping interfaces should communicate uncertainty where location precision is limited.

## 7. Images, plans, and rights

Media is evidence and documentation as well as presentation. Media records should preserve creator, source, rights status, and licence information whenever these are available.

The project should prefer material that can be legally displayed in a public interface. A link to an image does not imply permission to reproduce it.

## 8. Public interpretation

Public-facing writing should be readable without stripping away scholarly complexity. Interface summaries may shorten specialist material, but they should not:

- convert disputed interpretations into facts,
- flatten a multi-period site into one civilisation,
- detach claims from their historical context,
- hide uncertainty solely to simplify a timeline.

## 9. Corrections and versioning

Records carry a version number and review date. Material corrections should be visible in repository history. The project will later define a formal correction workflow once external contributions are accepted.

## 10. Current limitations

The foundation stage has several deliberate limitations:

- the initial corpus is geographically and chronologically selective;
- the metadata schema has not yet been validated against a large dataset;
- no controlled vocabulary has yet been adopted for periods, site types, or cultures;
- entity reconciliation and multilingual naming remain incomplete;
- database-backed versioning and citation-level provenance are planned rather than implemented.

These limitations are part of the research process and will be revisited as the corpus grows.
