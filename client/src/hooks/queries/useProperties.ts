import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { fetchProperties } from '../../api/properties';
import { propertyKeys } from '../../lib/queryKeys';
import type { ApiSuccessResponse, Property, PropertyFilters } from '../../types';

type PropertiesResponse = ApiSuccessResponse<Property[]>;

type UsePropertiesOptions = Omit<
  UseQueryOptions<PropertiesResponse, Error, PropertiesResponse, ReturnType<typeof propertyKeys.list>>,
  'queryKey' | 'queryFn'
>;

export function useProperties(filters: PropertyFilters = {}, options?: UsePropertiesOptions) {
  return useQuery({
    queryKey: propertyKeys.list(filters),
    queryFn: () => fetchProperties(filters),
    ...options,
  });
}
