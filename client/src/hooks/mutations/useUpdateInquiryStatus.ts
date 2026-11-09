import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateInquiryStatus } from '../../api/inquiries';
import { inquiryKeys } from '../../lib/queryKeys';
import type { InquiryStatus } from '../../types';

interface UpdateInquiryStatusVariables {
  id: string;
  status: InquiryStatus;
}

export function useUpdateInquiryStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: UpdateInquiryStatusVariables) =>
      updateInquiryStatus(id, status),
    onSuccess: (response, variables) => {
      void queryClient.invalidateQueries({ queryKey: inquiryKeys.lists() });
      queryClient.setQueryData(inquiryKeys.detail(variables.id), response);
    },
  });
}
