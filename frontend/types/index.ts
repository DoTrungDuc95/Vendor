import { type } from 'os';

export type NavItemType = {
  id: number;
  title: string;
  url: string;
};

export type BrandingType = {
  id: number;
  title: string;
  description: string;
  icon: string;
};

export type CategoryType = {
  id: number;
  title: string;
  subTitle: string;
  image_Url: string;
};

export type ImgUrlType = {
  public_id: string;
  url: string;
};

export type ShopType = {
  name: string;
  shop_avatar: ImgUrlType;
  ratings: number;
};

export type ProductType = {
  id: number;
  category?: string;
  name: string;
  description: string;
  image_Url: ImgUrlType[];
  shop: ShopType;
  price?: number;
  discount_price?: number;
  rating: number;
  total_sell: number;
  stock: number;
  reviews?: any;
};
