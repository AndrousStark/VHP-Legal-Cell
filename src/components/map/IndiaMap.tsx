"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import * as topojson from "topojson-client";
import { motion, AnimatePresence } from "framer-motion";
import type { Topology } from "topojson-specification";
import type { FeatureCollection, Geometry } from "geojson";

import {
  CHETRAS,
  MOCK_REGION_STATS,
  getChetraForState,
  getStateColor,
} from "@/lib/map-config";
import { cn, assetPath } from "@/lib/utils";
import { MapTooltip } from "./MapTooltip";
import { MapStatCards } from "./MapStatCards";
import { ArrowLeft, Layers } from "lucide-react";

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

/**
 * District TopoJSON uses encoded state names with > for A and | for I.
 * This maps clean state names (from states TopoJSON ST_NM) to the
 * district-file STATE property values.
 */
const STATE_NAME_TO_DISTRICT_STATE: Record<string, string> = {
  "Gujarat": "GUJAR>T",
  "Madhya Pradesh": "MADHYA PRADESH",
  "Uttar Pradesh": "UTTAR PRADESH",
  "Rajasthan": "R>JASTH>N",
  "Kerala": "KERALA",
  "Uttarakhand": "UTTAR>KHAND",
  "Andhra Pradesh": "ANDHRA PRADESH",
  "Odisha": "ODISHA",
  "Karnataka": "KARN>TAKA",
  "Chhattisgarh": "CHHATT|SGARH",
  "Himachal Pradesh": "HIM>CHAL PRADESH",
  "Manipur": "MANIPUR",
  "Jharkhand": "JH>RKHAND",
  "NCT of Delhi": "DELHI",
  "Mizoram": "MIZORAM",
  "Chandigarh": "CHAND|GARH",
  "Dadra and Nagar Haveli and Daman and Diu": "D>DRA & NAGAR HAVELI & DAM>N & DIU",
  "Tripura": "TRIPURA",
  "Sikkim": "SIKKIM",
  "Meghalaya": "MEGH>LAYA",
  "Puducherry": "PUDUCHERRY",
  "Lakshadweep": "LAKSHADWEEP",
  "Andaman and Nicobar Islands": "ANDAMAN & NICOBAR",
  "Goa": "GOA",
  "Jammu & Kashmir": "JAMMU AND KASHM|R",
  "Ladakh": "LAD>KH",
  "Telangana": "TELANG>NA",
  "Maharashtra": "MAH>R>SHTRA",
  "West Bengal": "WEST BENGAL",
  "Haryana": "HARY>NA",
  "Punjab": "PUNJAB",
  "Arunachal Pradesh": "ARUN>CHAL PRADESH",
  "Bihar": "BIH>R",
  "Nagaland": "N>G>LAND",
  "Tamil Nadu": "TAMIL N>DU",
  "Assam": "ASSAM",
};

/* ─── Types ─── */

interface IndiaMapProps {
  onStateClick?: (stateName: string, chetraId: string) => void;
  selectedChetra?: string | null;
  className?: string;
}

interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  stateName: string;
  chetraName: string;
  districtName?: string;
  cases: number;
  members: number;
}

type MapView = "india" | "state";

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
  chetraName: "",
  cases: 0,
  members: 0,
};

/* ─── Component ─── */

export function IndiaMap({
  onStateClick,
  selectedChetra,
  className,
}: IndiaMapProps) {
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);
  const districtLayerRef = useRef<google.maps.Data | null>(null);
  const statesGeoRef = useRef<FeatureCollection<Geometry> | null>(null);
  const districtsTopoRef = useRef<Topology | null>(null);
  const listenersRef = useRef<google.maps.MapsEventListener[]>([]);

  const [tooltip, setTooltip] = useState<TooltipState>(TOOLTIP_INITIAL);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [geoLoaded, setGeoLoaded] = useState(false);
  const [mapView, setMapView] = useState<MapView>("india");
  const [activeState, setActiveState] = useState<string | null>(null);
  const [districtCount, setDistrictCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { isLoaded: mapsLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    mapIds: ["vhp_india_map"],
  });

  /* ─── Load state & district GeoJSON ─── */
  useEffect(() => {
    if (!isLoaded || !mapRef.current) return;
    let cancelled = false;

    async function loadGeoData() {
      try {
        // Load both in parallel
        const [statesRes, districtsRes] = await Promise.all([
          fetch(assetPath("/geo/india-states.topo.json")),
          fetch(assetPath("/geo/india-districts.topo.json")),
        ]);

        if (!statesRes.ok) throw new Error(`States HTTP ${statesRes.status}`);
        if (!districtsRes.ok) throw new Error(`Districts HTTP ${districtsRes.status}`);

        const [statesTopo, districtsTopo] = await Promise.all([
          statesRes.json() as Promise<Topology>,
          districtsRes.json() as Promise<Topology>,
        ]);

        if (cancelled || !mapRef.current) return;

        const statesGeo = topojson.feature(
          statesTopo,
          statesTopo.objects["State Boundary"],
        ) as FeatureCollection<Geometry>;

        statesGeoRef.current = statesGeo;
        districtsTopoRef.current = districtsTopo;

        const map = mapRef.current;

        // Clear and add state features
        map.data.forEach((f) => map.data.remove(f));
        map.data.addGeoJson(statesGeo);
        applyStateStyles(map, selectedChetra);

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

  /* ─── Update styles when selectedChetra changes (India view only) ─── */
  useEffect(() => {
    if (!mapRef.current || !geoLoaded || mapView !== "india") return;
    applyStateStyles(mapRef.current, selectedChetra);
  }, [selectedChetra, geoLoaded, mapView]);

  /* ─── State-level event handlers ─── */
  useEffect(() => {
    if (!mapRef.current || !geoLoaded || mapView !== "india") return;
    const map = mapRef.current;

    // Clean previous listeners
    listenersRef.current.forEach((l) => google.maps.event.removeListener(l));
    listenersRef.current = [];

    const clickListener = map.data.addListener(
      "click",
      (event: google.maps.Data.MouseEvent) => {
        const stateName = event.feature.getProperty("ST_NM") as string;
        if (!stateName) return;
        const chetra = getChetraForState(stateName);
        if (chetra && onStateClick) {
          onStateClick(stateName, chetra.id);
        }
      },
    );

    const overListener = map.data.addListener(
      "mouseover",
      (event: google.maps.Data.MouseEvent) => {
        const stateName = event.feature.getProperty("ST_NM") as string;
        if (!stateName) return;
        const chetra = getChetraForState(stateName);
        const chetraId = chetra?.id ?? "";
        const stats = chetraId ? MOCK_REGION_STATS[chetraId] : undefined;

        map.data.overrideStyle(event.feature, {
          fillColor: "#E8B84B",
          fillOpacity: 0.85,
          strokeWeight: 2,
          strokeColor: "#FFF8F0",
        });

        const domEvent = event.domEvent as MouseEvent;
        setTooltip({
          visible: true,
          x: domEvent.clientX,
          y: domEvent.clientY,
          stateName,
          chetraName: chetra?.nameEn ?? "Unassigned",
          cases: stats?.cases ?? 0,
          members: stats?.members ?? 0,
        });
      },
    );

    const outListener = map.data.addListener(
      "mouseout",
      (event: google.maps.Data.MouseEvent) => {
        map.data.revertStyle(event.feature);
        setTooltip((prev) => ({ ...prev, visible: false }));
      },
    );

    listenersRef.current = [clickListener, overListener, outListener];

    return () => {
      listenersRef.current.forEach((l) => google.maps.event.removeListener(l));
      listenersRef.current = [];
    };
  }, [geoLoaded, onStateClick, mapView]);

  /* ─── Show districts for a state ─── */
  const showDistricts = useCallback((stateName: string) => {
    const map = mapRef.current;
    const districtsTopo = districtsTopoRef.current;
    if (!map || !districtsTopo) return;

    // Get the district STATE key
    const districtStateKey = STATE_NAME_TO_DISTRICT_STATE[stateName];
    if (!districtStateKey) return;

    // Convert districts topo to GeoJSON
    const allDistricts = topojson.feature(
      districtsTopo,
      districtsTopo.objects["District Boundaries"],
    ) as FeatureCollection<Geometry>;

    // Filter to only this state's districts
    const stateDistricts: FeatureCollection<Geometry> = {
      type: "FeatureCollection",
      features: allDistricts.features.filter(
        (f) => f.properties?.STATE === districtStateKey,
      ),
    };

    if (stateDistricts.features.length === 0) return;

    // Clean previous listeners on state data layer
    listenersRef.current.forEach((l) => google.maps.event.removeListener(l));
    listenersRef.current = [];

    // Hide state layer features (make them transparent)
    map.data.setStyle({ visible: false });

    // Create a separate Data layer for districts
    if (districtLayerRef.current) {
      districtLayerRef.current.setMap(null);
    }
    const districtLayer = new google.maps.Data({ map });
    districtLayerRef.current = districtLayer;

    districtLayer.addGeoJson(stateDistricts);
    setDistrictCount(stateDistricts.features.length);

    // Get the chetra color for this state
    const chetra = getChetraForState(stateName);
    const baseColor = chetra?.color ?? "#9E9E9E";

    // Style districts with varying opacity for visual distinction
    districtLayer.setStyle((feature) => {
      const idx = stateDistricts.features.findIndex(
        (f) => f.properties?.District === feature.getProperty("District"),
      );
      // Alternate slightly between two opacities for visual contrast
      const opacity = idx % 2 === 0 ? 0.55 : 0.7;

      return {
        fillColor: baseColor,
        fillOpacity: opacity,
        strokeColor: "#FFF8F0",
        strokeWeight: 0.8,
        clickable: true,
        cursor: "pointer",
      };
    });

    // District hover
    const dOverListener = districtLayer.addListener(
      "mouseover",
      (event: google.maps.Data.MouseEvent) => {
        const districtName = formatDistrictName(
          event.feature.getProperty("District") as string,
        );

        districtLayer.overrideStyle(event.feature, {
          fillColor: "#E8B84B",
          fillOpacity: 0.9,
          strokeWeight: 2,
          strokeColor: "#FFF8F0",
        });

        const domEvent = event.domEvent as MouseEvent;
        setTooltip({
          visible: true,
          x: domEvent.clientX,
          y: domEvent.clientY,
          stateName,
          chetraName: chetra?.nameEn ?? "Unassigned",
          districtName,
          cases: 0,
          members: 0,
        });
      },
    );

    const dOutListener = districtLayer.addListener(
      "mouseout",
      (event: google.maps.Data.MouseEvent) => {
        districtLayer.revertStyle(event.feature);
        setTooltip((prev) => ({ ...prev, visible: false }));
      },
    );

    const dClickListener = districtLayer.addListener(
      "click",
      (event: google.maps.Data.MouseEvent) => {
        const districtName = formatDistrictName(
          event.feature.getProperty("District") as string,
        );
        // Zoom into district
        const bounds = new google.maps.LatLngBounds();
        event.feature.getGeometry()?.forEachLatLng((latLng) => {
          bounds.extend(latLng);
        });
        if (!bounds.isEmpty()) {
          map.fitBounds(bounds, { top: 40, bottom: 40, left: 40, right: 40 });
        }

        // Flash highlight
        districtLayer.overrideStyle(event.feature, {
          fillColor: "#FF6B2B",
          fillOpacity: 0.9,
          strokeWeight: 3,
          strokeColor: "#FFF8F0",
        });
        setTimeout(() => {
          districtLayer.revertStyle(event.feature);
        }, 800);

        setTooltip((prev) => ({
          ...prev,
          districtName,
          visible: true,
        }));
      },
    );

    listenersRef.current = [dOverListener, dOutListener, dClickListener];

    // Zoom to state bounds
    const bounds = new google.maps.LatLngBounds();
    stateDistricts.features.forEach((f) => {
      if (f.geometry.type === "Polygon") {
        (f.geometry.coordinates as number[][][]).forEach((ring) =>
          ring.forEach(([lng, lat]) => bounds.extend({ lat, lng })),
        );
      } else if (f.geometry.type === "MultiPolygon") {
        (f.geometry.coordinates as number[][][][]).forEach((poly) =>
          poly.forEach((ring) =>
            ring.forEach(([lng, lat]) => bounds.extend({ lat, lng })),
          ),
        );
      }
    });

    if (!bounds.isEmpty()) {
      map.fitBounds(bounds, { top: 50, bottom: 50, left: 50, right: 50 });
    }

    setActiveState(stateName);
    setMapView("state");
  }, []);

  /* ─── Back to India view ─── */
  const backToIndia = useCallback(() => {
    const map = mapRef.current;
    if (!map) return;

    // Remove district layer
    if (districtLayerRef.current) {
      listenersRef.current.forEach((l) => google.maps.event.removeListener(l));
      listenersRef.current = [];
      districtLayerRef.current.setMap(null);
      districtLayerRef.current = null;
    }

    // Show state layer again
    applyStateStyles(map, selectedChetra);
    map.fitBounds(INDIA_BOUNDS);

    setActiveState(null);
    setMapView("india");
    setDistrictCount(0);
    setTooltip(TOOLTIP_INITIAL);
  }, [selectedChetra]);

  /* ─── City Markers ─── */
  useEffect(() => {
    if (!isLoaded || !mapRef.current || !geoLoaded) return;
    const map = mapRef.current;

    markersRef.current.forEach((m) => { m.map = null; });
    markersRef.current = [];

    ACTIVE_CITIES.forEach((city) => {
      const el = document.createElement("div");
      el.className = "city-marker-pulse";
      el.innerHTML = `
        <div style="position:relative;display:flex;align-items:center;justify-content:center;width:24px;height:24px;">
          <div style="position:absolute;width:24px;height:24px;border-radius:50%;background:rgba(255,107,43,0.3);animation:gmPulse 2s ease-out infinite;"></div>
          <div style="width:10px;height:10px;border-radius:50%;background:#FF6B2B;border:2px solid #FFF8F0;box-shadow:0 0 6px rgba(255,107,43,0.5);position:relative;z-index:1;"></div>
        </div>
      `;
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
        // AdvancedMarkerElement fallback
      }
    });

    return () => {
      markersRef.current.forEach((m) => { m.map = null; });
      markersRef.current = [];
    };
  }, [isLoaded, geoLoaded]);

  /* ─── Fit to selected chetra (India view) ─── */
  useEffect(() => {
    if (!mapRef.current || !geoLoaded || mapView !== "india") return;
    const map = mapRef.current;

    if (!selectedChetra) {
      map.fitBounds(INDIA_BOUNDS);
      return;
    }

    const chetra = CHETRAS.find((k) => k.id === selectedChetra);
    if (!chetra) return;

    const bounds = new google.maps.LatLngBounds();
    let found = false;

    map.data.forEach((feature) => {
      const stateName = feature.getProperty("ST_NM") as string;
      if (chetra.states.some((s) => s.toLowerCase() === stateName.toLowerCase())) {
        feature.getGeometry()?.forEachLatLng((latLng) => {
          bounds.extend(latLng);
          found = true;
        });
      }
    });

    if (found) {
      map.fitBounds(bounds, { top: 50, bottom: 50, left: 50, right: 50 });
    }
  }, [selectedChetra, geoLoaded, mapView]);

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
              maxZoom: 14,
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

        {/* Top controls: Back button + View Districts button */}
        <AnimatePresence>
          {mapView === "india" && geoLoaded && (
            <motion.div
              key="view-districts-btn"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-3 right-3 z-20"
            >
              {selectedChetra && (
                <div className="flex flex-col gap-2">
                  {/* Show districts for each state in the chetra */}
                  {CHETRAS.find((c) => c.id === selectedChetra)?.states.map((st) => (
                    <button
                      key={st}
                      onClick={() => showDistricts(st)}
                      className="glass-dark flex items-center gap-2 rounded-lg px-3 py-2 text-left transition-all hover:bg-gold/20"
                    >
                      <Layers className="h-3.5 w-3.5 text-gold-bright" />
                      <span className="font-[family-name:var(--font-satoshi)] text-xs font-medium text-cream">
                        {st} Districts
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {mapView === "state" && activeState && (
            <motion.div
              key="state-controls"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between"
            >
              <button
                onClick={backToIndia}
                className="glass-dark flex items-center gap-2 rounded-lg px-3 py-2 transition-all hover:bg-gold/20"
              >
                <ArrowLeft className="h-4 w-4 text-gold-bright" />
                <span className="font-[family-name:var(--font-satoshi)] text-xs font-medium text-cream">
                  Back to India
                </span>
              </button>

              <div className="glass-dark rounded-lg px-3 py-2">
                <p className="font-[family-name:var(--font-playfair)] text-sm font-bold text-cream">
                  {activeState}
                </p>
                <p className="font-[family-name:var(--font-satoshi)] text-[11px] text-gold-bright">
                  {districtCount} Districts
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chetra Legend (India view only) */}
        <AnimatePresence>
          {mapView === "india" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-3 left-3 right-3 z-20 md:bottom-4 md:left-4 md:right-auto"
            >
              <div className="glass-dark max-h-48 overflow-y-auto rounded-lg p-3 md:max-h-none">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gold-bright">
                  Chetras
                </p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 md:grid-cols-1">
                  {CHETRAS.map((chetra) => (
                    <div key={chetra.id} className="flex items-center gap-2">
                      <span
                        className="inline-block h-2.5 w-2.5 shrink-0 rounded-sm"
                        style={{ backgroundColor: chetra.color }}
                      />
                      <span className="truncate text-[11px] text-cream/80">
                        {chetra.nameEn}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
        chetraName={tooltip.chetraName}
        districtName={tooltip.districtName}
        cases={tooltip.cases}
        members={tooltip.members}
      />

      {/* Stat Cards */}
      <MapStatCards className="mt-6" />
    </div>
  );
}

/* ─── Helper: apply state-level styles ─── */

function applyStateStyles(
  map: google.maps.Map,
  selectedChetra: string | null | undefined,
) {
  map.data.setStyle((feature) => {
    const stateName = feature.getProperty("ST_NM") as string;
    const fillColor = getStateColor(stateName);
    const chetra = getChetraForState(stateName);
    const isSelected = !selectedChetra || chetra?.id === selectedChetra;

    return {
      fillColor,
      fillOpacity: isSelected ? 0.7 : 0.15,
      strokeColor: "#FFF8F0",
      strokeWeight: isSelected ? 1 : 0.3,
      clickable: true,
      cursor: "pointer",
      visible: true,
    };
  });
}

/* ─── Helper: format district name from UPPERCASE to Title Case ─── */

function formatDistrictName(name: string): string {
  if (!name) return "";
  return name
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
