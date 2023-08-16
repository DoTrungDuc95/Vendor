import { ProductType } from '@/types';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from 'react-icons/ai';
import ProductDetailsInfo from './ProductDetailsInfo';

type ProductDetailProps = {
  data: ProductType;
};

const ProductDetail = ({ data }: ProductDetailProps) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);

  return (
    <div className="bg-white">
      {data ? (
        <div className="section w-[90%] 800px:w-[80%]">
          <div className="w-full py-5">
            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <img
                  src={`${data && data.image_Url[select]?.url}`}
                  alt=""
                  className="w-[80%]"
                />

                <div className="w-full flex">
                  {data &&
                    data.image_Url.map((i, index) => (
                      <div
                        className={`${
                          select === 0 ? 'border' : 'null'
                        } cursor-pointer`}
                        key={index}
                      >
                        <img
                          src={`${i?.url}`}
                          alt=""
                          className="h-[200px] overflow-hidden mr-3 mt-3"
                          onClick={() => setSelect(index)}
                        />
                      </div>
                    ))}
                </div>
              </div>

              <div className="w-full 800px:w-[50%] pt-5 800px:ml-5">
                <h1 className="product-title">{data.name}</h1>

                <p>{data.description}</p>

                <div className="flex pt-3">
                  <h4 className="product-discount-price">
                    {data.discount_price || data.price || 0}$
                  </h4>

                  <h3 className="price">
                    {data.price ? data.price + '$' : ''}
                  </h3>
                </div>

                <div className="flex items-center mt-12 justify-between pr-3">
                  <div>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      //   onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      //   onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>

                  <div>
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer"
                        // onClick={() => removeFromWishlistHandler(data)}
                        color={click ? 'red' : '#333'}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        // onClick={() => addToWishlistHandler(data)}
                        color={click ? 'red' : '#333'}
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>
                <div
                  className="btn !mt-6 !rounded !h-11 flex items-center"
                  //   onClick={() => addToCartHandler(data._id)}
                >
                  <span className="text-white flex items-center">
                    Add to cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>
                <div className="flex items-center pt-8">
                  {/* need shop id */}
                  <Link href={`/shop/preview/${data?.shop.name}`}>
                    <img
                      src={`${data?.shop?.shop_avatar?.url}`}
                      alt=""
                      className="w-[50px] h-[50px] rounded-full mr-2"
                    />
                  </Link>

                  <div className="pr-8">
                    <Link href={`/shop/preview/${data?.shop.name}`}>
                      <h3 className="shop-name pb-1 pt-1">{data.shop.name}</h3>
                    </Link>
                    <h5 className="pb-3 text-[15px]">
                      ({data.rating}/5) Ratings
                    </h5>
                  </div>
                  <div
                    className="btn bg-[#6443d1] mt-4 !rounded !h-11"
                    // onClick={handleMessageSubmit}
                  >
                    <span className="text-white flex items-center">
                      Send Message <AiOutlineMessage className="ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ProductDetailsInfo
            data={data}
            // products={products}
            // totalReviewsLength={totalReviewsLength}
            // averageRating={averageRating}
          />
          <br />
          <br />
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetail;
