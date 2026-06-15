import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Filter, MarkerService } from '../marker.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  readonly markerService = inject(MarkerService);
  readonly editValue = signal('');

  readonly filters: { label: string; value: Filter }[] = [
    { label: 'All', value: 'all' },
    { label: 'Favorites', value: 'favorites' },
    { label: 'Visited', value: 'visited' },
  ];

  startEditing(id: number, currentName: string): void {
    this.editValue.set(currentName);
    this.markerService.startEditing(id);
  }

  commitEdit(id: number): void {
    this.markerService.renameMarker(id, this.editValue());
    this.editValue.set('');
  }

  cancelEdit(): void {
    this.markerService.stopEditing();
    this.editValue.set('');
  }

  onEditKeydown(event: KeyboardEvent, id: number): void {
    if (event.key === 'Enter') {
      this.commitEdit(id);
    } else if (event.key === 'Escape') {
      this.cancelEdit();
    }
  }
}
