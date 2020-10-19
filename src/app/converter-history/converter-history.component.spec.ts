import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ConverterHistoryComponent} from './converter-history.component';

describe('ConverterHistoryComponent', () => {
  let component: ConverterHistoryComponent;
  let fixture: ComponentFixture<ConverterHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConverterHistoryComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConverterHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
