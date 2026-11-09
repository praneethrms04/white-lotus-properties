import type { Property, PropertyStatus } from './property';

export type InquiryStatus = 'new' | 'contacted' | 'closed';

export interface InquiryPropertySummary {
  _id: string;
  name: string;
  location: string;
  price: number;
  status: PropertyStatus;
}

export interface Inquiry {
  _id: string;
  property: string | InquiryPropertySummary | Property;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: InquiryStatus;
  createdAt: string;
  updatedAt: string;
}

export interface InquiryFormValues {
  property: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}
