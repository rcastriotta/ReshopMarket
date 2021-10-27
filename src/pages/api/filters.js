import axios from 'axios';
import allSizes from './static/sizes.json';
import allCategories from './static/categories.json';
import allBrands from './static/brands.json';
export default async function handler(req, res) {
  const { category = 1 } = req.query;
  const { data } = await axios({
    method: 'get',
    url: 'https://www.mercari.com/v1/api',
    headers: {
      'user-agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36',
      'accept-language': 'en-US,en;q=0.9',
    },
    params: {
      operationName: 'searchFacetQuery',
      variables: {
        criteria: {
          offset: 0,
          soldItemsOffset: 0,
          promotedItemsOffset: 0,
          sortBy: 0,
          length: 30,
          categoryIds: [+category],
          itemConditions: [],
          shippingPayerIds: [],
          sizeGroupIds: [],
          brandIds: [],
          sizeIds: [],
          itemStatuses: [],
          customFacets: [],
          facets: [1, 2, 3, 5, 7, 8, 9, 10, 11, 13],
          authenticities: [],
          deliveryType: 'all',
          state: null,
          locale: null,
          shopPageUri: null,
        },
        categoryId: 0,
      },
      extensions: {
        persistedQuery: {
          version: 1,
          sha256Hash:
            '2f100311be0b262346bd5775c095c06040ed83fd0849cd2af0dfbcc24f3d016d',
        },
      },
    },
  });
  const { facetGroupsList } = data.data.search;
  const sName = facetGroupsList?.find(
    (f) => f.systemName === 'facet_group_sizes'
  )?.facetsList[0].title;
  const sizeGroup = allSizes.find((s) => s.sizes.find((s) => s.name === sName));
  const sizes = {
    name: sizeGroup?.name,
    all: [].concat(...allSizes.map((s) => s.sizes)),
    suggested: sizeGroup?.sizes,
  };
  const brands = {
    all: allBrands,
    suggested: facetGroupsList
      ?.find((f) => f.systemName === 'facet_group_brands')
      ?.facetsList.map((f) => ({
        id: f.criteria.brandIds[0],
        name: f.title,
      }))
      ?.sort(
        (a, b) =>
          (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase() && 1) || -1
      ),
  };

  res.send({
    sizes,
    brands,
    categories: allCategories,
  });
}
