import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProperty } from '../../api/properties';
import { inquiryKeys } from '../../lib/queryKeys';
import { propertyKeys } from '../../lib/queryKeys';

export function useDeleteProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteProperty(id),
    onSuccess: (_response, id) => {
      void queryClient.invalidateQueries({ queryKey: propertyKeys.lists() });
      void queryClient.removeQueries({ queryKey: propertyKeys.detail(id) });
      // Property delete can orphan inquiries; refresh inquiry lists so UI shows unavailable.
      void queryClient.invalidateQueries({ queryKey: inquiryKeys.lists() });
    },
  });
}
