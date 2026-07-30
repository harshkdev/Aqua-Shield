"use client";

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Polyline, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const markers = [
  { id: 1, pos: [28.6139, 77.2090] as [number, number], color: '#10B981', name: 'Yamuna Sector 4 Station', village: 'Okhla Village, Delhi', status: 'Safe', quality: '82 / 100 Good', risk: '24%', population: '142,000', updated: '18s ago', disease: 'Low Risk' },
  { id: 2, pos: [28.5355, 77.3910] as [number, number], color: '#F59E0B', name: 'Noida Sector 62 Intake', village: 'Mamura, Noida', status: 'Watch Advisory', quality: '58 / 100 Moderate', risk: '63%', population: '98,500', updated: '42s ago', disease: 'Acute Diarrheal Disease' },
  { id: 3, pos: [28.6692, 77.4538] as [number, number], color: '#EF4444', name: 'Ghaziabad Pumping Station 8', village: 'Surajpur, Ghaziabad', status: 'High Risk', quality: '34 / 100 Poor', risk: '84%', population: '215,000', updated: '12s ago', disease: 'Typhoid & Dysentery' },
  { id: 4, pos: [19.0760, 72.8777] as [number, number], color: '#F59E0B', name: 'Powai Lake Intake #2', village: 'Powai, Mumbai', status: 'Watch Advisory', quality: '64 / 100 Moderate', risk: '48%', population: '180,000', updated: '1m ago', disease: 'Dysentery' },
  { id: 5, pos: [12.9716, 77.5946] as [number, number], color: '#10B981', name: 'Hessarghatta Reservoir', village: 'Yelahanka, Bengaluru', status: 'Safe', quality: '88 / 100 Optimal', risk: '15%', population: '85,000', updated: '30s ago', disease: 'Low Risk' },
  { id: 6, pos: [13.0827, 80.2707] as [number, number], color: '#10B981', name: 'Red Hills Plant', village: 'Puzhal, Chennai', status: 'Safe', quality: '85 / 100 Optimal', risk: '18%', population: '160,000', updated: '25s ago', disease: 'Low Risk' },
  { id: 7, pos: [22.5726, 88.3639] as [number, number], color: '#F59E0B', name: 'Hooghly Sector B', village: 'Howrah, Kolkata', status: 'Watch Advisory', quality: '61 / 100 Moderate', risk: '52%', population: '310,000', updated: '2m ago', disease: 'Cholera Warning' },
  { id: 8, pos: [26.8467, 80.9462] as [number, number], color: '#EF4444', name: 'Gomti Pumping Station 12', village: 'Chinnahat, Lucknow', status: 'High Risk', quality: '38 / 100 Poor', risk: '78%', population: '125,000', updated: '45s ago', disease: 'Acute Diarrheal Disease' },
];

// Connection lines between Northern Corridor stations
const connections: [number, number][][] = [
  [[28.6139, 77.2090], [28.5355, 77.3910]], // Delhi -> Noida
  [[28.5355, 77.3910], [28.6692, 77.4538]], // Noida -> Ghaziabad
  [[28.6139, 77.2090], [26.8467, 80.9462]], // Delhi -> Lucknow trunk
];

export default function MapComponent() {
  useEffect(() => {
    const styleId = 'map-pulse-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        .leaflet-container {
          background: #07162B !important;
          border-radius: 20px;
        }
        .leaflet-popup-content-wrapper {
          background: rgba(7, 22, 43, 0.94) !important;
          backdrop-filter: blur(20px);
          border: 1px solid rgba(0, 194, 209, 0.3) !important;
          border-radius: 16px !important;
          color: #ffffff !important;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.7) !important;
        }
        .leaflet-popup-tip {
          background: rgba(7, 22, 43, 0.94) !important;
        }
        .leaflet-popup-close-button {
          color: rgba(255,255,255,0.7) !important;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div className="h-[400px] w-full rounded-[20px] overflow-hidden relative z-0 bg-[#07162B] border border-slate-200/60 dark:border-slate-800/60 shadow-[0_10px_30px_rgba(7,22,43,0.12)]">
      {/* Dark Vignette Overlay for Depth */}
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_60px_rgba(7,22,43,0.75)] z-[400] rounded-[20px]" />

      {/* Live Map Overlay Header */}
      <div className="absolute top-3.5 left-3.5 right-3.5 z-[400] flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#07162B]/90 border border-cyan-400/30 backdrop-blur-md text-[11px] font-semibold text-white pointer-events-auto shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00C2D1]"></span>
          </span>
          <span>ArcGIS GIS Command Network · Live Probes</span>
        </div>
        <div className="flex items-center gap-2.5 text-[10px] font-semibold text-white bg-[#07162B]/90 px-3.5 py-1.5 rounded-full border border-slate-700/80 backdrop-blur-md pointer-events-auto shadow-sm">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Safe</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500" /> Watch</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500" /> High Risk</span>
        </div>
      </div>

      <MapContainer
        center={[24.5937, 78.9629]}
        zoom={4}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />
        
        {/* Station Telemetry Connection Polylines */}
        {connections.map((coords, i) => (
          <Polyline
            key={i}
            positions={coords}
            pathOptions={{
              color: '#00C2D1',
              weight: 1.5,
              opacity: 0.4,
              dashArray: '4, 8',
            }}
          />
        ))}

        {/* Station Markers & Pulsing Auras */}
        {markers.map((m) => (
          <React.Fragment key={m.id}>
            {/* Outer Pulsing Aura for Active/High Risk Stations */}
            <CircleMarker
              center={m.pos}
              radius={m.status === 'High Risk' ? 16 : 12}
              pathOptions={{
                color: m.color,
                fillColor: m.color,
                fillOpacity: 0.18,
                stroke: false,
              }}
            />
            {/* Main Core Marker */}
            <CircleMarker
              center={m.pos}
              radius={7}
              pathOptions={{
                color: '#ffffff',
                fillColor: m.color,
                fillOpacity: 0.95,
                weight: 2,
              }}
            >
              <Popup>
                <div className="p-2 min-w-[220px] font-sans">
                  <div className="flex items-center justify-between gap-2 border-b border-slate-700/80 pb-1.5 mb-2">
                    <div>
                      <span className="text-[9px] uppercase font-bold text-slate-400 font-display block">{m.village}</span>
                      <h5 className="font-display font-bold text-sm text-white">{m.name}</h5>
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full" style={{ backgroundColor: `${m.color}20`, color: m.color, border: `1px solid ${m.color}40` }}>{m.status}</span>
                  </div>
                  
                  <div className="space-y-1 text-[11px] text-slate-200">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Water Quality:</span>
                      <span className="font-bold text-white">{m.quality}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Contamination Risk:</span>
                      <span className="font-bold" style={{ color: m.color }}>{m.risk}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Impacted Population:</span>
                      <span className="font-bold text-cyan-400 font-mono">{m.population}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Primary Outbreak Risk:</span>
                      <span className="font-semibold text-amber-400">{m.disease}</span>
                    </div>
                  </div>

                  <div className="mt-2 pt-1.5 border-t border-slate-800 text-[9px] text-slate-400 font-mono text-right">
                    Last Updated: {m.updated}
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          </React.Fragment>
        ))}
      </MapContainer>
    </div>
  );
}
