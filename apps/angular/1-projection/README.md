# Projection

> author: thomas-laforge

### Run Application

```bash
npx nx serve angular-projection
```

### Documentation and Instruction

Challenge documentation is [here](https://angular-challenges.vercel.app/challenges/angular/1-projection/).

### Statement

You will start with a fully functional application that includes a dashboard containing a teacher card and a student card. The goal is to implement the city card.

While the application works, the developer experience is far from being optimal. Every time you need to implement a new card, you have to modify the card.component.ts. In real-life projects, this component can be shared among many applications. The goal of the challenge is to create a CardComponent that can be customized without any modifications. Once you've created this component, you can begin implementing the CityCardComponent and ensure you are not touching the CardComponent.

### Constraints

- You must refactor the CardComponent and ListItemComponent.
- The @for must be declared and remain inside the CardComponent. You might be tempted to move it to the ParentCardComponent like TeacherCardComponent.
- CardComponent should not contain any conditions.
- CSS: try to avoid using ::ng-deep. Find a better way to handle CSS styling.

### Bonus Challenges

- Use the signal API to manage your components state (documentation here)
- To reference the template, use a directive instead of magic strings (What is wrong with magic strings?)
