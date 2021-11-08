import type { FC } from 'react';
import { useTranslation } from 'next-i18next';
import Heading from '@components/ui/heading';
import Text from '@components/ui/text';
import StarIcon from '@components/icons/star-icon';
import Image from '@components/ui/image';

interface ReviewProps {
  review: any;
  className?: string;
}

const ReviewCard: FC<ReviewProps> = ({ review, className = '' }) => {
  const { t } = useTranslation('common');
  return (
    <div
      className={`border lg:max-w-sm rounded p-5 border-skin-base pb-6 ${className}`}
    >
      <div className="flex items-center">
        <div className="flex space-s-1">
          {[...Array(5)].map((_, idx) => (
            <StarIcon
              key={idx}
              color={idx < review.rating ? '#F3B81F' : '#DFE6ED'}
              className="w-3.5 lg:w-4 h-3.5 lg:h-4"
            />
          ))}
        </div>
        <span className="text-skin-muted text-sm ml-3">{review.created}</span>
      </div>

      <Text className="xl:leading-[2em]">{review.message}</Text>
      <div className="flex items-center text-skin-base text-opacity-80 text-sm pt-2">
        <div className="w-[20px] h-[20px]">
          <Image
            src={review.photo}
            width="100%"
            height="100%"
            objectFit="cover"
            className="rounded-full"
            unoptimized={true}
          />
        </div>
        <span className="noselect ml-3 inline-block ms-[3px] font-semibold">
          {review.name}
        </span>
      </div>
    </div>
  );
};

export default ReviewCard;
