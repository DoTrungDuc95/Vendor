import { ProductType } from '@/types';
import Link from 'next/link';
import { useState } from 'react';

import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from 'react-icons/ai';
import { RxCross1 } from 'react-icons/rx';

type ProductDetailModalProps = {
  data: ProductType;
  setOpen: (val: boolean) => void;
};

const ProductDetailModal = ({ data, setOpen }: ProductDetailModalProps) => {
  const [imgSelect, setImgSelect] = useState(0);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);

  const incrementCount = () => {
    setCount((count) => count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount((count) => count - 1);
    }
  };

  return (
    <div className="bg-[#fff]">
      <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
        <div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4">
          <RxCross1
            size={30}
            className="absolute right-3 top-3 z-50"
            onClick={() => setOpen(false)}
          />

          <div className="block w-full 800px:flex">
            <div className="w-full 800px:w-[50%]">
              <img src={`${data.image_Url && data.image_Url[0]?.url}`} alt="" />

              <div className="flex">
                <Link href={`/shop/preview/${data.shop.name}`} className="flex">
                  <img
                    src={`${data.image_Url && data.image_Url[0]?.url}`}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full mr-2"
                  />

                  <div>
                    <span className="shop-name block">{data.shop.name}</span>

                    <span className="pb-3 text-[15px]">
                      ({data?.rating}) Ratings
                    </span>
                  </div>
                </Link>
              </div>

              <div className="btn bg-[#000] mt-4 rounded-[4px] h-11">
                <span className="text-[#fff] flex items-center">
                  Send Message <AiOutlineMessage className="ml-1" />
                </span>
              </div>

              <span className="text-[16px] text-[red] mt-5">(50) Sold out</span>
            </div>

            <div className="w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px]">
              <label className="product-title text-[20px] mb-4 block">
                {data.name}
              </label>

              <p className="mb-4">{data.description}</p>

              <div className="flex pt-3">
                <span className="product-discount-price">
                  {data.discount_price}$
                </span>

                <span className="price">
                  {data.price ? data.price + '$' : ''}
                </span>
              </div>

              <div className="flex items-center mt-12 justify-between pr-3">
                <div>
                  <button
                    className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                    onClick={decrementCount}
                  >
                    -
                  </button>

                  <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                    {count}
                  </span>

                  <button
                    className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                    onClick={incrementCount}
                  >
                    +
                  </button>
                </div>

                <div>
                  {click ? (
                    <AiFillHeart
                      size={30}
                      className="cursor-pointer"
                      color="red"
                      title="Remove from wishlist"
                      onClick={() => setClick((p) => !p)}
                    />
                  ) : (
                    <AiOutlineHeart
                      size={30}
                      className="cursor-pointer"
                      title="Add to wishlist"
                      onClick={() => setClick((p) => !p)}
                    />
                  )}
                </div>
              </div>

              <div className="btn mt-6 rounded-[4px] h-11 flex items-center">
                <span className="text-[#fff] flex items-center">
                  Add to cart <AiOutlineShoppingCart size={25} className="ml-1" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
