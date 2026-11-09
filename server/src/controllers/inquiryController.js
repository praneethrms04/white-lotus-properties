import mongoose from 'mongoose';
import Inquiry from '../models/Inquiry.js';
import Property from '../models/Property.js';
import { AppError } from '../utils/AppError.js';

export async function createInquiry(req, res, next) {
  try {
    const { property: propertyId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      throw new AppError('Invalid property ID', 400);
    }

    const propertyExists = await Property.exists({ _id: propertyId });
    if (!propertyExists) {
      throw new AppError('Property not found', 404);
    }

    const inquiry = await Inquiry.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully',
      data: inquiry,
    });
  } catch (error) {
    next(error);
  }
}

export async function getInquiries(req, res, next) {
  try {
    const inquiries = await Inquiry.find()
      .populate('property', 'name location price status')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: 'Inquiries retrieved successfully',
      data: inquiries,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateInquiryStatus(req, res, next) {
  try {
    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
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
  } catch (error) {
    next(error);
  }
}
