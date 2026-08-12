import ms, { StringValue } from 'ms';

export function toMilliseconds(value: StringValue): number {
  return ms(value);
}

export function fromMilliseconds(value: number): string {
  return ms(value);
}
