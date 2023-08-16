import { productData } from '@/static-data';

import { RxCross1 } from 'react-icons/rx';
import { IoBagHandleOutline } from 'react-icons/io5';
import CartItem from './CartItem';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

type CartProps = {
  onClose: (val: boolean) => void;
};

const Cart = ({ onClose }: CartProps) => {
  const [mounted, setMountes] = useState(false);

  const cart = productData
    .slice(0, 5)
    .map(({ id, image_Url, description, name, discount_price, price }) => ({
      id,
      name,
      description,
      image_Url,
      discount_price,
      price,
      quantity: Math.round(Math.random() * 5),
    }));

  const totalPrice = cart.reduce(
    (acc, c) => acc + (c.discount_price || c.price || 1) * c.quantity,
    0
  );

  useEffect(() => {
    if (!mounted) setMountes(true);

    return () => {
      setMountes(false);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 bg-[#0000004b] h-screen z-10">
      <div className="absolute top-0 right-0 h-full w-[80%] 800px:w-[50%] bg-white  overflow-y-auto justify-between shadow-lg">
        <div className="flex w-full justify-end pt-5 pr-5 absolute top-0 right-0">
          <RxCross1
            size={25}
            className="cursor-pointer"
            onClick={() => onClose(false)}
          />
        </div>

        {cart && cart.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <p>Cart Items is empty!</p>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <div className="flex-type-1 p-4">
              <IoBagHandleOutline size={25} />
              <label className="pl-2 text-[20px] font-[500]">
                {cart && cart.length} items
              </label>
            </div>

            <div className="w-full border-t flex-1">
              {cart &&
                cart.map((c, index) => (
                  <CartItem
                    key={c.id}
                    data={{
                      id: c.id,
                      name: c.name,
                      img: c.image_Url[0].url,
                      description: c.description,
                      price: c.price || 0,
                      quantity: c.quantity,
                      discount_price: c.discount_price || 0,
                    }}
                  />
                ))}
            </div>

            <div
              className="px-5 mt-3 cursor-pointer"
              onClick={() => {
                onClose(false);
              }}
            >
              {/* checkout buttons */}
              <div
                className={`h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]`}
              >
                <span className="text-[#fff] text-[18px] font-[600]">
                  Checkout Now (USD${totalPrice})
                </span>
              </div>
            </div>

            <div
              className="w-full text-xs text-white"
              style={{ userSelect: 'none' }}
            >
              margin-bottom
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(Cart);
