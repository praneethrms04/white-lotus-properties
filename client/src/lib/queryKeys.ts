import type { InquiryFilters, PropertyFilters } from '../types';

export const propertyKeys = {
  all: ['properties'] as const,
  lists: () => [...propertyKeys.all, 'list'] as const,
  list: (filters: PropertyFilters = {}) => [...propertyKeys.lists(), filters] as const,
  details: () => [...propertyKeys.all, 'detail'] as const,
  detail: (id: string) => [...propertyKeys.details(), id] as const,
};

export const inquiryKeys = {
  all: ['inquiries'] as const,
  lists: () => [...inquiryKeys.all, 'list'] as const,
  list: (filters: InquiryFilters = {}) => [...inquiryKeys.lists(), filters] as const,
  details: () => [...inquiryKeys.all, 'detail'] as const,
  detail: (id: string) => [...inquiryKeys.details(), id] as const,
};
