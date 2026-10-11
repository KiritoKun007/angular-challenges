import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { httpStatusInterceptor } from './http-status';
import { Todo } from './todo.model';

describe('Todo application', () => {
  let fixture: ComponentFixture<AppComponent>;
  let http: HttpTestingController;
  const url = 'https://jsonplaceholder.typicode.com/todos';
  const todos: ReadonlyArray<Todo> = [
    { id: 42, userId: 1, title: 'First', completed: false },
    { id: 7, userId: 2, title: 'Second', completed: true },
  ];

  function rowButtons(index: number): HTMLButtonElement[] {
    const page: HTMLElement = fixture.nativeElement;
    const row = page.querySelectorAll('app-todo-item')[index];
    return Array.from(row.querySelectorAll('button'));
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideHttpClient(withInterceptors([httpStatusInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    http = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    http.expectOne(url).flush(todos);
    fixture.detectChanges();
  });

  afterEach(() => http.verify());

  it('updates a todo without changing the original list or its order', () => {
    const original = fixture.componentInstance.store.todoList();
    rowButtons(0)[0].click();
    fixture.detectChanges();

    expect(rowButtons(0).every((button) => button.disabled)).toBe(true);
    expect(rowButtons(1).every((button) => !button.disabled)).toBe(true);

    const request = http.expectOne(url + '/42');
    expect(request.request.method).toBe('PUT');
    const updated = { ...todos[0], title: 'Updated' };
    request.flush(updated);
    fixture.detectChanges();

    expect(fixture.componentInstance.store.todoList()).toEqual([
      updated,
      todos[1],
    ]);
    expect(original).toEqual(todos);
    expect(rowButtons(0).every((button) => !button.disabled)).toBe(true);
  });

  it('deletes a todo after the server confirms success', () => {
    rowButtons(0)[1].click();
    expect(fixture.componentInstance.store.todoList()).toHaveLength(2);

    const request = http.expectOne(url + '/42');
    expect(request.request.method).toBe('DELETE');
    request.flush({});
    fixture.detectChanges();

    expect(fixture.componentInstance.store.todoList()).toEqual([todos[1]]);
    const page: HTMLElement = fixture.nativeElement;
    expect(page.querySelectorAll('app-todo-item')).toHaveLength(1);
    expect(fixture.componentInstance.httpStatus.loading()).toBe(false);
  });

  it('shows a failed delete and allows retrying it', () => {
    rowButtons(0)[1].click();
    http
      .expectOne(url + '/42')
      .flush({}, { status: 500, statusText: 'Server error' });
    fixture.detectChanges();

    const page: HTMLElement = fixture.nativeElement;
    expect(page.textContent).toContain('Could not delete this todo');
    expect(fixture.componentInstance.store.todoList()).toEqual(todos);
    expect(rowButtons(0).every((button) => !button.disabled)).toBe(true);
    expect(fixture.componentInstance.httpStatus.error()).toBeTruthy();
    expect(fixture.componentInstance.httpStatus.loading()).toBe(false);

    rowButtons(0)[1].click();
    http.expectOne(url + '/42').flush({});
    fixture.detectChanges();

    expect(fixture.componentInstance.store.todoList()).toEqual([todos[1]]);
  });
});
