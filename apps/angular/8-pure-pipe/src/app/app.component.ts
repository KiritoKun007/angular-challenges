import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeavyComputationPipe } from './heavy-computation.pipe';

@Component({
  selector: 'app-root',
  imports: [HeavyComputationPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @for (person of persons; track person) {
      {{ person | heavyComputation: $index }}
    }
  `,
})
export class AppComponent {
  persons = ['toto', 'jack', 'ashish', 'sweta', 'ashu', 'valu'];
}
