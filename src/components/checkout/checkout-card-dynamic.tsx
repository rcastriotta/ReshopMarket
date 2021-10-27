import Link from 'next/link';
import usePrice from '@framework/product/use-price';
import { useCart } from '@contexts/cart/cart.context';
import Text from '@components/ui/text';
import Button from '@components/ui/button';
import { CheckoutItem } from '@components/checkout/checkout-card-item';
import { CheckoutCardFooterItem } from './checkout-card-footer-item';
import { useTranslation } from 'next-i18next';
import Router from 'next/router';
import { ROUTES } from '@utils/routes';
import { useRouter } from 'next/router';
import { useProductQuery } from '@framework/product/get-product';
import { generateCartItem } from '@utils/generate-cart-item';
const CheckoutCardDynamic: React.FC = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const {
    query: { id },
  } = router;

  const { data, isLoading } = useProductQuery(id as string);
  const { price: itemPrice } = usePrice(
    data && {
      amount: data.price,
      currencyCode: 'USD',
    }
  );
  const { price: shippingPrice } = usePrice(
    data && {
      amount: data.shippingFee,
      currencyCode: 'USD',
    }
  );

  const { price: subtotal } = usePrice(
    data && {
      amount: data.shippingFee + data.price,
      currencyCode: 'USD',
    }
  );

  if (isLoading) return <p>...Loading</p>;

  const items = data ? [generateCartItem(data)] : [];

  function orderHeader() {
    data && Router.push(ROUTES.ORDER);
  }
  const checkoutFooter = [
    {
      id: 1,
      name: t('text-sub-total'),
      price: itemPrice,
    },
    {
      id: 2,
      name: t('text-shipping'),
      price: shippingPrice,
    },
    {
      id: 3,
      name: t('Tax'),
      price: '--',
    },
    {
      id: 4,
      name: t('text-total'),
      price: subtotal,
    },
  ];
  return (
    <>
      <div className="border border-skin-base bg-skin-fill rounded-md py-1 xl:py-6 px-4 xl:px-7">
        <div className="flex py-4 rounded-md text-sm font-semibold text-heading">
          <span className="text-15px text-skin-base font-medium">
            {t('text-product')}
          </span>
          <span className="ms-auto flex-shrink-0 text-15px text-skin-base font-medium ">
            {t('text-sub-total')}
          </span>
        </div>
        {data ? (
          items.map((item) => <CheckoutItem item={item} key={item.id} />)
        ) : (
          <p className="text-skin-red text-opacity-70 py-4">
            {t('Item not found')}
          </p>
        )}
        {checkoutFooter.map((item: any) => (
          <CheckoutCardFooterItem item={item} key={item.id} />
        ))}
        <Button
          variant="formButton"
          disabled={!data}
          className="w-full mt-8 mb-5 bg-skin-primary text-skin-inverted rounded font-semibold px-4 py-3 transition-all"
          onClick={orderHeader}
        >
          {t('button-order-now')}
        </Button>
      </div>
      <Text className="mt-8">
        {t('text-by-placing-your-order')}{' '}
        <Link href={ROUTES.TERMS}>
          <a className="text-skin-primary underline font-medium">
            {t('text-terms-of-service')}{' '}
          </a>
        </Link>
        {t('text-and')}{' '}
        <Link href={ROUTES.PRIVACY}>
          <a className="text-skin-primary underline font-medium">
            {t('text-privacy')}
          </a>
        </Link>
        . {t('text-credit-debit')}
      </Text>
      <Text className="mt-4">{t('text-bag-fee')}</Text>
    </>
  );
};

export default CheckoutCardDynamic;
