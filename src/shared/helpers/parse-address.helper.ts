import { Address } from '../interfaces';

export function parseAddress({ street, suite, zipcode, city }: Address) {
  return `${street}, ${suite} - ${zipcode} ${city}`;
}
