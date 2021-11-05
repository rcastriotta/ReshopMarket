import Container from '@components/ui/container';
import Layout from '@components/layout/layout';
import OrderInformation from '@components/order/order-information';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import Divider from '@components/ui/divider';
import { useEffect } from 'react';
import { useCart } from '@contexts/cart/cart.context';
import Seo from '@components/seo/seo';
import { useRouter } from 'next/router';

export default function Order() {
  const { removeItemFromCart } = useCart();
  const router = useRouter();
  const { itemId } = router.query;

  useEffect(() => {
    if (itemId) removeItemFromCart(itemId.toString());
  }, [itemId]);

  return (
    <>
      <Seo title="Order" path="complete-order" />
      <Divider />
      <Container className="p-20">
        <OrderInformation />
      </Container>
      <Divider />
    </>
  );
}

Order.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
    },
  };
};
