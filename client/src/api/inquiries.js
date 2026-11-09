import api from './client';

export async function createInquiry(payload) {
  const response = await api.post('/inquiries', payload);
  return response.data;
}

export async function fetchInquiries() {
  const response = await api.get('/inquiries');
  return response.data;
}

export async function updateInquiryStatus(id, status) {
  const response = await api.patch(`/inquiries/${id}/status`, { status });
  return response.data;
}
