import { useQuery } from '@tanstack/react-query';
import { apiGet } from '@/services/api';

/**
 * Hook to fetch all users (admin endpoint)
 * 
 * Usage:
 * const { data: users, isLoading, error } = useUsers();
 */
export const useUsers = (options = {}) => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await apiGet('/admin/users');
      return response || [];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    ...options,
  });
};

export default useUsers;
