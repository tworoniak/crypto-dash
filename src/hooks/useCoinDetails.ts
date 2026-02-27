import { useQuery } from '@tanstack/react-query';
import { fetchCoinDetails } from '../api/coingecko';

export function useCoinDetails(id: string) {
  return useQuery({
    queryKey: ['coin', id],
    queryFn: () => fetchCoinDetails(id),
    enabled: Boolean(id),
    staleTime: 60_000,
  });
}
