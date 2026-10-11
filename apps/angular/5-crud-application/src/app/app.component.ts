import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpStatus } from './http-status';
import { TodoItemComponent } from './todo-item.component';
import { TodosStore } from './todos.store';

@Component({
  selector: 'app-root',
  imports: [TodoItemComponent, MatProgressSpinnerModule],
  providers: [TodosStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1>Todos</h1>
    @if (httpStatus.loading()) {
      <mat-spinner diameter="32" aria-label="Loading requests" />
    }
    @if (httpStatus.error(); as error) {
      <div role="alert">
        {{ error }}
        <button type="button" (click)="httpStatus.error.set(null)">
          Dismiss
        </button>
      </div>
    }
    @if (store.error(); as error) {
      <p role="alert">{{ error }}</p>
      <button type="button" [disabled]="store.loading()" (click)="store.load()">
        Retry
      </button>
    }
    @for (todo of store.todoList(); track todo.id) {
      <app-todo-item [todo]="todo" />
    } @empty {
      @if (!store.loading() && !store.error()) {
        <p>No todos.</p>
      }
    }
  `,
})
export class AppComponent implements OnInit {
  readonly store = inject(TodosStore);
  readonly httpStatus = inject(HttpStatus);
  ngOnInit() {
    this.store.load();
  }
}
