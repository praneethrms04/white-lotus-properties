import type { FilterQuery } from 'mongoose';
import mongoose from 'mongoose';
import Inquiry, { type InquiryDocument } from '../models/Inquiry.js';
import Property from '../models/Property.js';
import { AppError } from '../utils/AppError.js';
import type {
  CreateInquiryInput,
  InquiryQueryInput,
  UpdateInquiryStatusInput,
} from '../validators/inquiryValidator.js';

const PROPERTY_POPULATE = 'name location price status images';

export interface PaginatedInquiries {
  inquiries: InquiryDocument[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export async function createInquiry(input: CreateInquiryInput): Promise<InquiryDocument> {
  if (!mongoose.Types.ObjectId.isValid(input.property)) {
    throw new AppError('Invalid property ID', 400);
  }

  const propertyExists = await Property.exists({ _id: input.property });
  if (!propertyExists) {
    throw new AppError('Property not found', 404);
  }

  const inquiry = await Inquiry.create(input);
  await inquiry.populate('property', PROPERTY_POPULATE);
  return inquiry;
}

export async function listInquiries(query: InquiryQueryInput): Promise<PaginatedInquiries> {
  const { search, status, page = 1, limit = 20 } = query;
  const filter: FilterQuery<InquiryDocument> = {};

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
  }

  if (status) {
    filter.status = status;
  }

  const skip = (page - 1) * limit;

  const [inquiries, total] = await Promise.all([
    Inquiry.find(filter)
      .populate('property', PROPERTY_POPULATE)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Inquiry.countDocuments(filter),
  ]);

  return {
    inquiries,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit) || 1,
  };
}

export async function getInquiryById(id: string): Promise<InquiryDocument> {
  const inquiry = await Inquiry.findById(id).populate('property', PROPERTY_POPULATE);

  if (!inquiry) {
    throw new AppError('Inquiry not found', 404);
  }

  return inquiry;
}

export async function updateInquiryStatus(
  id: string,
  input: UpdateInquiryStatusInput
): Promise<InquiryDocument> {
  const inquiry = await Inquiry.findByIdAndUpdate(
    id,
    { status: input.status },
    { new: true, runValidators: true }
  ).populate('property', PROPERTY_POPULATE);

  if (!inquiry) {
    throw new AppError('Inquiry not found', 404);
  }

  return inquiry;
}
