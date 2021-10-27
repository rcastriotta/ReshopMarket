import type { FC } from 'react';
import { Seller } from '../../framework/basic-rest/types';
import Image from '@components/ui/image';
import StarIcon from '@components/icons/star-icon';

interface ProductSellerProps {
  seller: Seller;
}

const ProductSeller: React.FC<ProductSellerProps> = ({ seller }) => {
  return (
    <div className="flex items-center h-[100px] w-[400px]">
      <div className="w-[75px] h-[75px] lg:w-[100px] lg:h-[100px] flex items-center justify-center overflow-hidden">
        <Image
          src={seller.photo}
          alt={seller.name}
          width="100%"
          height="100%"
          objectFit="cover"
          className="rounded-full"
        />
      </div>

      <div className="w-[100%] h-[100%] ml-5 py-4">
        <h2 className="noselect text-skin-base text-lg font-medium">
          Sold by {seller.name}
        </h2>
        <div className="flex flex-col-reverse lg:flex-row lg:items-center">
          <div className="flex space-s-1 mb-3.5">
            {[...Array(5)].map((_, idx) => (
              <StarIcon
                key={idx}
                color={idx < seller.ratingAverage ? '#F3B81F' : '#DFE6ED'}
                className="w-3.5 lg:w-4 h-3.5 lg:h-4 mt-[10px]"
              />
            ))}
          </div>

          <div className="lg:ml-4">
            <span className="text-skin-muted text-sm l:ml-3">
              {seller.ratingCount} reviews
            </span>
            <span className="text-skin-muted text-sm ml-3">
              {seller.numSales} sales
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductSeller;
