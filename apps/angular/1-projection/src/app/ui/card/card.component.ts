import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  input,
  output,
  TemplateRef,
} from '@angular/core';
import { CardRowDirective } from './card-row.directive';

@Component({
  selector: 'app-card',
  template: `
    <div class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4">
      <ng-content select="app-card-image"></ng-content>

      <section>
        @for (item of items(); track item) {
          <ng-template
            [ngTemplateOutlet]="rowTemplate()"
            [ngTemplateOutletContext]="{ $implicit: item }"></ng-template>
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="add.emit()">
        Add
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
})
export class CardComponent<T extends { id: number }> {
  items = input.required<T[]>();
  add = output();

  rowTemplate = contentChild.required(CardRowDirective, { read: TemplateRef });
}
