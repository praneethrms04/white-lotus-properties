import type { Request } from 'express';

export function getParamId(req: Request, paramName = 'id'): string {
  const value = req.params[paramName];
  if (Array.isArray(value)) {
    return value[0] ?? '';
  }
  return value ?? '';
}
