import {Component, OnInit} from '@angular/core';
import {ConverterService} from '../services/converter.service';
import {Observable} from 'rxjs';
import {Conversion} from '../model/conversion';
import {scan} from 'rxjs/operators';

@Component({
  selector: 'app-converter-history',
  templateUrl: './converter-history.component.html',
  styleUrls: ['./converter-history.component.scss']
})
export class ConverterHistoryComponent implements OnInit {

  historyConversion$: Observable<Conversion[]>;
  private MAX_HISTORY = 5;

  constructor(private converterService: ConverterService) {
  }

  ngOnInit(): void {
    this.historyConversion$ = this.converterService.history
      .pipe(scan((history, conversion) => {
        if (history.length >= this.MAX_HISTORY) {
          history.pop();
        }
        history.unshift(conversion);
        return history;
      }, []));
  }

}
