export function normalizePhoneNumber(phoneNumber: string): string {
  const value = phoneNumber.trim();

  if (value.startsWith('+255')) {
    return value.slice(1);
  }

  if (value.startsWith('255')) {
    return value;
  }

  if (value.startsWith('0')) {
    return `255${value.slice(1)}`;
  }

  return value;
}
