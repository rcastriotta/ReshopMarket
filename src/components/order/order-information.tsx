import { IoCheckmarkCircle } from 'react-icons/io5';
import OrderDetails from '@components/order/order-details';
import { useOrderQuery } from '@framework/order/get-order';
import { useRouter } from 'next/router';
import usePrice from '@framework/product/use-price';
import { useTranslation } from 'next-i18next';

export default function OrderInformation() {
  const { t } = useTranslation('common');

  return (
    <div className="xl:px-32 2xl:px-44 3xl:px-56 py-16 lg:py-20">
      <div className="border border-skin-base bg-skin-secondary px-4 lg:px-5 py-4 rounded-md flex items-center justify-start text-skin-base text-sm md:text-base mb-6 lg:mb-8">
        <span className="w-10 h-10 me-3 lg:me-4 rounded-full bg-skin-primary bg-opacity-20 flex items-center justify-center flex-shrink-0">
          <IoCheckmarkCircle className="w-5 h-5 text-skin-primary" />
        </span>
        <div className="space-y-1">
          <span>{t('text-order-received')}</span>
          <p className="text-gray-500 text-sm">
            We will send you a receipt and let you know when the item ships.
          </p>
        </div>
      </div>
      <p>
        If you have any questions or problems with your order contact{' '}
        <b>support@reshopmarket.com</b>
      </p>
    </div>
  );
}
