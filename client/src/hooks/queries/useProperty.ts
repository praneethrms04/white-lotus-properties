import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { fetchPropertyById } from '../../api/properties';
import { propertyKeys } from '../../lib/queryKeys';
import type { ApiSuccessResponse, Property } from '../../types';

type PropertyResponse = ApiSuccessResponse<Property>;

type UsePropertyOptions = Omit<
  UseQueryOptions<PropertyResponse, Error, PropertyResponse, ReturnType<typeof propertyKeys.detail>>,
  'queryKey' | 'queryFn'
>;

export function useProperty(id: string | undefined, options?: UsePropertyOptions) {
  const { enabled, ...rest } = options ?? {};

  return useQuery({
    queryKey: propertyKeys.detail(id ?? ''),
    queryFn: () => fetchPropertyById(id as string),
    ...rest,
    enabled: Boolean(id) && (enabled ?? true),
  });
}
