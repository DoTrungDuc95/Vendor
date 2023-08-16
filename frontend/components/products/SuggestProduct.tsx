import { productData } from '@/static-data';
import React from 'react';
import ProductCard from './ProductCard';

const SuggestProduct = () => {
  return (
    <section className="py-12">
      <div className="section">
        <h2 className="heading text-[25px] font-[500] border-b mb-5">
          Related Product
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {productData &&
            productData.map((product, index) => <ProductCard data={product} key={product.id}/>)}
        </div>
      </div>
    </section>
  );
};

export default SuggestProduct;
