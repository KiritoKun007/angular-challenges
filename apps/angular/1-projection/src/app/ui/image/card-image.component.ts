import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnInit,
} from '@angular/core';

@Component({
  imports: [NgOptimizedImage],
  selector: 'app-card-image',
  template: `
    <img [ngSrc]="imgSrc()" width="200" height="200" alt="" priority />
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class CardImageComponent implements OnInit {
  readonly imgSrc = input('');
  constructor() {}

  ngOnInit() {}
}
