"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  value: string;
  onChange: (location: string, lat: number, lng: number) => void;
};

export default function MapPicker({ value, onChange }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const [search, setSearch] = useState("");
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !mapRef.current) return;
    if (mapInstanceRef.current) return; // ไม่ init ซ้ำ

    // โหลด Leaflet CSS
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    // โหลด Leaflet JS
    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.onload = () => {
      const L = (window as any).L;
      const map = L.map(mapRef.current).setView([13.7563, 100.5018], 12);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      const marker = L.marker([13.7563, 100.5018], { draggable: true }).addTo(map);
      markerRef.current = marker;
      mapInstanceRef.current = map;

      const updatePosition = (lat: number, lng: number) => {
        setCoords({ lat, lng });
        onChange(`${lat.toFixed(6)},${lng.toFixed(6)}`, lat, lng);
      };

      marker.on("dragend", () => {
        const pos = marker.getLatLng();
        updatePosition(pos.lat, pos.lng);
      });

      map.on("click", (e: any) => {
        marker.setLatLng(e.latlng);
        updatePosition(e.latlng.lat, e.latlng.lng);
      });
    };
    document.head.appendChild(script);

    return () => {};
  }, [mounted]);

  const handleSearch = async () => {
    if (!search.trim()) return;
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(search)}&format=json&limit=1`
      );
      const data = await res.json();
      if (data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);
        const L = (window as any).L;
        if (mapInstanceRef.current && markerRef.current) {
          mapInstanceRef.current.setView([lat, lng], 15);
          markerRef.current.setLatLng([lat, lng]);
          setCoords({ lat, lng });
          onChange(`${lat.toFixed(6)},${lng.toFixed(6)}`, lat, lng);
        }
      }
    } catch {}
  };

  if (!mounted) return null;

  return (
    <div className="space-y-3">
      {/* Search bar */}
      <div className="flex gap-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="ค้นหาสถานที่... เช่น มจพ, สยามพารากอน"
          className="flex-1 h-[36px] px-3 border border-gray-300 bg-white rounded-lg text-sm placeholder:text-xs placeholder:text-gray-400 outline-none focus:ring-1 focus:ring-[#1B2144]"
        />
        <button onClick={handleSearch}
          className="px-4 h-[36px] bg-[#1B2144] text-white text-sm rounded-lg hover:bg-[#111830] transition">
          ค้นหา
        </button>
      </div>

      {/* Map */}
      <div ref={mapRef} className="w-full h-[300px] rounded-xl overflow-hidden border border-gray-300 z-0" />

      {/* Coords display */}
      {coords && (
        <p className="text-xs text-gray-500">
          📍 ตำแหน่งที่เลือก: {coords.lat.toFixed(6)}, {coords.lng.toFixed(6)}
        </p>
      )}
      {value && (
        <p className="text-xs text-gray-400">ค่าที่จะบันทึก: {value}</p>
      )}
    </div>
  );
}