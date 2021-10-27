import { QueryOptionsType, Product } from '@framework/types';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import { useInfiniteQuery } from 'react-query';

type PaginatedProduct = {
  data: any;
  paginatorInfo: any;
};
const fetchProducts = async ({
  queryKey,
  pageParam = { page: 0, searchId: null },
}: any) => {
  const [_key, _params] = queryKey;

  const { data } = await http.get(API_ENDPOINTS.PRODUCTS, {
    params: {
      ..._params,
      page: pageParam.page,
      searchId: pageParam.searchId,
    },
  });
  return {
    data,
    paginatorInfo: {
      page: data.pagination.nextPage,
      searchId: data.pagination.searchId,
    },
  };
};

const useProductsQuery = (options: QueryOptionsType) => {
  return useInfiniteQuery<PaginatedProduct, Error>(
    [API_ENDPOINTS.PRODUCTS, options],
    fetchProducts,
    {
      getNextPageParam: ({ paginatorInfo }) => paginatorInfo,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      cacheTime: 0,
    }
  );
};

export { useProductsQuery, fetchProducts };
