import {
  CategoriesQueryOptionsType,
  Category,
  Brand,
  Size,
} from '@framework/types';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';
import { getData } from '../../../pages/api/filters';

export const fetchCategories = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { categories, brands, sizes } = await getData(_params);

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
