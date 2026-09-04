# Interactive Explorer

The interactive explorer is a discovery layer for the Digital Anatolian Heritage Archive. It is intentionally separate from the evidentiary layer represented by sourced site records.

## Purpose

The explorer supports three questions:

1. where are the foundation sites located relative to one another;
2. which broad historical periods connect them;
3. which sites overlap a user-selected chronological window.

It is not intended to replace site-specific archaeological chronology.

## Map implementation

The interface uses MapLibre GL JS with an OpenFreeMap basemap. Archaeological sites are rendered as a small local point dataset so the project retains control over the heritage metadata rather than treating map-provider data as the archive itself.

## Chronological filtering

Each explorer entry has a `startYear` and `endYear`. A site is returned when its broad discovery range overlaps the selected window.

These ranges intentionally operate at a lower evidentiary resolution than a sourced research record. For sites whose full record has not yet been prepared, the explorer uses broad chronological envelopes suitable for discovery and labels them accordingly.

Once a full site record exists, the explorer should derive its chronology from the canonical record rather than maintaining duplicate dating claims.

## Period filtering

Period labels are currently a project-level discovery vocabulary:

- Neolithic
- Chalcolithic
- Bronze Age
- Iron Age
- Classical
- Roman
- Medieval

They are navigation aids, not claims that these categories are universally applicable or internally uniform across Anatolia.

## Spatial precision

The dataset distinguishes between `site` and `approximate` coordinates. Approximate points are sufficient for regional exploration but must not be presented as surveyed archaeological coordinates.

A later iteration should derive coordinates from the canonical site record and expose spatial precision directly in the interface.

## Limitations and next steps

- the foundation corpus contains only eight deliberately selected sites;
- several points and date windows remain provisional until their full research records are prepared;
- the timeline currently uses broad overlap rather than phase-level chronology;
- period labels will eventually require a controlled vocabulary and explicit mapping rules;
- future versions should support linked entities, regional comparison, spatial extents, and uncertainty-aware visualisation.
