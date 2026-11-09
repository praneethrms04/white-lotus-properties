import type { NextFunction, Request, RequestHandler, Response } from 'express';
import mongoose from 'mongoose';
import Inquiry from '../models/Inquiry.js';
import Property from '../models/Property.js';
import { AppError } from '../utils/AppError.js';
import type {
  CreateInquiryInput,
  UpdateInquiryStatusInput,
} from '../validators/inquiryValidator.js';

function asCreateBody(req: Request): CreateInquiryInput {
  return req.body as CreateInquiryInput;
}

function asStatusBody(req: Request): UpdateInquiryStatusInput {
  return req.body as UpdateInquiryStatusInput;
}

export const createInquiry: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const body = asCreateBody(req);
    const { property: propertyId } = body;

    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      throw new AppError('Invalid property ID', 400);
    }

    const propertyExists = await Property.exists({ _id: propertyId });
    if (!propertyExists) {
      throw new AppError('Property not found', 404);
    }

    const inquiry = await Inquiry.create(body);

    res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully',
      data: inquiry,
    });
  } catch (error: unknown) {
    next(error);
  }
};

export const getInquiries: RequestHandler = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const inquiries = await Inquiry.find()
      .populate('property', 'name location price status')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: 'Inquiries retrieved successfully',
      data: inquiries,
    });
  } catch (error: unknown) {
    next(error);
  }
};

export const updateInquiryStatus: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { status } = asStatusBody(req);

    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate('property', 'name location price status');

    if (!inquiry) {
      throw new AppError('Inquiry not found', 404);
    }

    res.status(200).json({
      success: true,
      message: 'Inquiry status updated successfully',
      data: inquiry,
    });
  } catch (error: unknown) {
    next(error);
  }
};
