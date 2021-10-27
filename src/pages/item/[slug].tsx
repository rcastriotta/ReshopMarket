import Container from '@components/ui/container';
import Layout from '@components/layout/layout';
import ProductSingleDetails from '@components/product/product';
import Breadcrumb from '@components/ui/breadcrumb';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import Divider from '@components/ui/divider';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { fetchProduct } from '@framework/product/get-product';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import Seo from '@components/seo/seo';
export default function ProductPage() {
  return (
    <>
      <Seo
        title="Item info"
        description="Buy new or used items easily."
        path="about-us"
      />
      <Divider />
      <div className="pt-6 lg:pt-7">
        <Container>
          <Breadcrumb />
          <ProductSingleDetails />
        </Container>
      </div>

      <Divider />
    </>
  );
}

ProductPage.Layout = Layout;
export const getServerSideProps: GetServerSideProps = async ({
  locale,
  params,
}) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery([API_ENDPOINTS.PRODUCT, params?.slug], () =>
    fetchProduct(params?.slug as string)
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
    },
  };
};
