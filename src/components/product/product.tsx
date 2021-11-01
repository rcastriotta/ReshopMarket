import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useProductQuery } from '@framework/product/get-product';
import ThumbnailCarousel from '@components/ui/carousel/thumbnail-carousel';
import Image from '@components/ui/image';
import ProductSeller from './product-seller';
import Divider from '../ui/divider';
import ProductInfo from './product-info';
import ProductReviewRating from './product-review-rating';
import RelatedProductFeed from './feeds/related-product-feed';
import Seo from '@components/seo/seo';
const ProductSingleDetails: React.FC = () => {
  const router = useRouter();
  const {
    query: { slug },
  } = router;

  const { data, isLoading, error } = useProductQuery(slug as string);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>ERROR</p>;

  return (
    <>
      <Seo
        title={data?.name}
        description="Buy new or used items easily."
        path="item/[slug]"
        images={[
          {
            url: data?.image.original!,
            alt: 'Og Image Alt',
            width: 800,
            height: 600,
          },
        ]}
      />
      <div className="flex flex-col items-center pt-6 md:pt-7 pb-2 overflow-hidden">
        <div className="max-w-[1500px] w-full">
          <div className="lg:grid grid-cols-10 gap-7 2xl:gap-8">
            <div className="col-span-5 xl:col-span-6 mb-6 md:mb-8 lg:mb-0">
              {!!data?.gallery?.length ? (
                <ThumbnailCarousel
                  gallery={data?.gallery}
                  thumbnailClassName="h-[500px] lg:h-[600px] xl:h-[700px]"
                  containerClassName="xl:h-[700px]"
                  galleryClassName="xl:w-[120px] 2xl:w-[150px] overflow-x-hidden"
                />
              ) : (
                <div className="w-auto flex items-center justify-center">
                  <Image
                    src={data?.image?.original ?? '/product-placeholder.svg'}
                    alt={data?.name}
                    width={900}
                    height={680}
                  />
                </div>
              )}
              {data?.seller && (
                <div className="hidden lg:block">
                  <Divider className="my-[40px]" />
                  <ProductSeller seller={data.seller} />
                </div>
              )}
            </div>

            {data && <ProductInfo data={data} />}
            {data?.seller && (
              <div className="block lg:hidden">
                <Divider className="my-[40px]" />
                <ProductSeller seller={data.seller} />
              </div>
            )}
          </div>

          {!!data?.seller?.reviews.length ? (
            <ProductReviewRating reviews={data.seller.reviews} />
          ) : (
            <div className="h-10" />
          )}
          <Divider className="my-10" />
          <RelatedProductFeed data={data?.similarItems} />
        </div>
      </div>
    </>
  );
};

export default ProductSingleDetails;
