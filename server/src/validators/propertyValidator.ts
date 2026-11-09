import { z } from 'zod';

export const createPropertySchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  slug: z.string().trim().min(1).optional(),
  location: z.string().trim().min(1, 'Location is required'),
  price: z.coerce.number().positive('Price must be a positive number'),
  area: z.coerce.number().positive('Area must be a positive number'),
  bedrooms: z.coerce.number().int().min(0, 'Bedrooms cannot be negative'),
  bathrooms: z.coerce.number().int().min(0).optional(),
  description: z.string().trim().min(1, 'Description is required'),
  shortDescription: z.string().trim().optional(),
  images: z.array(z.string().url('Each image must be a valid URL')).optional(),
  amenities: z.array(z.string().trim()).optional(),
  propertyType: z.string().trim().optional(),
  status: z.enum(['available', 'sold', 'reserved']).optional(),
  featured: z.boolean().optional(),
});

export const updatePropertySchema = createPropertySchema.partial();

export const propertyQuerySchema = z.object({
  location: z.string().trim().optional(),
  bedrooms: z.coerce.number().int().min(0).optional(),
  sort: z.enum(['price_asc', 'price_desc', 'newest']).optional(),
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(50).optional().default(12),
});

export type CreatePropertyInput = z.infer<typeof createPropertySchema>;
export type UpdatePropertyInput = z.infer<typeof updatePropertySchema>;
export type PropertyQueryInput = z.infer<typeof propertyQuerySchema>;
