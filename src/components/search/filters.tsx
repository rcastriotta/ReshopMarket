import { CategoryFilter } from './category-filter';
import { BrandFilter } from './brand-filter';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { ConditionFilter } from '@components/search/condition-filter';
import { useCategoriesQuery } from '@framework/filters/get-filters';
import { SizeFilter } from './size-filter';
import { PriceFilter } from './price-filter';
import CategoryListCardLoader from '@components/ui/loaders/category-list-card-loader';
import Alert from '@components/ui/alert';
import Heading from '@components/ui/heading';
import { FilteredItem } from './filtered-item';
import isEmpty from 'lodash/isEmpty';
import { useEffect, useState } from 'react';

const conditions = [
  { name: 'Good', id: 3 },
  { name: 'New', id: 1 },
  { name: 'Like New', id: 2 },
  { name: 'Fair', id: 4 },
  { name: 'Poor', id: 5 },
];

const prices = [
  { name: 'Any', id: 0 },
  { name: 'Under $25', id: 1, maxPrice: '2500' },
  { name: '$25 to $50', id: 2, minPrice: '2500', maxPrice: '5000' },
  { name: '$50 to $100', id: 3, minPrice: '5000', maxPrice: '10000' },
  { name: '$100 to $200', id: 4, minPrice: '10000', maxPrice: '20000' },
];

export const ShopFilters = () => {
  const router = useRouter();
  const { pathname, query } = router;
  const { t } = useTranslation('common');
  const [filterItems, setFilterItems] = useState<any>([]);
  const { data, isLoading, error } = useCategoriesQuery({
    category: query.category as string,
  });

  useEffect(() => {
    if (!data) return;
    const items: any = [];
    Object.keys(query).forEach((k: any) => {
      const values = (query[k] as string).split(',');
      let d: any;
      switch (k) {
        case 'category':
          d = data?.categories;
          break;
        case 'size':
          d = data?.itemSizes.all;
          break;
        case 'brand':
          d = data?.itemBrands.all;
          break;
        case 'condition':
          d = conditions;
          break;
      }
      if (!d) return;
      values.forEach((v) => {
        const name = d.find((x: any) => x.id === +v)?.name;
        if (!name) return;
        items.push({
          id: v,
          name,
          filterKey: k,
        });
      });
    });
    setFilterItems(items);
  }, [data, query]);

  if (isLoading) {
    return (
      <div className="block">
        <div className="w-full h-full mt-8">
          <CategoryListCardLoader uniqueKey="category-list-card-loader" />
          <CategoryListCardLoader uniqueKey="category-list-card-loader" />
          <CategoryListCardLoader uniqueKey="category-list-card-loader" />
          <CategoryListCardLoader uniqueKey="category-list-card-loader" />
          <CategoryListCardLoader uniqueKey="category-list-card-loader" />
        </div>
      </div>
    );
  }
  if (error) return <Alert message={error.message} />;

  const clearFilters = () => {
    router.push({
      pathname,
      query: {
        ...(!!query.keyword ? { keyword: query.keyword?.toString() } : {}),
      },
    });
  };

  return (
    <div className="space-y-10">
      {!isEmpty(query) && !!filterItems.length && (
        <div className="block -mb-3">
          <div className="flex items-center justify-between mb-4 -mt-1">
            <Heading>{t('text-filters')}</Heading>
            <button
              className="flex-shrink text-13px transition duration-150 ease-in focus:outline-none hover:text-skin-base"
              aria-label={t('text-clear-all')}
              onClick={clearFilters}
            >
              {t('text-clear-all')}
            </button>
          </div>
          <div className="flex flex-wrap -m-1">
            {filterItems.map(
              ({ id, name, filterKey }: any, idx: any) =>
                !isEmpty(filterKey) && (
                  <FilteredItem
                    itemKey={filterKey}
                    name={name}
                    id={id}
                    key={idx}
                  />
                )
            )}
          </div>
        </div>
      )}

      {data && (
        <>
          <CategoryFilter categories={data.categories} />
          {!!data.itemSizes.suggested && (
            <SizeFilter
              sizes={data.itemSizes.suggested}
              sizeGroupName={data.itemSizes.name}
            />
          )}
          <ConditionFilter conditions={conditions} />
          {!!data.itemBrands.suggested && <BrandFilter {...data.itemBrands} />}
          <PriceFilter prices={prices} />
        </>
      )}
    </div>
  );
};
