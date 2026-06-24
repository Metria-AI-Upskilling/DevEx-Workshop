import { ChangeDetectionStrategy, Component, ElementRef, afterNextRender, inject, viewChild } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from '../marker.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex-1 min-h-0' },
})
export class MapComponent {
  private readonly markerService = inject(MarkerService);
  private readonly mapEl = viewChild.required<ElementRef<HTMLDivElement>>('mapEl');

  constructor() {
    afterNextRender(() => {
      const map = L.map(this.mapEl().nativeElement).setView([63.8258, 20.2630], 13);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      this.markerService.registerMap(map);

      map.on('click', (e: L.LeafletMouseEvent) => {
        this.markerService.addMarker(e.latlng);
      });
    });
  }
}
