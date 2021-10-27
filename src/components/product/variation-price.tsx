import usePrice from '@framework/product/use-price';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';

export default function VariationPrice({ selectedVariation }: any) {
  const { t } = useTranslation('common');
  const { price, basePrice, discount } = usePrice(
    selectedVariation && {
      amount: selectedVariation.price,
      baseAmount: selectedVariation.price,
      currencyCode: 'USD',
    }
  );

  return (
    <div className="flex items-center mt-5">
      <div className="text-skin-base font-bold text-base md:text-xl xl:text-[22px]">
        {price || '$0.00'}
      </div>
      {discount && (
        <>
          <del className="text-sm md:text-15px ps-3 text-skin-base text-opacity-50">
            {basePrice}
          </del>
          <span className="inline-block rounded font-bold text-xs md:text-sm bg-skin-tree bg-opacity-20 text-skin-tree uppercase px-2 py-1 ms-2.5">
            {discount} {t('text-off')}
          </span>
        </>
      )}
    </div>
  );
}
