import { z } from 'zod';

export const createInquirySchema = z.object({
  property: z.string().min(1, 'Property ID is required'),
  name: z.string().trim().min(1, 'Name is required'),
  email: z.string().trim().email('Valid email is required'),
  phone: z.string().trim().min(7, 'Valid phone is required'),
  message: z.string().trim().min(1, 'Message is required'),
});

export const updateInquiryStatusSchema = z.object({
  status: z.enum(['new', 'contacted', 'closed'], {
    errorMap: () => ({ message: 'Status must be new, contacted, or closed' }),
  }),
});
