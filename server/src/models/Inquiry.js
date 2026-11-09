import mongoose from 'mongoose';

const INQUIRY_STATUSES = ['new', 'contacted', 'closed'];

const inquirySchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
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

export const InquiryStatuses = INQUIRY_STATUSES;
export default mongoose.model('Inquiry', inquirySchema);
