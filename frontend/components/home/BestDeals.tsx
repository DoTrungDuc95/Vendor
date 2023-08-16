import { productData } from '@/static-data';
import React from 'react';
import ProductCard from '@/components/products/ProductCard';

const BestDeals = () => {
  return (
    <section className="my-12">
      <div className="section heading">
        <label>Best Deals</label>
      </div>

      <div className="section grid grid-cols-1 gap-6 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {productData
          .sort((a, b) => b.total_sell - a.total_sell)
          .slice(0, 5)
          .map((product) => (
            <ProductCard data={product} key={product.id} />
          ))}
      </div>
    </section>
  );
};

export default BestDeals;
