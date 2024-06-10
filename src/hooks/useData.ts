import { useQuery } from '@tanstack/react-query';
import { tableService } from '../services/table.service';
import { useEffect } from 'react';

export function useData<T>(url: string) {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['table', url],
    queryFn: () => tableService.getData<T>(url),
    enabled: !!url,
  });
  useEffect(() => {
    if (isSuccess) console.log('Data fetched successfully');
  }, [isSuccess, data]);

  return { data, isLoading, isSuccess };
}
