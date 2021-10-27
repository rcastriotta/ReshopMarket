// helpers
import { v4 as uuid } from 'uuid';
import timeago from 'epoch-timeago';
import { siteSettings } from '../settings/site-settings';
export const encodeId = (id) => id.replace('m', 'h');
export const decodeId = (id) => id.replace('h', 'm');
const formateReviewMSG = (msg) =>
  msg
    ?.replace('mercari', siteSettings.name)
    .replace('Mercari', siteSettings.name) || '';
const calculatePrice = (p) => Math.floor(p / 100 + 5);
const calculateShipping = (s) => (s === 0 ? 0 : Math.floor(s / 100 + 1));
const blacklistPhrases = ['reserve', 'custom', 'mercari', 'scam', 'bundle'];

export const shippingRates = {
  0: 'shr_1Ji8O2FfPITONSrdCXPzZX2C',
  1: 'shr_1Ji8IGFfPITONSrdtcDCTNvB',
  2: 'shr_1Ji8IQFfPITONSrdeucDUx3h',
  3: 'shr_1Ji8IdFfPITONSrdPSButdE7',
  4: 'shr_1Ji8IlFfPITONSrd7VygxI89',
  5: 'shr_1JhzP8FfPITONSrduIqMKqFM',
  6: 'shr_1Ji8ItFfPITONSrdOeNCHe5X',
  7: 'shr_1Ji8J1FfPITONSrd0Ia0jLBv',
  8: 'shr_1Ji8JVFfPITONSrdrTWB3NYt',
  9: 'shr_1Ji8JeFfPITONSrdwGYTcDAK',
  10: 'shr_1Ji8JrFfPITONSrdJVFRHSTe',
  11: 'shr_1Ji8K3FfPITONSrdl6vK9pru',
  12: 'shr_1Ji8KAFfPITONSrdEDhHpJ8n',
  13: 'shr_1Ji8KIFfPITONSrduQ0OMyDU',
  14: 'shr_1Ji8KRFfPITONSrdbptyU4D4',
  15: 'shr_1Ji8R9FfPITONSrdthH8hEVg',
};

const containsBlacklistPhrase = (title, description) =>
  blacklistPhrases.some(
    (p) =>
      title?.toLocaleLowerCase().includes(p) ||
      description?.toLocaleLowerCase().includes(p)
  );

export const formatProductArray = (arr) => {
  const formatted = [];
  arr
    .filter(
      (i) => !containsBlacklistPhrase(i.name, i.description) && i.price < 50000
    )
    .forEach((item) => {
      try {
        formatted.push({
          id: encodeId(item.id),
          name: item.name,
          isSold:
            item.status === undefined ? false : !(item.status === 'on_sale'),
          description: item.description,
          condition: item.itemCondition?.conditionName,
          size: item.itemSize?.name || item.itemSize?.sizeName,
          originalPrice: calculatePrice(item.originalPrice),
          price: calculatePrice(item.price),
          slug: encodeId(item.id),
          sale_price: calculatePrice(item.price),
          image: {
            id: uuid(),
            thumbnail: item.photos?.[0]?.large || item.photos?.[0]?.thumbnail,
            original: item.photos?.[0]?.large || item.photos?.[0]?.thumbnail,
          },
          brand: item.brand?.name || item.itemBrand?.name,
          tag: item.tags?.tags?.map((t) => ({
            id: t,
            slug: t,
            name: t,
          })),
        });
      } catch (err) {
        console.log(err);
      }
    });
  return formatted;
};

export const formatProductJSON = (item) => ({
  id: encodeId(item.itemId),
  name: item.name,
  isSold:
    !(item.status === 'on_sale') ||
    item.shippingClass.fee / 100 > 15 ||
    containsBlacklistPhrase(item.name, item.description),
  lastUpdated: `${
    item.updated === item.created ? 'Posted ' : 'Last updated '
  } ${timeago(item.updated * 1000)}`,
  size: item.itemSize?.name,
  condition: item.itemCondition?.conditionName,
  description: item.description?.replace(/mercari/g, 'mywebsite') || '',
  size: item.itemSize?.sizeName,
  originalPrice: calculatePrice(item.originalPrice),
  price: calculatePrice(item.price),
  shippingFee: calculateShipping(item.shippingClass.fee),
  seller: {
    id: item.seller.sellerId,
    numSales: item.seller.numSales,
    name: item.seller.sellerName,
    photo: item.seller.sellerPhotoId,
    reviews: item.seller.reviews.map((r) => ({
      id: uuid(),
      created: timeago(r.created * 1000),
      rating: r.fame === 'good' ? 5 : 4,
      message: formateReviewMSG(r.message),
      userId: r.user.id,
      name: r.user.name,
      photo: r.user.photo,
    })),
    ratingCount: item.seller.ratings.sellerRatingCount,
    ratingAverage: item.seller.ratings.sellerRatingAverage,
  },
  gallery: item.photos?.map((p) => ({
    id: uuid(),
    original: p.large,
    thumbnail: p.thumbnail,
  })),
  slug: item.id,
  sale_price: calculatePrice(item.price),
  image: {
    id: uuid(),
    thumbnail: item.photos?.[0]?.large,
    original: item.photos?.[0]?.large,
  },
  brand: item.brand?.brandName,
  tag: item.tags?.tags?.map((t) => ({
    id: uuid(),
    slug: t,
    name: t,
  })),
  shipsFrom: item.shippingFromArea.shippingFromAreaName,
  shippingETA: item.shippingClass.etaForSeller || '1-5 days',
});
