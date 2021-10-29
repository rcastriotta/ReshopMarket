import { useTranslation } from 'next-i18next';
import CategoryFilterMenu from '@components/search/category-filter-menu';
import Alert from '@components/ui/alert';
import Scrollbar from '@components/ui/scrollbar';
import CategoryListCardLoader from '@components/ui/loaders/category-list-card-loader';
import FilterDropdown from './filter-dropdown';
import { useEffect } from 'react';
import { useState } from 'react';

export const CategoryFilter = ({
  categories,
  isLoading: loading,
  error,
}: any) => {
  const { t } = useTranslation('common');

  if (loading) {
    return (
      <div className="hidden xl:block">
        <div className="w-72 mt-8 px-2">
          <CategoryListCardLoader uniqueKey="category-list-card-loader" />
        </div>
      </div>
    );
  }

  if (error) return <Alert message={error.message} />;

  return (
    <FilterDropdown title="Categories" startOpen={true}>
      <div className="max-h-full overflow-hidden rounded border border-skin-base">
        <Scrollbar id="test" className="w-full category-filter-scrollbar">
          {categories.length ? (
            <CategoryFilterMenu items={categories} />
          ) : (
            <div className="min-h-full pt-6 pb-8 px-9 lg:p-8">
              {t('text-no-results-found')}
            </div>
          )}
        </Scrollbar>
      </div>
    </FilterDropdown>
  );
};
