import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './empty-state.html',
  styles: [`
    .empty-state-card { text-align: center; }
  `]
})
export class EmptyStateComponent {
  message = input<string>('Nenhuma informação encontrada.');
}
