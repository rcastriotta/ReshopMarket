import { Product } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';
import { getData } from '../../../pages/api/items/[id]';
export const fetchProduct = async (_slug: string) => {
  const data = await getData(_slug);
  return data as Product;
};
export const useProductQuery = (slug: string) => {
  return useQuery<Product, Error>([API_ENDPOINTS.PRODUCT, slug], () =>
    fetchProduct(slug)
  );
};
