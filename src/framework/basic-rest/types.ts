import { QueryKey } from 'react-query';

export type CollectionsQueryOptionsType = {
  text?: string;
  collection?: string;
  status?: string;
  limit?: number;
};

export type CategoriesQueryOptionsType = {
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
};
export type ProductsQueryOptionsType = {
  type: string;
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
};
export type QueryOptionsType = {
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
};

export type QueryParamsType = {
  queryKey: QueryKey;
  pageParam?: string;
};
export type Attachment = {
  id: string | number;
  thumbnail: string;
  original: string;
};

export type Size = {
  id: number;
  name: string;
  itemSizeGroupId?: number;
  displayOrder?: number;
};

export type Category = {
  id: number | string;
  name: string;
  details?: string;
  image?: Attachment;
  icon?: string;
  children?: [Category];
  itemSizeGroupId?: number;
  products?: Product[];
  productCount?: number;
  [key: string]: unknown;
};
export type Collection = {
  id: number | string;
  name: string;
  slug: string;
  details?: string;
  image?: Attachment;
  icon?: string;
  products?: Product[];
  productCount?: number;
};
export type Brand = {
  id: number | string;
  name: string;
  image?: Attachment;
  [key: string]: unknown;
};
export type Dietary = {
  id: number | string;
  name: string;
  slug: string;
  [key: string]: unknown;
};
export type Tag = {
  id: string | number;
  name: string;
  slug: string;
};

export type Review = {
  id: string | number;
  created: number;
  rating: number;
  userId: string | number;
  name: string;
  message: string;
  photo: string;
};

export type Seller = {
  id: string | number;
  name: string;
  numSales: number;
  photo: string;
  reviews: Array<Review>;
  ratingCount: Number;
  ratingAverage: Number;
};

export type Product = {
  id: string | number;
  name: string;
  isSold: boolean;
  slug: string;
  lastUpdated: String;
  price: number;
  originalPrice?: number;
  unit: string;
  size?: string;
  condition?: string;
  shippingFee: number;
  image: Attachment;
  seller?: Seller;
  gallery?: Attachment[];
  tag?: Tag[];
  meta?: any[];
  brand?: Brand;
  description?: string;
  similarItems?: Product[];
  shipsFrom?: string;
  shippingETA?: string;
  [key: string]: unknown;
};
export type OrderItem = {
  id: number | string;
  name: string;
  price: number;
  quantity: number;
};
export type Order = {
  id: string | number;
  name: string;
  slug: string;
  products: OrderItem[];
  total: number;
  tracking_number: string;
  customer: {
    id: number;
    email: string;
  };
  shipping_fee: number;
  payment_gateway: string;
};
