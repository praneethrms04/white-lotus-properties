import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { fetchInquiries, fetchInquiryById } from '../../api/inquiries';
import { inquiryKeys } from '../../lib/queryKeys';
import type { ApiSuccessResponse, Inquiry, InquiryFilters } from '../../types';

type InquiriesResponse = ApiSuccessResponse<Inquiry[]>;
type InquiryResponse = ApiSuccessResponse<Inquiry>;

type UseInquiriesOptions = Omit<
  UseQueryOptions<InquiriesResponse, Error, InquiriesResponse, ReturnType<typeof inquiryKeys.list>>,
  'queryKey' | 'queryFn'
>;

type UseInquiryOptions = Omit<
  UseQueryOptions<InquiryResponse, Error, InquiryResponse, ReturnType<typeof inquiryKeys.detail>>,
  'queryKey' | 'queryFn'
>;

export function useInquiries(filters: InquiryFilters = {}, options?: UseInquiriesOptions) {
  return useQuery({
    queryKey: inquiryKeys.list(filters),
    queryFn: () => fetchInquiries(filters),
    ...options,
  });
}

export function useInquiry(id: string | undefined, options?: UseInquiryOptions) {
  const { enabled, ...rest } = options ?? {};

  return useQuery({
    queryKey: inquiryKeys.detail(id ?? ''),
    queryFn: () => fetchInquiryById(id as string),
    ...rest,
    enabled: Boolean(id) && (enabled ?? true),
  });
}
