import Property from '../models/Property.js';
import { AppError } from '../utils/AppError.js';

export async function getProperties(req, res, next) {
  try {
    const { location, bedrooms, sort = 'newest', page = 1, limit = 12 } = req.query;

    const filter = {};
    if (location) {
      filter.location = { $regex: location, $options: 'i' };
    }
    if (bedrooms !== undefined) {
      filter.bedrooms = bedrooms;
    }

    let sortOption = { createdAt: -1 };
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
  } catch (error) {
    next(error);
  }
}

export async function getPropertyById(req, res, next) {
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
  } catch (error) {
    next(error);
  }
}

export async function createProperty(req, res, next) {
  try {
    const property = await Property.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Property created successfully',
      data: property,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateProperty(req, res, next) {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, {
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
  } catch (error) {
    next(error);
  }
}

export async function deleteProperty(req, res, next) {
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
  } catch (error) {
    next(error);
  }
}
