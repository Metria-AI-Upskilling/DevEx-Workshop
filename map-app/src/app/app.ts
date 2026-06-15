import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MapComponent } from './map/map.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  imports: [SidebarComponent, MapComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-col h-dvh' },
})
export class App {}
