import {Component, OnInit} from '@angular/core';
import {ConverterService} from '../services/converter.service';
import {combineLatest, Observable, Subject} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {

  tolerance = 2;

  eurMode = true;

  symbolEUR = 'euro';
  symbolUSD = 'attach_money';

  amount;
  fixedRate;

  amount$ = new Subject<number>();
  fixedRate$ = new Subject<number>();

  calculatedAmount$: Observable<number>;
  realRate$: Observable<number>;

  activeRate = 'real';

  constructor(private converterService: ConverterService) {
  }

  ngOnInit(): void {
    this.realRate$ = this.converterService.getRateValue();
    this.calculatedAmount$ = combineLatest([this.realRate$, this.amount$.pipe(startWith(NaN)), this.fixedRate$.pipe(startWith(NaN))]).pipe(
      map(([realRate, amount, fixedRate]) => this.calculate(realRate, amount, fixedRate))
    );
  }

  amountChange(event: Event): void {
    this.amount = parseFloat((event.target as HTMLInputElement).value);
    this.amount$.next(this.amount);
  }

  fixedRateChange(event: Event): void {
    this.fixedRate = parseFloat((event.target as HTMLInputElement).value);
    this.fixedRate$.next(this.fixedRate);
  }

  calculate(realRate: number, amount: number, fixedRate: number): number {
    if (!amount) {
      return;
    }

    this.activeRate = 'real';
    let result = amount * realRate;

    if (fixedRate && this.percentDiff(realRate, fixedRate) < this.tolerance) {
      this.activeRate = 'fixed';
      result = amount * fixedRate;
    }

    this.converterService.history.next({
      amount,
      calculatedAmount: result,
      realRate,
      fixedRate,
      currencyFrom: this.getCurrencyFrom(),
      currencyTo: this.getCurrencyTo(),
      activeRate: this.activeRate
    });

    return result;
  }

  percentDiff(a: number, b: number): number {
    return 100 * Math.abs((a - b) / ((a + b) / 2));
  }

  changeCurrency(event: MatSlideToggleChange): void {
    this.eurMode = event.checked;
  }

  getCurrencyFrom(): string {
    return this.eurMode ? 'EUR' : 'USD';
  }

  getCurrencyTo(): string {
    return this.eurMode ? 'USD' : 'EUR';
  }
}
