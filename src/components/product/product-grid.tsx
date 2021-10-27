import type { FC } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Alert from '@components/ui/alert';
import Button from '@components/ui/button';
import ProductCard from '@components/product/product-cards/product-card';
import ProductCardLoader from '@components/ui/loaders/product-card-loader';
import cn from 'classnames';

interface ProductGridProps {
  className?: string;
  isFetching: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage: Function;
  hasNextPage?: boolean;
  data?: any;
  error?: any;
}

export const ProductGrid: FC<ProductGridProps> = ({
  className = '',
  isFetching,
  isFetchingNextPage,
  fetchNextPage,
  hasNextPage,
  data,
  error,
}) => {
  const { t } = useTranslation('common');
  return (
    <>
      <div
        className={cn(
          'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-3 md:gap-4 2xl:gap-5',
          className
        )}
      >
        {error ? (
          <div className="col-span-full">
            <Alert message={error?.message} />
          </div>
        ) : isFetching && !data?.pages?.length ? (
          Array.from({ length: 30 }).map((_, idx) => (
            <ProductCardLoader
              key={`product--key-${idx}`}
              uniqueKey={`product--key-${idx}`}
            />
          ))
        ) : (
          data?.pages?.map((page: any) => {
            return page?.data?.itemsList?.map((product: any) => (
              <ProductCard
                key={`product--key-${product.id}`}
                product={product}
              />
            ));
          })
        )}
        {/* end of error state */}
      </div>
      {hasNextPage && (
        <div className="text-center pt-8 xl:pt-10">
          <Button
            loading={isFetchingNextPage}
            disabled={isFetchingNextPage}
            onClick={() => fetchNextPage()}
          >
            {t('button-load-more')}
          </Button>
        </div>
      )}
    </>
  );
};
