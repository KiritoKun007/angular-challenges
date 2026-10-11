import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Todo } from './todo.model';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private readonly http = inject(HttpClient);
  private readonly url = 'https://jsonplaceholder.typicode.com/todos';

  getAllTodos() {
    return this.http.get<ReadonlyArray<Todo>>(this.url);
  }

  updateTodo(todo: Todo) {
    return this.http.put<Todo>(this.url + '/' + todo.id, todo);
  }

  deleteTodo(id: number) {
    return this.http.delete<void>(this.url + '/' + id);
  }
}
