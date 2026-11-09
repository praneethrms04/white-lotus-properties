import type { NextFunction, Request, RequestHandler, Response } from 'express';
import * as propertyService from '../services/propertyService.js';
import { getParamId } from '../utils/request.js';
import type {
  CreatePropertyInput,
  PropertyQueryInput,
  UpdatePropertyInput,
} from '../validators/propertyValidator.js';

function asQuery(req: Request): PropertyQueryInput {
  return req.query as unknown as PropertyQueryInput;
}

function asCreateBody(req: Request): CreatePropertyInput {
  return req.body as CreatePropertyInput;
}

function asUpdateBody(req: Request): UpdatePropertyInput {
  return req.body as UpdatePropertyInput;
}

export const getProperties: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await propertyService.listProperties(asQuery(req));

    res.status(200).json({
      success: true,
      message: 'Properties retrieved successfully',
      data: result.properties,
      meta: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: result.totalPages,
      },
    });
  } catch (error: unknown) {
    next(error);
  }
};

export const getPropertyById: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const property = await propertyService.getPropertyById(getParamId(req));

    res.status(200).json({
      success: true,
      message: 'Property retrieved successfully',
      data: property,
    });
  } catch (error: unknown) {
    next(error);
  }
};

export const createProperty: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const property = await propertyService.createProperty(asCreateBody(req));

    res.status(201).json({
      success: true,
      message: 'Property created successfully',
      data: property,
    });
  } catch (error: unknown) {
    next(error);
  }
};

export const updateProperty: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const property = await propertyService.updateProperty(getParamId(req), asUpdateBody(req));

    res.status(200).json({
      success: true,
      message: 'Property updated successfully',
      data: property,
    });
  } catch (error: unknown) {
    next(error);
  }
};

export const deleteProperty: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const property = await propertyService.deleteProperty(getParamId(req));

    res.status(200).json({
      success: true,
      message: 'Property deleted successfully',
      data: property,
    });
  } catch (error: unknown) {
    next(error);
  }
};
