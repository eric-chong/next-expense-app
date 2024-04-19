import { Decimal } from 'decimal.js';

export const dollarToCents = (dollar: number): number =>
  Decimal.mul(dollar, 100).toNumber();

export const centsToDollar = (cents: number): number =>
  Decimal.div(cents, 100).toNumber();
