import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProperty } from '../../api/properties';
import { propertyKeys } from '../../lib/queryKeys';
import type { PropertyFormValues } from '../../types';

export function useCreateProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: PropertyFormValues) => createProperty(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: propertyKeys.lists() });
    },
  });
}
