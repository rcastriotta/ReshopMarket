import type { FC } from 'react';
import cn from 'classnames';
import Image from '@components/ui/image';
import usePrice from '@framework/product/use-price';
import { Product } from '@framework/types';
import { useModalAction } from '@components/common/modal/modal.context';
import { productPlaceholder } from '@assets/placeholders';

interface ProductProps {
  product: Product;
  className?: string;
}

const ProductCard: FC<ProductProps> = ({ product, className }) => {
  const { name, image, quantity, unit, product_type, brand, size, isSold } =
    product ?? {};
  const { openModal } = useModalAction();
  const { price, basePrice, discount } = usePrice({
    amount: product.price,
    baseAmount: product.originalPrice,
    currencyCode: 'USD',
    showDecimal: true,
  });

  function handlePopupView() {
    openModal('PRODUCT_VIEW', product);
  }
  return (
    <article
      className={cn(
        'flex flex-col group overflow-hidden rounded-md cursor-pointer transition-all duration-300 shadow-card hover:shadow-cardHover relative h-full',
        className
      )}
      onClick={handlePopupView}
      title={name}
    >
      <div className="relative flex-shrink-0">
        <div className="relative overflow-hidden w-full h-[200px] mx-auto transition duration-200 ease-in-out transform lg:group-hover:scale-105 relative">
          <Image
            src={image?.thumbnail ?? productPlaceholder}
            alt={name || 'Product Image'}
            layout="fill"
            objectFit="cover"
            className="object-cover bg-skin-thumbnail"
          />
        </div>
        <div className="w-full h-full absolute top-0 pt-2.5 md:pt-3.5 px-3 md:px-4 lg:px-[18px] z-10 -mx-0.5 sm:-mx-1">
          {isSold ? (
            <span className="text-[11px] md:text-xs font-bold uppercase inline-block bg-gray-200 rounded-full px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
              sold
            </span>
          ) : (
            discount && (
              <span className="text-[11px] md:text-xs font-bold text-skin-inverted uppercase inline-block bg-skin-primary rounded-full px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
                on sale
              </span>
            )
          )}
        </div>
      </div>

      <div className="flex flex-col px-3 md:px-4 lg:px-[18px] pb-5 lg:pb-6 lg:pt-1.5 h-full">
        <div className="space-s-2 mb-1 lg:mb-1.5">
          <span className="inline-block font-semibold text-sm sm:text-15px lg:text-base text-skin-base">
            {price}
          </span>
          {basePrice && (
            <del className="text-sm text-skin-base text-opacity-70">
              {basePrice}
            </del>
          )}
        </div>
        <h2 className="text-skin-base text-13px sm:text-sm lg:text-15px leading-5 sm:leading-6 mb-1.5">
          {name}
        </h2>
        <div className="text-13px sm:text-sm mt-auto">
          {brand || size || ''} {size && brand ? `| ${size}` : ''}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
