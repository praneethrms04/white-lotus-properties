import mongoose, { Schema, type InferSchemaType, type Model } from 'mongoose';
import type { PropertyDocument } from './Property.js';

export const INQUIRY_STATUSES = ['new', 'contacted', 'closed'] as const;
export type InquiryStatus = (typeof INQUIRY_STATUSES)[number];

const inquirySchema = new Schema(
  {
    property: {
      type: Schema.Types.ObjectId,
      ref: 'Property',
      required: [true, 'Property reference is required'],
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: {
        values: INQUIRY_STATUSES,
        message: 'Status must be new, contacted, or closed',
      },
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
);

export type InquiryDocument = InferSchemaType<typeof inquirySchema> & {
  _id: mongoose.Types.ObjectId;
  property: mongoose.Types.ObjectId | PropertyDocument;
};

export const InquiryStatuses = INQUIRY_STATUSES;

const Inquiry: Model<InquiryDocument> = mongoose.model<InquiryDocument>(
  'Inquiry',
  inquirySchema
);

export default Inquiry;
