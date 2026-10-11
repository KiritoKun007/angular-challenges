import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { exhaustMap, filter, pipe } from 'rxjs';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';
import { TodosStore } from './todos.store';

interface ItemState {
  loading: boolean;
  error: string | null;
}

export const TodoItemStore = signalStore(
  withState<ItemState>({ loading: false, error: null }),

  withMethods(
    (store, api = inject(TodoService), todos = inject(TodosStore)) => ({
      update: rxMethod<Todo>(
        pipe(
          filter(() => !store.loading()),
          exhaustMap((todo) => {
            patchState(store, { loading: true, error: null });
            return api.updateTodo(todo).pipe(
              tapResponse({
                next: (updated) => todos.updateTodo(updated),
                error: () =>
                  patchState(store, {
                    error: 'Could not update this todo. Please retry.',
                  }),
                finalize: () => patchState(store, { loading: false }),
              }),
            );
          }),
        ),
      ),

      delete: rxMethod<number>(
        pipe(
          filter(() => !store.loading()),
          exhaustMap((id) => {
            patchState(store, { loading: true, error: null });
            return api.deleteTodo(id).pipe(
              tapResponse({
                next: () => todos.deleteTodo(id),
                error: () =>
                  patchState(store, {
                    error: 'Could not delete this todo. Please retry.',
                  }),
                finalize: () => patchState(store, { loading: false }),
              }),
            );
          }),
        ),
      ),
    }),
  ),
);
