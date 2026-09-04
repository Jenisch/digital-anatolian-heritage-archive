# Registry data

The registry is the broad-coverage layer of DAHA. It is deliberately separate from the deeper records in `data/sites/`.

## Data flow

1. **Seed batch** — preserve a discoverable row from a catalogue with minimal normalisation and explicit quality notes.
2. **Reconciliation** — decide whether the row represents a unique archaeological or historical entity, a duplicate, an alias, a sub-site, or an unresolved candidate.
3. **Location verification** — verify modern administrative location and coordinates against a stronger source. Coordinates are not inferred from a district or province centroid.
4. **Authority linking** — attach stable identifiers such as Wikidata, UNESCO or Pleiades where appropriate.
5. **Sourced record** — promote the entity only after it receives the full chronology, provenance, bibliography, media-rights and interpretive treatment used by the foundation corpus.

## Batch files

`data/registry/batches/` contains discovery imports pinned to a source revision. Batch rows intentionally preserve unresolved or inconsistent source information because silently cleaning the catalogue would erase the provenance of later editorial decisions.

Batch data is not evidence for archaeological interpretation.

## Verified entities

`data/registry/verified/` contains reconciled registry entities that have passed geographic verification and/or authority linking. These files follow the registry-site data model and preserve the evidence used to promote a seed row beyond `indexed` status.

Verification is deliberately scoped. A coordinate can be accepted while chronology remains `unknown`; promoting a place to the map does not promote seed-catalogue dating into archaeological evidence.

`data/registry/map-sites.json` is the lightweight public mapping projection derived from verified registry entities. It should never contain a coordinate that exists only because a district, province, or approximate modern place was geocoded.

## Mapping rule

An `indexed` row is not automatically mapped. A registry entity receives a public map point only when its geographic identity has been checked beyond the discovery catalogue. Unknown or approximate source locations remain catalogue entries until verification.

In Archive Index mode, non-research registry points are rendered through a clustered MapLibre layer. Full sourced records remain separate accent markers and are never absorbed into registry clusters.

This rule prevents broad archive coverage from producing a visually dense but methodologically misleading map.
