import ProductDetail from '@/components/products/ProductDetail';
import SuggestProduct from '@/components/products/SuggestProduct';
import { productData } from '@/static-data';
import { ProductType } from '@/types';
import { GetServerSidePropsContext } from 'next';
import React from 'react';

type ProductDetailPageProps = {
  data: ProductType;
};

const ProductDetailPage = ({ data }: ProductDetailPageProps) => {
  return (
    <main>
      <ProductDetail data={data} />
      <SuggestProduct />
    </main>
  );
};

export default ProductDetailPage;

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  const { params } = context;

  const id = params?.productId;

  const product = productData.find((p) => p.id.toString() === id);

  if (!product)
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
    };

  return {
    props: {
      data: product,
    },
  };
};
