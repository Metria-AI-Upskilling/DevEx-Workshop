import { Injectable, computed, signal } from '@angular/core';
import * as L from 'leaflet';

export type MarkerCategory = 'none' | 'favorites' | 'visited';
export type Filter = 'all' | 'favorites' | 'visited';

export interface Marker {
  id: number;
  name: string;
  defaultName: string;
  lat: number;
  lng: number;
  category: MarkerCategory;
  leafletMarker: L.Marker;
}

const CATEGORY_CYCLE: Record<MarkerCategory, MarkerCategory> = {
  none: 'favorites',
  favorites: 'visited',
  visited: 'none',
};

@Injectable({ providedIn: 'root' })
export class MarkerService {
  private nextId = 1;
  private leafletMap: L.Map | null = null;

  readonly markers = signal<Marker[]>([]);
  readonly editingMarkerId = signal<number | null>(null);
  readonly currentFilter = signal<Filter>('all');

  readonly filteredMarkers = computed(() => {
    const filter = this.currentFilter();
    const all = this.markers();
    if (filter === 'all') return all;
    return all.filter((m) => m.category === filter);
  });

  registerMap(map: L.Map): void {
    this.leafletMap = map;
  }

  addMarker(latlng: L.LatLng): Marker {
    const icon = L.divIcon({
      className: 'custom-marker',
      html: '<div class="marker-pin"></div>',
      iconSize: [20, 28],
      iconAnchor: [10, 28],
    });

    const id = this.nextId++;
    const defaultName = `Marker ${id}`;

    const leafletMarker = L.marker([latlng.lat, latlng.lng], { icon })
      .addTo(this.leafletMap!)
      .bindPopup(escapeHtml(defaultName));

    const marker: Marker = { id, name: defaultName, defaultName, lat: latlng.lat, lng: latlng.lng, category: 'none', leafletMarker };

    this.markers.update((ms) => [...ms, marker]);
    return marker;
  }

  deleteMarker(id: number): void {
    const marker = this.markers().find((m) => m.id === id);
    if (marker) marker.leafletMarker.remove();
    this.markers.update((ms) => ms.filter((m) => m.id !== id));
    if (this.editingMarkerId() === id) this.editingMarkerId.set(null);
  }

  focusMarker(id: number): void {
    const marker = this.markers().find((m) => m.id === id);
    if (!marker || !this.leafletMap) return;
    this.leafletMap.setView([marker.lat, marker.lng], 15);
    marker.leafletMarker.openPopup();
  }

  toggleCategory(id: number): void {
    this.markers.update((ms) =>
      ms.map((m) => (m.id === id ? { ...m, category: CATEGORY_CYCLE[m.category] } : m)),
    );
  }

  startEditing(id: number): void {
    this.editingMarkerId.set(id);
  }

  renameMarker(id: number, value: string): void {
    this.markers.update((ms) =>
      ms.map((m) => {
        if (m.id !== id) return m;
        const name = value.trim() || m.defaultName;
        m.leafletMarker.setPopupContent(escapeHtml(name));
        return { ...m, name };
      }),
    );
    this.editingMarkerId.set(null);
  }

  stopEditing(): void {
    this.editingMarkerId.set(null);
  }

  setFilter(filter: Filter): void {
    this.currentFilter.set(filter);
  }
}

function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
