import { ProductType } from '@/types';
import Link from 'next/link';
import React from 'react';
import Countdown from './Countdown';

type EventCardProps = { data: ProductType };

const EventCard = ({ data }: EventCardProps) => {
  return (
    <div className={`w-full block bg-white rounded-lg  lg:flex p-2`}>
      <div className="w-full lg:-w[50%] m-auto">
        <img src={`${data.image_Url[0]?.url}`} alt="" />
      </div>
      <div className="w-full lg:[w-50%] flex flex-col justify-center">
        <h2 className="product-title">{data.name}</h2>
        <p>{data.description}</p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              {data.price}$
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              {data.discount_price}$
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            {data.total_sell} sold
          </span>
        </div>

        <div className="text-[20px] my-5">
          <Countdown time={8640} />
        </div>

        <div className="flex gap-5 items-center">
          <Link href={`/product/${data.id}?isEvent=true`}>
            <div className="btn text-[#fff]">See Details</div>
          </Link>
          <div className="btn text-[#fff]">Add to cart</div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
