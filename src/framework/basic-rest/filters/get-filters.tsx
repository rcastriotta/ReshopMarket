import {
  CategoriesQueryOptionsType,
  Category,
  Brand,
  Size,
} from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';

export const fetchCategories = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const {
    data: { categories, brands, sizes },
  } = await http.get(API_ENDPOINTS.CATEGORIES, { params: _params });
  return {
    categories: categories as Category[],
    itemBrands: {
      all: brands.all as Brand[],
      suggested: brands.suggested as Brand[],
    },
    itemSizes: {
      name: sizes.name,
      all: sizes.all as Size[],
      suggested: sizes.suggested as Size[],
    },
  };
};

export const useCategoriesQuery = (options: CategoriesQueryOptionsType) => {
  return useQuery<
    { categories: Category[]; itemBrands: any; itemSizes: any },
    Error
  >([API_ENDPOINTS.CATEGORIES, options], fetchCategories, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
