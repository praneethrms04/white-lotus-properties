import type { ApiSuccessResponse, Property, PropertyFilters, PropertyFormValues } from '../types';
import api from './client';

export async function fetchProperties(
  params: PropertyFilters = {}
): Promise<ApiSuccessResponse<Property[]>> {
  const response = await api.get<ApiSuccessResponse<Property[]>>('/properties', { params });
  return response.data;
}

export async function fetchPropertyById(id: string): Promise<ApiSuccessResponse<Property>> {
  const response = await api.get<ApiSuccessResponse<Property>>(`/properties/${id}`);
  return response.data;
}

export async function createProperty(
  payload: PropertyFormValues
): Promise<ApiSuccessResponse<Property>> {
  const response = await api.post<ApiSuccessResponse<Property>>('/properties', payload);
  return response.data;
}

export async function updateProperty(
  id: string,
  payload: Partial<PropertyFormValues>
): Promise<ApiSuccessResponse<Property>> {
  const response = await api.put<ApiSuccessResponse<Property>>(`/properties/${id}`, payload);
  return response.data;
}

export async function deleteProperty(id: string): Promise<ApiSuccessResponse<Property>> {
  const response = await api.delete<ApiSuccessResponse<Property>>(`/properties/${id}`);
  return response.data;
}
