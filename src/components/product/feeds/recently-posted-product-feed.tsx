import type { FC } from 'react';
import { useRecentlyPostedProductsQuery } from '@framework/product/get-recently-posted-products';
import ProductsGridBlock from '../products-grid-block';
import { LIMITS } from '@framework/utils/limits';
import Button from '@components/ui/button';
import { useRouter } from 'next/router';

interface ProductFeedProps {
  className?: string;
}

const BestSellerGroceryProductFeed: FC<ProductFeedProps> = ({ className }) => {
  const { data, isLoading, error } = useRecentlyPostedProductsQuery();
  const router = useRouter();

  const buttonClickHandler = () => {
    router.push('/search');
  };
  return (
    <div className="flex flex-col items-center my-20">
      <ProductsGridBlock
        sectionHeading="Recently posted items"
        sectionSubHeading="Grab them quick before they're gone!"
        className={className}
        products={data}
        loading={isLoading}
        error={error?.message}
        limit={LIMITS.BEST_SELLER_GROCERY_PRODUCTS_LIMITS}
        uniqueKey="best-sellers"
      />
      <Button onClick={buttonClickHandler}>See more</Button>
    </div>
  );
};
export default BestSellerGroceryProductFeed;
