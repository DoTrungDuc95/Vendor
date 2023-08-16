import React from 'react';
import { RxCross1 } from 'react-icons/rx';
import { BsCartPlus } from 'react-icons/bs';

type ItemType = {
  id: number;
  name: string;
  img: string;
  description: string;
  price: number;
  discount_price: number;
};

type WishlistItemProps = {
  data: ItemType;
};

const WishlistItem = ({ data }: WishlistItemProps) => {
  return (
    <article className="border-b p-4">
      <div className="w-full flex items-center cursor-pointer">
        <div className="basis-5">
          <RxCross1 size={20} />
        </div>
        <div className="flex-type-1 flex-1">
          <img
            src={`${data.img}`}
            alt=""
            className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
          />

          <div className="pl-[5px]">
            <label className="block">{data.name}</label>
            <output className="font-[600] pt-3 800px:pt-[3px] text-[17px] text-[#d02222] font-Roboto">
              US${data.discount_price || data.price || 0}
            </output>
          </div>
        </div>

        <div className="ml-5 cursor-pointer" title="Add to cart">
          <BsCartPlus size={20} />
        </div>
      </div>
    </article>
  );
};

export default WishlistItem;
