import mongoose, { Schema, type InferSchemaType, type Model } from 'mongoose';

export const PROPERTY_STATUSES = ['available', 'sold', 'reserved'] as const;
export type PropertyStatus = (typeof PROPERTY_STATUSES)[number];

const propertySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Property name is required'],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be a positive number'],
    },
    area: {
      type: Number,
      required: [true, 'Area is required'],
      min: [0, 'Area must be a positive number'],
    },
    bedrooms: {
      type: Number,
      required: [true, 'Bedrooms is required'],
      min: [0, 'Bedrooms cannot be negative'],
    },
    bathrooms: {
      type: Number,
      default: 0,
      min: [0, 'Bathrooms cannot be negative'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    shortDescription: {
      type: String,
      trim: true,
      default: '',
    },
    images: {
      type: [String],
      default: [],
    },
    amenities: {
      type: [String],
      default: [],
    },
    propertyType: {
      type: String,
      trim: true,
      default: 'Apartment',
    },
    status: {
      type: String,
      enum: {
        values: PROPERTY_STATUSES,
        message: 'Status must be available, sold, or reserved',
      },
      default: 'available',
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export type PropertyDocument = InferSchemaType<typeof propertySchema> & {
  _id: mongoose.Types.ObjectId;
};

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

propertySchema.pre('validate', function generateSlug(next) {
  if (!this.slug && this.name) {
    this.slug = slugify(this.name);
  }
  next();
});

export const PropertyStatuses = PROPERTY_STATUSES;

const Property: Model<PropertyDocument> = mongoose.model<PropertyDocument>(
  'Property',
  propertySchema
);

export default Property;
