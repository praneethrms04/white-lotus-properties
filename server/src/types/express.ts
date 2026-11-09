import type { Request } from 'express';

export type TypedRequest<
  TBody = unknown,
  TQuery = unknown,
  TParams = Record<string, string>,
> = Request<TParams, unknown, TBody, TQuery>;
