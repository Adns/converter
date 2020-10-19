export interface Conversion {
  amount: number;
  calculatedAmount: number;
  currencyFrom: string;
  currencyTo: string;
  realRate: number;
  fixedRate: number;
  activeRate: string;
}
