import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardRowDirective } from '../../ui/card/card-row.directive';
import { CardComponent } from '../../ui/card/card.component';
import { CardImageComponent } from '../../ui/image/card-image.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card [items]="cities()" (add)="addCity()" class="bg-light-purple">
      <app-card-image imgSrc="assets/img/city.png" />
      <ng-template [cardRow]="cities()" let-city>
        <app-list-item (delete)="deleteCity(city.id)">
          {{ city.name }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      ::ng-deep .bg-light-purple {
        background-color: rgba(0, 0, 250, 0.1);
      }
    `,
  ],
  imports: [
    CardComponent,
    CardImageComponent,
    ListItemComponent,
    CardRowDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent implements OnInit {
  private store = inject(CityStore);
  private http = inject(FakeHttpService);

  cities = this.store.cities;

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
  }

  addCity() {
    this.store.addOne(randomCity());
  }

  deleteCity(id: number) {
    this.store.deleteOne(id);
  }
}
