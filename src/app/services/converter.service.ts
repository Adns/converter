import {Injectable} from '@angular/core';
import {Observable, ReplaySubject, timer} from 'rxjs';
import {map, scan, share} from 'rxjs/operators';
import {Conversion} from '../model/conversion';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {

  history = new ReplaySubject<Conversion>(5);
  rateValue$: Observable<number>;
  private INIT_RATE_VALUE = 1.1;
  private MIN_RATE = -5;
  private MAX_RATE = 5;

  constructor() {
    this.rateValue$ = timer(0, 3000)
      .pipe(
        map(v => !v ? 0 : this.getVariation()),
        scan((acc, curr) => acc + curr, this.INIT_RATE_VALUE),
        share()
      );
  }

  getRateValue(): Observable<number> {
    return this.rateValue$;
  }

  private getVariation(): number {
    return (Math.floor(Math.random() * (this.MAX_RATE - this.MIN_RATE + 1)) + this.MIN_RATE) / 100;
  }
}
