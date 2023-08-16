import ProductCard from '@/components/products/ProductCard';

import { productData } from '@/static-data';
import { GetServerSidePropsContext } from 'next';

const Products = () => {
    
  return (
    <main className="my-12">
      <div className="section">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {productData.map((product, index) => (
            <ProductCard data={product} key={product.id} />
          ))}
        </div>
        {productData.length === 0 && (
          <p className="text-center w-full pb-[100px] text-[20px]">
            No products Found!
          </p>
        )}
      </div>
    </main>
  );
};

export default Products;

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  const { query } = context;

  if (!Object.keys(query).includes('category')) {
    return {
      props: {},
    };
  }

  return {
    props: {
      categoryQuety: query.category,
    },
  };
};
