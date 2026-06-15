import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Filter, MarkerService } from '../marker.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  readonly markerService = inject(MarkerService);
  readonly inputValue = signal('');

  readonly filters: { label: string; value: Filter }[] = [
    { label: 'All', value: 'all' },
    { label: 'Favorites', value: 'favorites' },
    { label: 'Visited', value: 'visited' },
  ];

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.inputValue.set(value);
    this.markerService.renamePending(value);
  }

  onEnter(): void {
    this.markerService.clearSelection();
    this.inputValue.set('');
  }

  clearSelection(): void {
    this.markerService.clearSelection();
    this.inputValue.set('');
  }
}
