import { ProductType } from '@/types';
import Link from 'next/link';
import React, { useState } from 'react';
import Rating from '../utils/Rating';

type ProductDetailsInfoProps = {
  data: ProductType;
};

const ProductDetailsInfo = ({ data }: ProductDetailsInfoProps) => {
  const [active, setActive] = useState(1);

  return (
    <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          <h5
            className={
              'text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]'
            }
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 ? <div className="active-indicator" /> : null}
        </div>
        <div className="relative">
          <h5
            className={
              'text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]'
            }
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {active === 2 ? <div className="active-indicator" /> : null}
        </div>
        <div className="relative">
          <h5
            className={
              'text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]'
            }
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>
          {active === 3 ? <div className="active-indicator" /> : null}
        </div>
      </div>

      {active === 1 ? (
        <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
          {data.description}
        </p>
      ) : null}

      {active === 2 ? (
        <div className="w-full min-h-[40vh] flex flex-col items-center py-3 overflow-y-auto">
          {/* {data.reviews &&
            data.reviews?.map((item, index) => (
              <div className="w-full flex my-2" key={index}>
                <img
                  src={`${item.user.avatar?.url}`}
                  alt=""
                  className="w-[50px] h-[50px] rounded-full"
                />
                <div className="pl-2 ">
                  <div className="w-full flex items-center">
                    <label className="font-[500] mr-3">{item.user.name}</label>
                    <Rating rating={data?.rating} id={data.id}/>
                  </div>
                  <p>{item.comment}</p>
                </div>
              </div>
            ))} */}

          <div className="w-full flex justify-center">
            <p>No Reviews have for this product!</p>
          </div>
        </div>
      ) : null}

      {active === 3 && (
        <div className="w-full block 800px:flex p-5">
          <div className="w-full 800px:w-[50%]">
            <Link href={`/shop/preview/${data.shop.name}`}>
              <div className="flex items-center">
                <img
                  src={`${data?.shop?.shop_avatar?.url}`}
                  className="w-[50px] h-[50px] rounded-full"
                  alt=""
                />
                <div className="pl-3">
                  <h3 className="shop-name">{data.shop.name}</h3>
                  <h5 className="pb-2 text-[15px]">
                    ({data.rating}/5) Ratings
                  </h5>
                </div>
              </div>
            </Link>

            <p className="pt-2">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Recusandae, sequi consequuntur soluta accusamus alias error eos
              saepe delectus ipsa cum dignissimos reiciendis nemo laboriosam
              possimus natus maiores ipsam laborum! Similique.
            </p>
          </div>
          <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
            <div className="text-left">
              <output className="font-[600] block">
                Joined on:{' '}
                <span className="font-[500]">
                  {new Date(Date.now() - 86400000000).toDateString()}
                </span>
              </output>

              <output className="font-[600] pt-3 block">
                Total Products: <span className="font-[500]">{100}</span>
              </output>

              <output className="font-[600] pt-3 block">
                Total Reviews: <span className="font-[500]">{5}</span>
              </output>

              <Link href="/">
                <div className="btn !rounded-[4px] !h-[39.5px] mt-3">
                  <h4 className="text-white">Visit Shop</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsInfo;
