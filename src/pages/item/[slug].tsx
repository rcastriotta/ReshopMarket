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
import { useProductQuery } from '@framework/product/get-product';
import { useRouter } from 'next/router';
import Seo from '@components/seo/seo';
export default function ProductPage() {
  const router = useRouter();
  const {
    query: { slug },
  } = router;
  const { data, isLoading, error } = useProductQuery(slug as string);

  return (
    <>
      <Seo
        title={data?.name}
        description={data?.description}
        path="item/[slug]"
        images={[
          {
            url: data?.image.original!,
            alt: 'Og Image Alt',
            height: 200,
            width: 200,
          },
        ]}
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
  const data = await queryClient.prefetchQuery(
    [API_ENDPOINTS.PRODUCT, params?.slug],
    () => fetchProduct(params?.slug as string)
  );
  console.log(data);

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
