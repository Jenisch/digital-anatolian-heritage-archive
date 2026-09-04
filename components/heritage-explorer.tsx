"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import sites from "@/data/explorer-sites.json";

const MIN_YEAR = -10000;
const MAX_YEAR = 1500;
const PERIODS = ["All", "Neolithic", "Chalcolithic", "Bronze Age", "Iron Age", "Classical", "Roman", "Medieval"] as const;

type Period = (typeof PERIODS)[number];
type Site = (typeof sites)[number];

function formatYear(year: number) {
  if (year < 0) return `${Math.abs(year).toLocaleString("en-US")} BCE`;
  if (year > 0) return `${year.toLocaleString("en-US")} CE`;
  return "turn of the era";
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
  } else {
    const pending = document.createElement("small");
    pending.textContent = "Research record in preparation";
    wrapper.append(pending);
  }

  return wrapper;
}

export default function HeritageExplorer() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const [period, setPeriod] = useState<Period>("All");
  const [fromYear, setFromYear] = useState(MIN_YEAR);
  const [toYear, setToYear] = useState(MAX_YEAR);

  const filteredSites = useMemo(
    () =>
      sites.filter((site) => {
        const matchesPeriod = period === "All" || site.periods.includes(period);
        const overlapsWindow = site.startYear <= toYear && site.endYear >= fromYear;
        return matchesPeriod && overlapsWindow;
      }),
    [period, fromYear, toYear],
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
      attributionControl: true,
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
    mapRef.current = map;

    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    const bounds = new maplibregl.LngLatBounds();

    filteredSites.forEach((site) => {
      const element = document.createElement("button");
      element.type = "button";
      element.className = `heritage-marker${site.recordReady ? " heritage-marker-ready" : ""}`;
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

    if (filteredSites.length === 1) {
      map.easeTo({
        center: [filteredSites[0].longitude, filteredSites[0].latitude],
        zoom: 6.4,
        duration: 650,
      });
    } else if (filteredSites.length > 1) {
      map.fitBounds(bounds, { padding: 70, maxZoom: 6.2, duration: 650 });
    }
  }, [filteredSites]);

  function focusSite(site: Site) {
    const map = mapRef.current;
    if (!map) return;
    map.easeTo({ center: [site.longitude, site.latitude], zoom: 6.7, duration: 650 });
  }

  function resetFilters() {
    setPeriod("All");
    setFromYear(MIN_YEAR);
    setToYear(MAX_YEAR);
  }

  return (
    <div className="heritage-explorer">
      <aside className="explorer-controls" aria-label="Explorer filters">
        <div className="explorer-control-heading">
          <div>
            <p className="section-label">Filter the archive</p>
            <strong>{filteredSites.length} of {sites.length} sites</strong>
          </div>
          <button type="button" onClick={resetFilters}>Reset</button>
        </div>

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
          Date ranges for records still in preparation are deliberately broad discovery windows. They support exploration, not precise archaeological claims.
        </p>
      </aside>

      <div className="explorer-stage">
        <div className="explorer-map" ref={mapContainerRef} aria-label="Interactive map of archaeological sites in Anatolia" />
        <div className="explorer-legend" aria-label="Map legend">
          <span><i className="legend-dot legend-dot-ready" /> Sourced record</span>
          <span><i className="legend-dot" /> Record in preparation</span>
        </div>
      </div>

      <div className="explorer-results" aria-live="polite">
        {filteredSites.length ? (
          filteredSites.map((site) => (
            <article key={site.slug}>
              <button type="button" className="result-focus" onClick={() => focusSite(site)}>
                <span>{site.region}</span>
                <strong>{site.name}</strong>
                <small>{site.dateLabel}</small>
              </button>
              {site.recordReady ? (
                <a href={`/sites/${site.slug}`}>Research record →</a>
              ) : (
                <span className="result-status">Record pending</span>
              )}
            </article>
          ))
        ) : (
          <div className="empty-results">
            <strong>No sites overlap this filter.</strong>
            <button type="button" onClick={resetFilters}>Reset explorer</button>
          </div>
        )}
      </div>
    </div>
  );
}
