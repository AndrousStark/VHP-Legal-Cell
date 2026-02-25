"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import * as topojson from "topojson-client";
import { motion, AnimatePresence } from "framer-motion";
import type { Topology } from "topojson-specification";
import type { FeatureCollection, Geometry } from "geojson";

import {
  KHETRAS,
  MOCK_REGION_STATS,
  getKhetraForState,
  getStateColor,
} from "@/lib/map-config";
import { cn, assetPath } from "@/lib/utils";
import { MapTooltip } from "./MapTooltip";
import { MapStatCards } from "./MapStatCards";

/* ─── Constants ─── */

const GOOGLE_MAPS_API_KEY = "AIzaSyBLIaMA6eIqVZhvSPJZJozb4jcaJ4-mDZQ";

const INDIA_CENTER = { lat: 23.0, lng: 82.0 };
const DEFAULT_ZOOM = 5;

const INDIA_BOUNDS = {
  north: 37.5,
  south: 6.5,
  east: 97.5,
  west: 68.0,
};

/** Dark-themed map style matching maroon-dark palette */
const MAP_STYLES: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#1a0a0a" }] },
  { elementType: "labels", stylers: [{ visibility: "off" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#0e0505" }] },
  { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#1a0a0a" }] },
  { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#2a1515" }, { weight: 0.5 }] },
  { featureType: "administrative.country", elementType: "geometry.stroke", stylers: [{ color: "#4a2020" }, { weight: 1 }] },
  { featureType: "road", stylers: [{ visibility: "off" }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
];

/* ─── Types ─── */

interface IndiaMapProps {
  onStateClick?: (stateName: string, khetraId: string) => void;
  selectedKhetra?: string | null;
  className?: string;
}

interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  stateName: string;
  khetraName: string;
  cases: number;
  members: number;
}

/* ─── Active cities with VHP Legal Cell presence ─── */

interface CityMarker {
  name: string;
  lat: number;
  lng: number;
}

const ACTIVE_CITIES: CityMarker[] = [
  { name: "New Delhi", lat: 28.6139, lng: 77.209 },
  { name: "Mumbai", lat: 19.076, lng: 72.8777 },
  { name: "Lucknow", lat: 26.8467, lng: 80.9462 },
  { name: "Ahmedabad", lat: 23.0225, lng: 72.5714 },
  { name: "Jaipur", lat: 26.9124, lng: 75.7873 },
  { name: "Bhopal", lat: 23.2599, lng: 77.4126 },
];

/* ─── Tooltip initial state ─── */

const TOOLTIP_INITIAL: TooltipState = {
  visible: false,
  x: 0,
  y: 0,
  stateName: "",
  khetraName: "",
  cases: 0,
  members: 0,
};

/* ─── Component ─── */

export function IndiaMap({
  onStateClick,
  selectedKhetra,
  className,
}: IndiaMapProps) {
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);
  const [tooltip, setTooltip] = useState<TooltipState>(TOOLTIP_INITIAL);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [geoLoaded, setGeoLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { isLoaded: mapsLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    mapIds: ["vhp_india_map"],
  });

  /* ─── Load GeoJSON into Data Layer ─── */
  useEffect(() => {
    if (!isLoaded || !mapRef.current) return;
    let cancelled = false;

    async function loadGeoData() {
      try {
        const response = await fetch(assetPath("/geo/india-states.topo.json"));
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const topoData: Topology = await response.json();
        const featureCollection = topojson.feature(
          topoData,
          topoData.objects["State Boundary"],
        ) as FeatureCollection<Geometry>;

        if (cancelled || !mapRef.current) return;

        const map = mapRef.current;

        // Clear existing features
        map.data.forEach((f) => map.data.remove(f));

        // Add GeoJSON features
        map.data.addGeoJson(featureCollection);

        // Apply styles
        applyDataLayerStyles(map, selectedKhetra);

        setGeoLoaded(true);
        setLoadError(false);
      } catch {
        if (!cancelled) setLoadError(true);
      }
    }

    loadGeoData();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, retryCount]);

  /* ─── Update styles when selectedKhetra changes ─── */
  useEffect(() => {
    if (!mapRef.current || !geoLoaded) return;
    applyDataLayerStyles(mapRef.current, selectedKhetra);
  }, [selectedKhetra, geoLoaded]);

  /* ─── Data Layer event handlers ─── */
  useEffect(() => {
    if (!mapRef.current || !geoLoaded) return;
    const map = mapRef.current;

    const clickListener = map.data.addListener(
      "click",
      (event: google.maps.Data.MouseEvent) => {
        const stateName = event.feature.getProperty("ST_NM") as string;
        const khetra = getKhetraForState(stateName);
        if (khetra && onStateClick) {
          onStateClick(stateName, khetra.id);
        }
      },
    );

    const moveListener = map.data.addListener(
      "mouseover",
      (event: google.maps.Data.MouseEvent) => {
        const stateName = event.feature.getProperty("ST_NM") as string;
        const khetra = getKhetraForState(stateName);
        const khetraId = khetra?.id ?? "";
        const stats = khetraId ? MOCK_REGION_STATS[khetraId] : undefined;

        // Change cursor and highlight
        map.data.overrideStyle(event.feature, {
          fillColor: "#E8B84B",
          fillOpacity: 0.85,
          strokeWeight: 2,
          strokeColor: "#FFF8F0",
        });

        // Position tooltip using DOM event
        const domEvent = event.domEvent as MouseEvent;
        setTooltip({
          visible: true,
          x: domEvent.clientX,
          y: domEvent.clientY,
          stateName,
          khetraName: khetra?.nameEn ?? "Unassigned",
          cases: stats?.cases ?? 0,
          members: stats?.members ?? 0,
        });
      },
    );

    const outListener = map.data.addListener(
      "mouseout",
      (event: google.maps.Data.MouseEvent) => {
        // Revert style
        map.data.revertStyle(event.feature);
        setTooltip((prev) => ({ ...prev, visible: false }));
      },
    );

    return () => {
      google.maps.event.removeListener(clickListener);
      google.maps.event.removeListener(moveListener);
      google.maps.event.removeListener(outListener);
    };
  }, [geoLoaded, onStateClick]);

  /* ─── City Markers ─── */
  useEffect(() => {
    if (!isLoaded || !mapRef.current || !geoLoaded) return;
    const map = mapRef.current;

    // Clean up previous markers
    markersRef.current.forEach((m) => { m.map = null; });
    markersRef.current = [];

    ACTIVE_CITIES.forEach((city) => {
      // Create custom marker element
      const el = document.createElement("div");
      el.className = "city-marker-pulse";
      el.innerHTML = `
        <div style="position:relative;display:flex;align-items:center;justify-content:center;width:24px;height:24px;">
          <div style="position:absolute;width:24px;height:24px;border-radius:50%;background:rgba(255,107,43,0.3);animation:gmPulse 2s ease-out infinite;"></div>
          <div style="width:10px;height:10px;border-radius:50%;background:#FF6B2B;border:2px solid #FFF8F0;box-shadow:0 0 6px rgba(255,107,43,0.5);position:relative;z-index:1;"></div>
        </div>
      `;

      // Tooltip on hover
      el.title = city.name;

      try {
        const marker = new google.maps.marker.AdvancedMarkerElement({
          map,
          position: { lat: city.lat, lng: city.lng },
          content: el,
          title: city.name,
        });
        markersRef.current.push(marker);
      } catch {
        // AdvancedMarkerElement requires a mapId — fallback silently
      }
    });

    return () => {
      markersRef.current.forEach((m) => { m.map = null; });
      markersRef.current = [];
    };
  }, [isLoaded, geoLoaded]);

  /* ─── Fit to selected khetra or India bounds ─── */
  useEffect(() => {
    if (!mapRef.current || !geoLoaded) return;
    const map = mapRef.current;

    if (!selectedKhetra) {
      map.fitBounds(INDIA_BOUNDS);
      return;
    }

    // Compute bounds for all states in the selected khetra
    const khetra = KHETRAS.find((k) => k.id === selectedKhetra);
    if (!khetra) return;

    const bounds = new google.maps.LatLngBounds();
    let found = false;

    map.data.forEach((feature) => {
      const stateName = feature.getProperty("ST_NM") as string;
      if (khetra.states.some((s) => s.toLowerCase() === stateName.toLowerCase())) {
        feature.getGeometry()?.forEachLatLng((latLng) => {
          bounds.extend(latLng);
          found = true;
        });
      }
    });

    if (found) {
      map.fitBounds(bounds, { top: 50, bottom: 50, left: 50, right: 50 });
    }
  }, [selectedKhetra, geoLoaded]);

  /* ─── Map onLoad handler ─── */
  const handleMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    map.fitBounds(INDIA_BOUNDS);
    setIsLoaded(true);
  }, []);

  /* ─── Render ─── */

  return (
    <div className={cn("w-full", className)} ref={containerRef}>
      {/* Map Container */}
      <div className="relative overflow-hidden rounded-2xl border border-gold/20 bg-maroon-dark shadow-xl">
        {/* Loading / Error overlay */}
        <AnimatePresence>
          {(!mapsLoaded || !geoLoaded) && (
            <motion.div
              className="absolute inset-0 z-10 flex items-center justify-center bg-maroon-dark"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-center">
                {loadError ? (
                  <>
                    <p className="font-[family-name:var(--font-satoshi)] text-sm text-red-400">
                      Failed to load map data.
                    </p>
                    <button
                      onClick={() => { setLoadError(false); setGeoLoaded(false); setRetryCount((c) => c + 1); }}
                      className="mt-3 rounded-lg bg-gold/20 px-4 py-2 font-[family-name:var(--font-satoshi)] text-xs text-cream transition-colors hover:bg-gold/30"
                    >
                      Retry
                    </button>
                  </>
                ) : (
                  <>
                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-gold/30 border-t-gold-bright" />
                    <p className="mt-4 font-[family-name:var(--font-satoshi)] text-sm text-cream/60">
                      Loading Google Maps...
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Google Map */}
        {mapsLoaded && (
          <GoogleMap
            mapContainerStyle={{ width: "100%", aspectRatio: "4 / 5" }}
            center={INDIA_CENTER}
            zoom={DEFAULT_ZOOM}
            onLoad={handleMapLoad}
            options={{
              disableDefaultUI: true,
              clickableIcons: false,
              gestureHandling: "greedy",
              minZoom: 4,
              maxZoom: 12,
              restriction: {
                latLngBounds: INDIA_BOUNDS,
                strictBounds: false,
              },
              styles: MAP_STYLES,
              mapId: "vhp_india_map",
              backgroundColor: "#1a0a0a",
            }}
          />
        )}

        {/* Khetra Legend */}
        <div className="absolute bottom-3 left-3 right-3 z-20 md:bottom-4 md:left-4 md:right-auto">
          <div className="glass-dark max-h-48 overflow-y-auto rounded-lg p-3 md:max-h-none">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gold-bright">
              Khetras
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 md:grid-cols-1">
              {KHETRAS.map((khetra) => (
                <div key={khetra.id} className="flex items-center gap-2">
                  <span
                    className="inline-block h-2.5 w-2.5 shrink-0 rounded-sm"
                    style={{ backgroundColor: khetra.color }}
                  />
                  <span className="truncate text-[11px] text-cream/80">
                    {khetra.nameEn}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pulse animation styles */}
        <style jsx global>{`
          @keyframes gmPulse {
            0% { transform: scale(1); opacity: 0.7; }
            100% { transform: scale(2.5); opacity: 0; }
          }
        `}</style>
      </div>

      {/* Tooltip */}
      <MapTooltip
        visible={tooltip.visible}
        x={tooltip.x}
        y={tooltip.y}
        stateName={tooltip.stateName}
        khetraName={tooltip.khetraName}
        cases={tooltip.cases}
        members={tooltip.members}
      />

      {/* Stat Cards */}
      <MapStatCards className="mt-6" />
    </div>
  );
}

/* ─── Helper: apply Data Layer styles ─── */

function applyDataLayerStyles(
  map: google.maps.Map,
  selectedKhetra: string | null | undefined,
) {
  map.data.setStyle((feature) => {
    const stateName = feature.getProperty("ST_NM") as string;
    const fillColor = getStateColor(stateName);
    const khetra = getKhetraForState(stateName);
    const isSelected = !selectedKhetra || khetra?.id === selectedKhetra;

    return {
      fillColor,
      fillOpacity: isSelected ? 0.7 : 0.15,
      strokeColor: "#FFF8F0",
      strokeWeight: isSelected ? 1 : 0.3,
      clickable: true,
      cursor: "pointer",
    };
  });
}
