import { z } from 'zod';

export const createInquirySchema = z.object({
  property: z.string().min(1, 'Property ID is required'),
  name: z.string().trim().min(1, 'Name is required'),
  email: z.string().trim().email('Valid email is required'),
  phone: z
    .string()
    .trim()
    .min(7, 'Valid phone is required')
    .max(20, 'Phone number is too long'),
  message: z.string().trim().min(1, 'Message is required').max(2000, 'Message is too long'),
});

export const updateInquiryStatusSchema = z.object({
  status: z.enum(['new', 'contacted', 'closed'], {
    errorMap: () => ({ message: 'Status must be new, contacted, or closed' }),
  }),
});

export const inquiryQuerySchema = z.object({
  search: z.string().trim().optional(),
  status: z.enum(['new', 'contacted', 'closed']).optional(),
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(50).optional().default(20),
});

export type CreateInquiryInput = z.infer<typeof createInquirySchema>;
export type UpdateInquiryStatusInput = z.infer<typeof updateInquiryStatusSchema>;
export type InquiryQueryInput = z.infer<typeof inquiryQuerySchema>;
