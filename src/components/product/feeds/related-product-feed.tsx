import ProductsGridBlock from '../products-grid-block';

interface RelatedProductsProps {
  carouselBreakpoint?: {} | any;
  className?: string;
  uniqueKey?: string;
  data: any;
}

const RelatedProductFeed: React.FC<RelatedProductsProps> = ({
  className,
  uniqueKey = 'related-product-popup',
  data,
}) => {
  return (
    <ProductsGridBlock
      sectionHeading="Related Items"
      className={className}
      products={data}
      headingPosition="left"
      loading={false}
      error={undefined}
      limit={20}
      uniqueKey="popular-product"
    />
  );
};

export default RelatedProductFeed;
