import React from 'react';
import ProductCard from '@/components/products/ProductCard';
import { productData } from '@/static-data';

const FeaturedProduct = () => {
  return (
    <section className="my-12">
      <div className="section">
        <div className="heading">
          <label>Featured Products</label>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {productData.map((i, index) => (
            <ProductCard data={i} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProduct;
