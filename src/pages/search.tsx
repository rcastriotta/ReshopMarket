import Container from '@components/ui/container';
import Layout from '@components/layout/layout';
import { ShopFilters } from '@components/search/filters';
import { ProductGrid } from '@components/product/product-grid';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps, GetStaticProps } from 'next';
import { Element } from 'react-scroll';
import SearchTopBar from '@components/search/search-top-bar';
import Divider from '@components/ui/divider';
import Seo from '@components/seo/seo';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { fetchCategories } from '@framework/filters/get-filters';
import { useRouter } from 'next/router';
import { useProductsQuery } from '@framework/product/get-all-products';

export default function Search() {
  const { query } = useRouter();
  const res = useProductsQuery(query);

  return (
    <>
      <Seo
        title="Search"
        description="Buy new or used items easily."
        path="search"
      />
      <Divider />
      <Container>
        <Element name="grid" className="flex pt-7 lg:pt-11 pb-16 lg:pb-20">
          <div className="flex-shrink-0 pe-8 xl:pe-16 hidden lg:block w-80 xl:w-96 top-16 h-full">
            <ShopFilters />
          </div>
          <div className="w-full lg:-ms-2 xl:-ms-8 lg:-mt-1">
            <SearchTopBar
              count={res.data?.pages[0].data.count || 0}
              brands={res.data?.pages[0].data.brands}
              sizes={res.data?.pages[0].data.sizes}
              isLoading={res.isLoading}
            />
            <ProductGrid {...res} />
          </div>
        </Element>
      </Container>
      <Divider />
    </>
  );
}

Search.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  query,
}) => {
  const queryClient = new QueryClient();

  /*
  await queryClient.prefetchQuery(
    [API_ENDPOINTS.CATEGORIES, { category: query.category }],
    fetchCategories
  );
  */

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
