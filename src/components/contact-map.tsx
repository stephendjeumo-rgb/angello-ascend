import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";

declare global {
  interface Window {
    initAngelloMap?: () => void;
    google?: {
      maps: {
        Map: new (element: HTMLElement, options: Record<string, unknown>) => unknown;
        Marker: new (options: Record<string, unknown>) => unknown;
      };
    };
  }
}

const schoolPosition = { lat: 4.0066, lng: 9.8149 };

export function ContactMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    const key = import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY"];
    const channel = import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_TRACKING_ID"];
    if (!key || !mapRef.current) {
      setUnavailable(true);
      return;
    }

    const renderMap = () => {
      if (!mapRef.current || !window.google?.maps) return;
      const map = new window.google.maps.Map(mapRef.current, {
        center: schoolPosition,
        zoom: 15,
        clickableIcons: false,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: true,
      });
      new window.google.maps.Marker({ map, position: schoolPosition, title: "ANGELLO School" });
    };

    if (window.google?.maps) {
      renderMap();
      return;
    }

    window.initAngelloMap = renderMap;
    const existing = document.querySelector<HTMLScriptElement>("script[data-angello-map]");
    if (existing) {
      existing.addEventListener("error", () => setUnavailable(true), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.dataset.angelloMap = "true";
    script.async = true;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}&loading=async&callback=initAngelloMap&channel=${encodeURIComponent(channel ?? "angello-school")}`;
    script.onerror = () => setUnavailable(true);
    document.head.appendChild(script);

    return () => {
      delete window.initAngelloMap;
    };
  }, []);

  if (unavailable) {
    return <div className="grid min-h-96 place-items-center bg-muted p-8 text-center"><div><MapPin className="mx-auto h-9 w-9 text-primary"/><p className="mt-3 font-semibold">Japoma, Douala, Cameroun</p></div></div>;
  }

  return <div ref={mapRef} className="min-h-96 w-full" aria-label="Carte indiquant ANGELLO School à Japoma" />;
}