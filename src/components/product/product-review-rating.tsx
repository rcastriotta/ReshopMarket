import type { FC } from 'react';
import { useTranslation } from 'next-i18next';
import ReviewCard from '@components/cards/review-card';
import Divider from '@components/ui/divider';
import { Review } from '../../framework/basic-rest/types';
import SectionHeader from '@components/common/section-header';

interface ProductSellerProps {
  reviews: Review[];
}
const ProductReviewRating: FC<ProductSellerProps> = ({ reviews }) => {
  const { t } = useTranslation('common');

  return (
    <div className="my-20">
      <Divider className="my-10" />
      <SectionHeader sectionHeading="Recent Reviews" />

      <div className="lg:grid lg:grid-cols-3 xl:grid-cols-4 lg:gap-5 space-y-5 lg:space-y-0">
        {reviews?.slice(0, 9).map((review) => (
          <ReviewCard review={review} key={`review-key-${review.id}`} />
        ))}

        {/*<ReviewForm className="lg:w-[500px] xl:w-[540px] 2xl:w-[600px] 3xl:w-[730px] lg:ps-10 xl:ps-14 3xl:ps-20 flex-shrink-0 pt-10" /> */}
      </div>
    </div>
  );
};

export default ProductReviewRating;
