const URL_PATTERN = /^https?:\/\/.+/i;

export function isValidUrl(value: string): boolean {
  if (!URL_PATTERN.test(value)) {
    return false;
  }

  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
