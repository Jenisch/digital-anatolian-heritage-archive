"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import sites from "@/data/explorer-sites.json";
import seedBatchA from "@/data/registry/batches/trwiki-a-01.json";
import registryMapSitesData from "@/data/registry/map-sites.json";

const MIN_YEAR = -10000;
const MAX_YEAR = 1500;
const RESULT_LIMIT = 24;
const PERIODS = ["All", "Neolithic", "Chalcolithic", "Bronze Age", "Iron Age", "Classical", "Roman", "Medieval"] as const;
const REGISTRY_SOURCE_ID = "registry-sites";
const REGISTRY_CLUSTER_LAYER = "registry-clusters";
const REGISTRY_CLUSTER_COUNT_LAYER = "registry-cluster-count";
const REGISTRY_POINT_LAYER = "registry-unclustered";

type Period = (typeof PERIODS)[number];
type Site = (typeof sites)[number];
type ExplorerMode = "research" | "archive";
type ResearchStatus = "indexed" | "location-verified" | "authority-linked" | "sourced-record";

type RegistryMapSite = {
  id: string;
  slug: string;
  name: string;
  region: string;
  latitude: number;
  longitude: number;
  dateLabel: string | null;
  startYear: number | null;
  endYear: number | null;
  periods: string[];
  context: string | null;
  researchStatus: "location-verified" | "authority-linked";
};

type ArchiveEntry = {
  key: string;
  name: string;
  slug: string | null;
  region: string;
  historicalRegions: string[];
  dateLabel: string;
  startYear: number | null;
  endYear: number | null;
  periods: string[];
  context: string;
  researchStatus: ResearchStatus;
  recordReady: boolean;
  latitude: number | null;
  longitude: number | null;
};

const registryMapSites = registryMapSitesData as RegistryMapSite[];

function formatYear(year: number) {
  if (year < 0) return `${Math.abs(year).toLocaleString("en-US")} BCE`;
  if (year > 0) return `${year.toLocaleString("en-US")} CE`;
  return "turn of the era";
}

function formatStatus(status: ResearchStatus) {
  switch (status) {
    case "sourced-record":
      return "Sourced record";
    case "authority-linked":
      return "Authority linked";
    case "location-verified":
      return "Location verified";
    default:
      return "Indexed · location unverified";
  }
}

function createPopupContent(site: Site) {
  const wrapper = document.createElement("div");
  wrapper.className = "heritage-popup";

  const region = document.createElement("span");
  region.textContent = site.region;

  const title = document.createElement("strong");
  title.textContent = site.name;

  const date = document.createElement("p");
  date.textContent = site.dateLabel;

  const context = document.createElement("p");
  context.textContent = site.context;

  wrapper.append(region, title, date, context);

  if (site.recordReady) {
    const link = document.createElement("a");
    link.href = `/sites/${site.slug}`;
    link.textContent = "Open research record →";
    wrapper.append(link);
  }

  return wrapper;
}

function createRegistryPopup(properties: Record<string, unknown>) {
  const wrapper = document.createElement("div");
  wrapper.className = "heritage-popup";

  const region = document.createElement("span");
  region.textContent = String(properties.region ?? "Verified registry location");

  const title = document.createElement("strong");
  title.textContent = String(properties.name ?? "Registry site");

  const date = document.createElement("p");
  date.textContent = String(properties.dateLabel ?? "Chronology not yet structured");

  const status = document.createElement("small");
  status.textContent = formatStatus(String(properties.researchStatus ?? "location-verified") as ResearchStatus);

  wrapper.append(region, title, date, status);
  return wrapper;
}

function matchesSearch(entry: ArchiveEntry, query: string) {
  if (!query.trim()) return true;
  const haystack = [entry.name, entry.region, entry.context, ...entry.historicalRegions].join(" ").toLocaleLowerCase("tr-TR");
  return haystack.includes(query.trim().toLocaleLowerCase("tr-TR"));
}

export default function HeritageExplorer() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const [mapReady, setMapReady] = useState(false);
  const [mode, setMode] = useState<ExplorerMode>("research");
  const [period, setPeriod] = useState<Period>("All");
  const [fromYear, setFromYear] = useState(MIN_YEAR);
  const [toYear, setToYear] = useState(MAX_YEAR);
  const [archiveSearch, setArchiveSearch] = useState("");

  const filteredSites = useMemo(
    () =>
      sites.filter((site) => {
        const matchesPeriod = period === "All" || site.periods.includes(period);
        const overlapsWindow = site.startYear <= toYear && site.endYear >= fromYear;
        const matchesArchiveQuery = mode === "research" || !archiveSearch.trim() || [site.name, site.region, site.context].join(" ").toLocaleLowerCase("tr-TR").includes(archiveSearch.trim().toLocaleLowerCase("tr-TR"));
        return matchesPeriod && overlapsWindow && matchesArchiveQuery;
      }),
    [period, fromYear, toYear, mode, archiveSearch],
  );

  const archiveCatalogue = useMemo<ArchiveEntry[]>(() => {
    const entries = new Map<string, ArchiveEntry>();

    sites.forEach((site) => {
      entries.set(site.name.toLocaleLowerCase("tr-TR"), {
        key: `record:${site.slug}`,
        name: site.name,
        slug: site.slug,
        region: site.region,
        historicalRegions: [],
        dateLabel: site.dateLabel,
        startYear: site.startYear,
        endYear: site.endYear,
        periods: [...site.periods],
        context: site.context,
        researchStatus: "sourced-record",
        recordReady: site.recordReady,
        latitude: site.latitude,
        longitude: site.longitude,
      });
    });

    registryMapSites.forEach((site) => {
      const key = site.name.toLocaleLowerCase("tr-TR");
      if (entries.has(key)) return;
      entries.set(key, {
        key: site.id,
        name: site.name,
        slug: site.slug || null,
        region: site.region,
        historicalRegions: [],
        dateLabel: site.dateLabel ?? "Chronology not yet structured",
        startYear: site.startYear,
        endYear: site.endYear,
        periods: site.periods,
        context: site.context ?? "Verified registry entity; full research record pending.",
        researchStatus: site.researchStatus,
        recordReady: false,
        latitude: site.latitude,
        longitude: site.longitude,
      });
    });

    seedBatchA.rows.forEach((row) => {
      const key = row.canonicalName.toLocaleLowerCase("tr-TR");
      if (entries.has(key)) return;
      entries.set(key, {
        key: `seed:${seedBatchA.batchId}:${row.sourceSequence}`,
        name: row.canonicalName,
        slug: null,
        region: row.modernLocationLabel ?? (row.historicalRegions.join(" · ") || "Location unresolved"),
        historicalRegions: [...row.historicalRegions],
        dateLabel: row.firstSettlementLabel ?? "Chronology unverified",
        startYear: null,
        endYear: null,
        periods: [],
        context: "Indexed from a discovery catalogue; identity, chronology and location remain subject to DAHA verification.",
        researchStatus: "indexed",
        recordReady: false,
        latitude: null,
        longitude: null,
      });
    });

    return Array.from(entries.values()).sort((a, b) => a.name.localeCompare(b.name, "tr"));
  }, []);

  const filteredArchiveEntries = useMemo(() => {
    const fullWindow = fromYear === MIN_YEAR && toYear === MAX_YEAR;

    return archiveCatalogue.filter((entry) => {
      const matchesPeriod = period === "All" || entry.periods.includes(period);
      const hasStructuredChronology = entry.startYear !== null && entry.endYear !== null;
      const overlapsWindow = fullWindow || (hasStructuredChronology && entry.startYear! <= toYear && entry.endYear! >= fromYear);
      return matchesPeriod && overlapsWindow && matchesSearch(entry, archiveSearch);
    });
  }, [archiveCatalogue, period, fromYear, toYear, archiveSearch]);

  const visibleArchiveEntries = filteredArchiveEntries.slice(0, RESULT_LIMIT);

  const visibleRegistryMapEntries = useMemo(
    () => filteredArchiveEntries.filter((entry) => entry.researchStatus !== "sourced-record" && entry.latitude !== null && entry.longitude !== null),
    [filteredArchiveEntries],
  );

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    maplibregl.setWorkerUrl("/maplibre/maplibre-gl-worker.mjs");

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: "https://tiles.openfreemap.org/styles/liberty",
      center: [35.2, 39.1],
      zoom: 4.25,
      minZoom: 3.3,
      maxZoom: 10,
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");

    map.on("load", () => {
      map.addSource(REGISTRY_SOURCE_ID, {
        type: "geojson",
        data: { type: "FeatureCollection", features: [] },
        cluster: true,
        clusterRadius: 46,
        clusterMaxZoom: 8,
      });

      map.addLayer({
        id: REGISTRY_CLUSTER_LAYER,
        type: "circle",
        source: REGISTRY_SOURCE_ID,
        filter: ["has", "point_count"],
        layout: { visibility: "none" },
        paint: {
          "circle-color": "#6f6b61",
          "circle-opacity": 0.9,
          "circle-radius": ["step", ["get", "point_count"], 15, 25, 19, 75, 23],
          "circle-stroke-color": "#f1eee6",
          "circle-stroke-width": 2,
        },
      });

      map.addLayer({
        id: REGISTRY_CLUSTER_COUNT_LAYER,
        type: "symbol",
        source: REGISTRY_SOURCE_ID,
        filter: ["has", "point_count"],
        layout: {
          visibility: "none",
          "text-field": ["get", "point_count_abbreviated"],
          "text-size": 11,
        },
        paint: { "text-color": "#f1eee6" },
      });

      map.addLayer({
        id: REGISTRY_POINT_LAYER,
        type: "circle",
        source: REGISTRY_SOURCE_ID,
        filter: ["!", ["has", "point_count"]],
        layout: { visibility: "none" },
        paint: {
          "circle-color": "#6f6b61",
          "circle-radius": 6,
          "circle-stroke-color": "#f1eee6",
          "circle-stroke-width": 2,
        },
      });

      map.on("click", REGISTRY_CLUSTER_LAYER, (event) => {
        const feature = map.queryRenderedFeatures(event.point, { layers: [REGISTRY_CLUSTER_LAYER] })[0];
        if (!feature || feature.geometry.type !== "Point") return;
        const coordinates = feature.geometry.coordinates as [number, number];
        map.easeTo({ center: coordinates, zoom: Math.min(map.getZoom() + 2, 9), duration: 500 });
      });

      map.on("click", REGISTRY_POINT_LAYER, (event) => {
        const feature = map.queryRenderedFeatures(event.point, { layers: [REGISTRY_POINT_LAYER] })[0];
        if (!feature || feature.geometry.type !== "Point") return;
        const coordinates = feature.geometry.coordinates as [number, number];
        new maplibregl.Popup({ offset: 12 })
          .setLngLat(coordinates)
          .setDOMContent(createRegistryPopup(feature.properties ?? {}))
          .addTo(map);
      });

      [REGISTRY_CLUSTER_LAYER, REGISTRY_POINT_LAYER].forEach((layer) => {
        map.on("mouseenter", layer, () => { map.getCanvas().style.cursor = "pointer"; });
        map.on("mouseleave", layer, () => { map.getCanvas().style.cursor = ""; });
      });

      setMapReady(true);
    });

    mapRef.current = map;

    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
      setMapReady(false);
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return;

    const source = map.getSource(REGISTRY_SOURCE_ID) as maplibregl.GeoJSONSource | undefined;
    source?.setData({
      type: "FeatureCollection",
      features: visibleRegistryMapEntries.map((entry) => ({
        type: "Feature" as const,
        geometry: { type: "Point" as const, coordinates: [entry.longitude!, entry.latitude!] },
        properties: {
          key: entry.key,
          name: entry.name,
          region: entry.region,
          dateLabel: entry.dateLabel,
          researchStatus: entry.researchStatus,
        },
      })),
    });

    const visibility = mode === "archive" && visibleRegistryMapEntries.length ? "visible" : "none";
    [REGISTRY_CLUSTER_LAYER, REGISTRY_CLUSTER_COUNT_LAYER, REGISTRY_POINT_LAYER].forEach((layer) => {
      if (map.getLayer(layer)) map.setLayoutProperty(layer, "visibility", visibility);
    });
  }, [mapReady, mode, visibleRegistryMapEntries]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    const bounds = new maplibregl.LngLatBounds();

    filteredSites.forEach((site) => {
      const element = document.createElement("button");
      element.type = "button";
      element.className = "heritage-marker heritage-marker-ready";
      element.setAttribute("aria-label", `${site.name}, ${site.region}`);
      element.title = site.name;

      const popup = new maplibregl.Popup({ offset: 18, closeButton: true }).setDOMContent(createPopupContent(site));
      const marker = new maplibregl.Marker({ element, anchor: "center" })
        .setLngLat([site.longitude, site.latitude])
        .setPopup(popup)
        .addTo(map);

      markersRef.current.push(marker);
      bounds.extend([site.longitude, site.latitude]);
    });

    if (mode === "archive") {
      visibleRegistryMapEntries.forEach((entry) => bounds.extend([entry.longitude!, entry.latitude!]));
    }

    const mappedCount = filteredSites.length + (mode === "archive" ? visibleRegistryMapEntries.length : 0);

    if (mappedCount === 1) {
      const onlyResearchSite = filteredSites[0];
      if (onlyResearchSite) {
        map.easeTo({ center: [onlyResearchSite.longitude, onlyResearchSite.latitude], zoom: 6.4, duration: 650 });
      } else {
        const onlyRegistrySite = visibleRegistryMapEntries[0];
        map.easeTo({ center: [onlyRegistrySite.longitude!, onlyRegistrySite.latitude!], zoom: 6.4, duration: 650 });
      }
    } else if (mappedCount > 1) {
      map.fitBounds(bounds, { padding: 70, maxZoom: 6.2, duration: 650 });
    }
  }, [mapReady, mode, filteredSites, visibleRegistryMapEntries]);

  function focusCoordinates(longitude: number | null, latitude: number | null) {
    const map = mapRef.current;
    if (!map || longitude === null || latitude === null) return;
    map.easeTo({ center: [longitude, latitude], zoom: 6.7, duration: 650 });
  }

  function focusSite(site: Site) {
    focusCoordinates(site.longitude, site.latitude);
  }

  function resetFilters() {
    setPeriod("All");
    setFromYear(MIN_YEAR);
    setToYear(MAX_YEAR);
    setArchiveSearch("");
  }

  const currentCount = mode === "research" ? filteredSites.length : filteredArchiveEntries.length;
  const totalCount = mode === "research" ? sites.length : archiveCatalogue.length;

  return (
    <div className="heritage-explorer">
      <aside className="explorer-controls" aria-label="Explorer filters">
        <div className="explorer-mode-switch" role="group" aria-label="Explorer coverage mode">
          <button type="button" className={mode === "research" ? "is-active" : ""} onClick={() => setMode("research")}>Research records <span>{sites.length}</span></button>
          <button type="button" className={mode === "archive" ? "is-active" : ""} onClick={() => setMode("archive")}>Archive index <span>{archiveCatalogue.length}</span></button>
        </div>

        <div className="explorer-control-heading">
          <div>
            <p className="section-label">{mode === "research" ? "Filter the research corpus" : "Search the archive index"}</p>
            <strong>{currentCount} of {totalCount} {mode === "research" ? "records" : "places"}</strong>
          </div>
          <button type="button" onClick={resetFilters}>Reset</button>
        </div>

        {mode === "archive" ? (
          <label className="archive-search">
            <span>Place, region or location</span>
            <input type="search" value={archiveSearch} onChange={(event) => setArchiveSearch(event.target.value)} placeholder="Search the registry" />
          </label>
        ) : null}

        <fieldset className="period-filter">
          <legend>Historical period</legend>
          <div>
            {PERIODS.map((item) => (
              <button
                type="button"
                key={item}
                className={period === item ? "is-active" : ""}
                onClick={() => setPeriod(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="timeline-filter">
          <div className="timeline-heading">
            <span>Discovery window</span>
            <strong>{formatYear(fromYear)} — {formatYear(toYear)}</strong>
          </div>

          <label>
            <span>From</span>
            <input
              type="range"
              min={MIN_YEAR}
              max={MAX_YEAR}
              step="100"
              value={fromYear}
              onChange={(event) => setFromYear(Math.min(Number(event.target.value), toYear))}
            />
          </label>
          <label>
            <span>To</span>
            <input
              type="range"
              min={MIN_YEAR}
              max={MAX_YEAR}
              step="100"
              value={toYear}
              onChange={(event) => setToYear(Math.max(Number(event.target.value), fromYear))}
            />
          </label>

          <div className="timeline-axis" aria-hidden="true">
            <span>10,000 BCE</span>
            <span>5,000 BCE</span>
            <span>1 CE</span>
            <span>1,500 CE</span>
          </div>
        </div>

        <p className="explorer-method-note">
          {mode === "research"
            ? "The default map remains a curated view of fully sourced records. These dates support cross-site discovery while each record preserves its own chronology and evidence."
            : "Indexed places can appear in the catalogue before they appear on the map. A map point requires geographic verification beyond the discovery catalogue; dense verified points are clustered while sourced records remain individually visible."}
        </p>
      </aside>

      <div className="explorer-stage">
        <div className="explorer-map" ref={mapContainerRef} aria-label="Interactive map of archaeological and historical sites in Türkiye" />
        <div className="explorer-legend" aria-label="Map legend">
          <span><i className="legend-dot legend-dot-ready" /> Sourced record</span>
          {mode === "archive" ? <span><i className="legend-dot legend-dot-registry" /> Verified registry / cluster</span> : null}
        </div>
      </div>

      <div className={`explorer-results${mode === "archive" ? " explorer-results-archive" : ""}`} aria-live="polite">
        {mode === "research" ? (
          filteredSites.length ? (
            filteredSites.map((site) => (
              <article key={site.slug}>
                <button type="button" className="result-focus" onClick={() => focusSite(site)}>
                  <span>{site.region}</span>
                  <strong>{site.name}</strong>
                  <small>{site.dateLabel}</small>
                </button>
                <a href={`/sites/${site.slug}`}>Research record →</a>
              </article>
            ))
          ) : (
            <div className="empty-results"><strong>No records overlap this filter.</strong><button type="button" onClick={resetFilters}>Reset explorer</button></div>
          )
        ) : filteredArchiveEntries.length ? (
          <>
            {visibleArchiveEntries.map((entry) => (
              <article key={entry.key}>
                <button
                  type="button"
                  className={`result-focus${entry.latitude === null || entry.longitude === null ? " is-unmapped" : ""}`}
                  onClick={() => focusCoordinates(entry.longitude, entry.latitude)}
                  disabled={entry.latitude === null || entry.longitude === null}
                >
                  <span>{entry.region}</span>
                  <strong>{entry.name}</strong>
                  <small>{entry.dateLabel}</small>
                </button>
                {entry.recordReady && entry.slug ? (
                  <a href={`/sites/${entry.slug}`}>Research record →</a>
                ) : (
                  <span className="result-status">{formatStatus(entry.researchStatus)}</span>
                )}
              </article>
            ))}
            {filteredArchiveEntries.length > RESULT_LIMIT ? (
              <div className="archive-results-note">Showing the first {RESULT_LIMIT} matches. Refine the archive search to narrow {filteredArchiveEntries.length.toLocaleString("en-US")} indexed places.</div>
            ) : null}
          </>
        ) : (
          <div className="empty-results"><strong>No indexed places match this search.</strong><button type="button" onClick={resetFilters}>Reset explorer</button></div>
        )}
      </div>
    </div>
  );
}
