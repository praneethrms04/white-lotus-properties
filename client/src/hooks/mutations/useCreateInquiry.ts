import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createInquiry } from '../../api/inquiries';
import { inquiryKeys } from '../../lib/queryKeys';
import type { InquiryFormValues } from '../../types';

export function useCreateInquiry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: InquiryFormValues) => createInquiry(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: inquiryKeys.lists() });
    },
  });
}
