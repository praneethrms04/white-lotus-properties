import type {
  ApiSuccessResponse,
  Inquiry,
  InquiryFormValues,
  InquiryStatus,
} from '../types';
import api from './client';

export async function createInquiry(
  payload: InquiryFormValues
): Promise<ApiSuccessResponse<Inquiry>> {
  const response = await api.post<ApiSuccessResponse<Inquiry>>('/inquiries', payload);
  return response.data;
}

export async function fetchInquiries(): Promise<ApiSuccessResponse<Inquiry[]>> {
  const response = await api.get<ApiSuccessResponse<Inquiry[]>>('/inquiries');
  return response.data;
}

export async function updateInquiryStatus(
  id: string,
  status: InquiryStatus
): Promise<ApiSuccessResponse<Inquiry>> {
  const response = await api.patch<ApiSuccessResponse<Inquiry>>(`/inquiries/${id}/status`, {
    status,
  });
  return response.data;
}
