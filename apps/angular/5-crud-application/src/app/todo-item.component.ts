import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { randText } from '@ngneat/falso';
import { TodoItemStore } from './todo-item.store';
import { Todo } from './todo.model';

@Component({
  selector: 'app-todo-item',
  imports: [MatProgressSpinnerModule],
  providers: [TodoItemStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article [attr.aria-busy]="store.loading()">
      <span>
        {{ todo().title }} ({{ todo().completed ? 'Completed' : 'Pending' }})
      </span>
      <button type="button" [disabled]="store.loading()" (click)="update()">
        Update
      </button>
      <button
        type="button"
        [disabled]="store.loading()"
        (click)="store.delete(todo().id)">
        Delete
      </button>
      @if (store.loading()) {
        <mat-spinner diameter="20" aria-label="Processing todo" />
      }
      @if (store.error(); as error) {
        <p role="alert">{{ error }}</p>
      }
    </article>
  `,
  styles: [
    `
      article {
        padding: 0.75rem;
        border-bottom: 1px solid #ddd;
      }
      button {
        margin-left: 0.5rem;
      }
      mat-spinner {
        display: inline-block;
        margin-left: 0.5rem;
      }
    `,
  ],
})
export class TodoItemComponent {
  readonly todo = input.required<Todo>();
  readonly store = inject(TodoItemStore);
  update() {
    this.store.update({ ...this.todo(), title: randText() });
  }
}
