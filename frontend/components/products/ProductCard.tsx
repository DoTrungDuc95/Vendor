import { ProductType } from '@/types';
import Link from 'next/link';
import { useState } from 'react';

import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from 'react-icons/ai';
import Rating from '../utils/Rating';
import ProductDetailModal from './ProductDetailModal';

type ProductCardProps = {
  data: ProductType;
};

const ProductCard = ({ data }: ProductCardProps) => {
  const [isEvent, setIsEvent] = useState(false);
  const [click, setClick] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  return (
    <article>
      <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
        <Link
          href={`${
            isEvent === true
              ? `/products/${data.id}?isEvent=true`
              : `/products/${data.id}`
          }`}
        >
          <img
            src={`${data.image_Url && data.image_Url[0]?.url}`}
            alt=""
            className="w-full h-[170px] object-contain"
          />
        </Link>

        {/* need shop id */}
        <Link href={`/shop/preview/${data?.shop.name}`}>
          <h5 className="shop-name">{data.shop.name}</h5>
        </Link>

        <Link
          href={`${
            isEvent === true
              ? `/products/${data.id}?isEvent=true`
              : `/products/${data.id}`
          }`}
        >
          <h4 className="pb-3 font-[500]">
            {data.name.length > 40 ? data.name.slice(0, 40) + '...' : data.name}
          </h4>

          <div className="flex">
            <Rating rating={data?.rating} id={data.id} />
          </div>

          <div className="py-2 flex items-center justify-between">
            <div className="flex">
              <h5 className="product-discount-price">
                {data.price === 0 ? data.price : data.discount_price}$
              </h5>
              <h4 className="price">{data.price ? data.price + ' $' : null}</h4>
            </div>
            <span className="font-[400] text-[17px] text-[#68d284]">
              {data?.total_sell} sold
            </span>
          </div>
        </Link>

        <div>
          {click ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              color={click ? 'red' : '#333'}
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              color={click ? 'red' : '#333'}
              title="Add to wishlist"
            />
          )}
          <AiOutlineEye
            size={22}
            className="cursor-pointer absolute right-2 top-14"
            color="#333"
            title="Quick view"
            onClick={() => setOpenModal(true)}
          />
          <AiOutlineShoppingCart
            size={25}
            className="cursor-pointer absolute right-2 top-24"
            color="#444"
            title="Add to cart"
          />
          {openModal && (
            <ProductDetailModal setOpen={setOpenModal} data={data} />
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
