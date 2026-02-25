"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from "react-simple-maps";
import * as topojson from "topojson-client";
import { motion, AnimatePresence } from "framer-motion";
import type { Topology } from "topojson-specification";
import type { FeatureCollection, Geometry } from "geojson";

import {
  INDIA_PROJECTION,
  KHETRAS,
  MOCK_REGION_STATS,
  getKhetraForState,
  getStateColor,
} from "@/lib/map-config";
import { cn } from "@/lib/utils";
import { MapTooltip } from "./MapTooltip";
import { MapStatCards } from "./MapStatCards";

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
  coordinates: [number, number]; // [lng, lat]
}

const ACTIVE_CITIES: CityMarker[] = [
  { name: "New Delhi", coordinates: [77.209, 28.6139] },
  { name: "Mumbai", coordinates: [72.8777, 19.076] },
  { name: "Lucknow", coordinates: [80.9462, 26.8467] },
  { name: "Ahmedabad", coordinates: [72.5714, 23.0225] },
  { name: "Jaipur", coordinates: [75.7873, 26.9124] },
  { name: "Bhopal", coordinates: [77.4126, 23.2599] },
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
  const [geoData, setGeoData] = useState<FeatureCollection<Geometry> | null>(
    null,
  );
  const [tooltip, setTooltip] = useState<TooltipState>(TOOLTIP_INITIAL);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  /* Fetch TopoJSON and convert to GeoJSON FeatureCollection */
  useEffect(() => {
    let cancelled = false;

    async function loadMap() {
      try {
        const response = await fetch("/geo/india-states.topo.json");
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const topoData: Topology = await response.json();
        const featureCollection = topojson.feature(
          topoData,
          topoData.objects["State Boundary"],
        ) as FeatureCollection<Geometry>;

        if (!cancelled) {
          setGeoData(featureCollection);
          requestAnimationFrame(() => setIsLoaded(true));
        }
      } catch {
        if (!cancelled) setLoadError(true);
      }
    }

    loadMap();
    return () => {
      cancelled = true;
    };
  }, [retryCount]);

  /* Mouse move handler for tooltip positioning */
  const handleMouseMove = useCallback(
    (stateName: string, event: React.MouseEvent) => {
      const khetra = getKhetraForState(stateName);
      const khetraId = khetra?.id ?? "";
      const stats = khetraId ? MOCK_REGION_STATS[khetraId] : undefined;

      setTooltip({
        visible: true,
        x: event.clientX,
        y: event.clientY,
        stateName,
        khetraName: khetra?.nameEn ?? "Unassigned",
        cases: stats?.cases ?? 0,
        members: stats?.members ?? 0,
      });
    },
    [],
  );

  const handleMouseLeave = useCallback(() => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  }, []);

  const handleStateClick = useCallback(
    (stateName: string) => {
      const khetra = getKhetraForState(stateName);
      if (khetra && onStateClick) {
        onStateClick(stateName, khetra.id);
      }
    },
    [onStateClick],
  );

  /* Determine opacity for Khetra filtering */
  const getStateOpacity = useCallback(
    (stateName: string): number => {
      if (!selectedKhetra) return 1;
      const khetra = getKhetraForState(stateName);
      return khetra?.id === selectedKhetra ? 1 : 0.25;
    },
    [selectedKhetra],
  );

  return (
    <div className={cn("w-full", className)} ref={containerRef}>
      {/* Map Container */}
      <div className="relative overflow-hidden rounded-2xl border border-gold/20 bg-maroon-dark shadow-xl">
        {/* Loading / Error state */}
        <AnimatePresence>
          {!geoData && (
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
                      onClick={() => { setLoadError(false); setGeoData(null); setRetryCount((c) => c + 1); }}
                      className="mt-3 rounded-lg bg-gold/20 px-4 py-2 font-[family-name:var(--font-satoshi)] text-xs text-cream transition-colors hover:bg-gold/30"
                    >
                      Retry
                    </button>
                  </>
                ) : (
                  <>
                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-gold/30 border-t-gold-bright" />
                    <p className="mt-4 font-[family-name:var(--font-satoshi)] text-sm text-cream/60">
                      Loading map...
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SVG Map */}
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            center: INDIA_PROJECTION.center,
            scale: INDIA_PROJECTION.scale,
          }}
          className="w-full"
          style={{ aspectRatio: "4 / 5" }}
        >
          <ZoomableGroup center={INDIA_PROJECTION.center} zoom={1}>
            {geoData && (
              <Geographies geography={geoData}>
                {({ geographies }) =>
                  geographies.map((geo, index) => {
                    const stateName: string =
                      (geo.properties.ST_NM as string) ?? "Unknown";
                    const fillColor = getStateColor(stateName);
                    const opacity = getStateOpacity(stateName);

                    return (
                      <motion.g
                        key={geo.rsmKey}
                        initial={{ opacity: 0 }}
                        animate={isLoaded ? { opacity } : { opacity: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.02,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        <Geography
                          geography={geo}
                          fill={fillColor}
                          stroke="#FFF8F0"
                          strokeWidth={0.5}
                          style={{
                            default: {
                              outline: "none",
                              transition: "fill 0.2s ease",
                            },
                            hover: {
                              fill: "#E8B84B",
                              outline: "none",
                              cursor: "pointer",
                            },
                            pressed: {
                              fill: "#C4922C",
                              outline: "none",
                            },
                          }}
                          onMouseMove={(event: React.MouseEvent) =>
                            handleMouseMove(stateName, event)
                          }
                          onMouseLeave={handleMouseLeave}
                          onClick={() => handleStateClick(stateName)}
                        />
                      </motion.g>
                    );
                  })
                }
              </Geographies>
            )}

            {/* Pulsing city markers */}
            {isLoaded &&
              ACTIVE_CITIES.map((city) => (
                <Marker key={city.name} coordinates={city.coordinates}>
                  <motion.g
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                  >
                    {/* Outer pulse ring */}
                    <motion.circle
                      r={6}
                      fill="none"
                      stroke="#FF6B2B"
                      strokeWidth={1}
                      animate={{
                        r: [4, 10],
                        opacity: [0.7, 0],
                        strokeWidth: [1.5, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />
                    {/* Inner dot */}
                    <circle r={3} fill="#FF6B2B" opacity={0.9} />
                    <circle r={1.5} fill="#FFF8F0" opacity={0.9} />
                  </motion.g>
                </Marker>
              ))}
          </ZoomableGroup>
        </ComposableMap>

        {/* Khetra Legend */}
        <div className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-auto">
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
