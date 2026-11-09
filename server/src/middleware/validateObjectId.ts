import type { NextFunction, Request, RequestHandler, Response } from 'express';
import mongoose from 'mongoose';

function getParamValue(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
}

export function validateObjectId(paramName = 'id'): RequestHandler {
  return (req: Request, res: Response, next: NextFunction): void => {
    const value = getParamValue(req.params[paramName]);

    if (!value || !mongoose.Types.ObjectId.isValid(value)) {
      res.status(400).json({
        success: false,
        message: `Invalid ${paramName}: must be a valid MongoDB ObjectId`,
      });
      return;
    }

    next();
  };
}
