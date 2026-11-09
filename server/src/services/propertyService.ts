import type { FilterQuery, SortOrder } from 'mongoose';
import Property, { type PropertyDocument } from '../models/Property.js';
import { AppError } from '../utils/AppError.js';
import type {
  CreatePropertyInput,
  PropertyQueryInput,
  UpdatePropertyInput,
} from '../validators/propertyValidator.js';

export interface PaginatedProperties {
  properties: PropertyDocument[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export async function listProperties(query: PropertyQueryInput): Promise<PaginatedProperties> {
  const {
    search,
    location,
    bedrooms,
    propertyType,
    status,
    featured,
    sort = 'newest',
    page = 1,
    limit = 12,
  } = query;

  const filter: FilterQuery<PropertyDocument> = {};

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { location: { $regex: search, $options: 'i' } },
    ];
  }

  if (location) {
    filter.location = { $regex: location, $options: 'i' };
  }

  if (bedrooms !== undefined) {
    filter.bedrooms = bedrooms;
  }

  if (propertyType) {
    filter.propertyType = { $regex: `^${propertyType}$`, $options: 'i' };
  }

  if (status) {
    filter.status = status;
  }

  if (featured !== undefined) {
    filter.featured = featured;
  }

  let sortOption: Record<string, SortOrder> = { createdAt: -1 };
  if (sort === 'price_asc') sortOption = { price: 1 };
  if (sort === 'price_desc') sortOption = { price: -1 };

  const skip = (page - 1) * limit;

  const [properties, total] = await Promise.all([
    Property.find(filter).sort(sortOption).skip(skip).limit(limit),
    Property.countDocuments(filter),
  ]);

  return {
    properties,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit) || 1,
  };
}

export async function getPropertyById(id: string): Promise<PropertyDocument> {
  const property = await Property.findById(id);

  if (!property) {
    throw new AppError('Property not found', 404);
  }

  return property;
}

export async function createProperty(input: CreatePropertyInput): Promise<PropertyDocument> {
  return Property.create(input);
}

export async function updateProperty(
  id: string,
  input: UpdatePropertyInput
): Promise<PropertyDocument> {
  const property = await Property.findByIdAndUpdate(id, input, {
    new: true,
    runValidators: true,
  });

  if (!property) {
    throw new AppError('Property not found', 404);
  }

  return property;
}

export async function deleteProperty(id: string): Promise<PropertyDocument> {
  const property = await Property.findByIdAndDelete(id);

  if (!property) {
    throw new AppError('Property not found', 404);
  }

  return property;
}
