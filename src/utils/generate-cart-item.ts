import isEmpty from 'lodash/isEmpty';
interface Item {
  id: string | number;
  name: string;
  slug: string;
  image: {
    thumbnail: string;
    [key: string]: unknown;
  };
  price: number;
  shippingFee: number;
  sale_price?: number;
  [key: string]: unknown;
}

export function generateCartItem(item: Item) {
  const { id, name, slug, image, price, unit, shippingFee } = item;
  return {
    id,
    name,
    slug,
    unit,
    image: image?.thumbnail,
    price,
    shippingFee,
  };
}
