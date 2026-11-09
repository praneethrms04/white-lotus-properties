import api from './client';

export async function fetchProperties(params = {}) {
  const response = await api.get('/properties', { params });
  return response.data;
}

export async function fetchPropertyById(id) {
  const response = await api.get(`/properties/${id}`);
  return response.data;
}

export async function createProperty(payload) {
  const response = await api.post('/properties', payload);
  return response.data;
}

export async function updateProperty(id, payload) {
  const response = await api.put(`/properties/${id}`, payload);
  return response.data;
}

export async function deleteProperty(id) {
  const response = await api.delete(`/properties/${id}`);
  return response.data;
}
