import type { NextFunction, Request, RequestHandler, Response } from 'express';
import type { FilterQuery, SortOrder } from 'mongoose';
import Property, { type PropertyDocument } from '../models/Property.js';
import { AppError } from '../utils/AppError.js';
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
    const { location, bedrooms, sort = 'newest', page = 1, limit = 12 } = asQuery(req);

    const filter: FilterQuery<PropertyDocument> = {};
    if (location) {
      filter.location = { $regex: location, $options: 'i' };
    }
    if (bedrooms !== undefined) {
      filter.bedrooms = bedrooms;
    }

    let sortOption: Record<string, SortOrder> = { createdAt: -1 };
    if (sort === 'price_asc') sortOption = { price: 1 };
    if (sort === 'price_desc') sortOption = { price: -1 };

    const skip = (page - 1) * limit;

    const [properties, total] = await Promise.all([
      Property.find(filter).sort(sortOption).skip(skip).limit(limit),
      Property.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      message: 'Properties retrieved successfully',
      data: properties,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
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
    const property = await Property.findById(req.params.id);

    if (!property) {
      throw new AppError('Property not found', 404);
    }

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
    const property = await Property.create(asCreateBody(req));

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
    const property = await Property.findByIdAndUpdate(req.params.id, asUpdateBody(req), {
      new: true,
      runValidators: true,
    });

    if (!property) {
      throw new AppError('Property not found', 404);
    }

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
    const property = await Property.findByIdAndDelete(req.params.id);

    if (!property) {
      throw new AppError('Property not found', 404);
    }

    res.status(200).json({
      success: true,
      message: 'Property deleted successfully',
      data: property,
    });
  } catch (error: unknown) {
    next(error);
  }
};
