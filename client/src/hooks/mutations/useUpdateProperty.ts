import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProperty } from '../../api/properties';
import { propertyKeys } from '../../lib/queryKeys';
import type { PropertyFormValues } from '../../types';

interface UpdatePropertyVariables {
  id: string;
  payload: Partial<PropertyFormValues>;
}

export function useUpdateProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: UpdatePropertyVariables) => updateProperty(id, payload),
    onSuccess: (_response, variables) => {
      void queryClient.invalidateQueries({ queryKey: propertyKeys.lists() });
      void queryClient.invalidateQueries({ queryKey: propertyKeys.detail(variables.id) });
    },
  });
}
