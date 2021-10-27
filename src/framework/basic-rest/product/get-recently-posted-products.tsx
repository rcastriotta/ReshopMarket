import { Product } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';
export const fetchRecentlyPosted = async () => {
  const { data } = await http.get(API_ENDPOINTS.PRODUCTS, {
    params: {
      sort_by: 2,
    },
  });
  return data.itemsList as Product[];
};
export const useRecentlyPostedProductsQuery = () => {
  return useQuery<Product[], Error>(
    [API_ENDPOINTS.PRODUCTS],
    fetchRecentlyPosted,
    { refetchOnMount: false, refetchOnWindowFocus: false }
  );
};
