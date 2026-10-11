# Crud application

> author: thomas-laforge

### Run Application

```bash
npx nx serve angular-crud-application
```

### Documentation and Instruction

Challenge documentation is [here](https://angular-challenges.vercel.app/challenges/angular/5-crud/).

### Statement

In this exercise, you have a small CRUD application, which get a list of TODOS, update and delete some todos.

Currently, we have a working example but filled with lots of bad practices.

### Step 1: refactor with best practices

What you will need to do:

- Avoid any as a type. Using Interface to leverage Typescript type system prevent errors
- Use a separate service for all your http calls and use a Signal for your todoList
- Don't mutate data

```JS
// Avoid this
this.todos[todoUpdated.id - 1] = todoUpdated;

// Prefer something like this: an immutable update that keeps the original order
this.todoList.update((todos) =>
todos.map((todo) => (todo.id === todoUpdated.id ? todoUpdated : todo)),
);
```

### Step 2: Improve

- Add a Delete button: Doc of fake API
- Handle errors correctly. (Globally)
- Add a Global loading indicator. You can use MatProgressSpinnerModule

### Step 3: Maintainability!! add some test

Add 2/3 tests

### Step 4: Awesomeness!!! master your state.

- Use the component store of ngrx, ngrx/store, rxAngular, tanstack-query or ngrx/signal-store as a local state of your component.
- Have a localized Loading/Error indicator, e.g. only on the Todo being processed and disable all buttons of the processed Todo. (Hint: you will need to create an ItemComponent)
