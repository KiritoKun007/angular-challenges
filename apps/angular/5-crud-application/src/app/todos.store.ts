import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { exhaustMap, pipe } from 'rxjs';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';

interface TodosState {
  todoList: ReadonlyArray<Todo>;
  loading: boolean;
  error: string | null;
}

const initialState: TodosState = { todoList: [], loading: false, error: null };

export const TodosStore = signalStore(
  withState(initialState),

  withMethods((store, api = inject(TodoService)) => ({
    updateTodo(updated: Todo) {
      patchState(store, {
        todoList: store
          .todoList()
          .map((todo) => (todo.id === updated.id ? updated : todo)),
      });
    },

    deleteTodo(id: number) {
      patchState(store, {
        todoList: store.todoList().filter((todo) => todo.id !== id),
      });
    },

    load: rxMethod<void>(
      pipe(
        exhaustMap(() => {
          patchState(store, { loading: true, error: null });
          return api.getAllTodos().pipe(
            tapResponse({
              next: (todoList) => patchState(store, { todoList }),
              error: () =>
                patchState(store, {
                  error: 'Could not load todos. Please retry.',
                }),
              finalize: () => patchState(store, { loading: false }),
            }),
          );
        }),
      ),
    ),
  })),
);
