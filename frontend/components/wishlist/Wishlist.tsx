import React, { useEffect, useState } from 'react';

import { RxCross1 } from 'react-icons/rx';

import { productData } from '@/static-data';
import { AiOutlineHeart } from 'react-icons/ai';
import WishlistItem from './WishlistItem';

type CartProps = {
  onClose: (val: boolean) => void;
};

const Wishlist = ({ onClose }: CartProps) => {
  const [mounted, setMountes] = useState(false);

  const list = productData
    .slice(0, 5)
    .map(({ id, image_Url, description, name, discount_price, price }) => ({
      id,
      name,
      description,
      image_Url,
      discount_price,
      price,
    }));

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

        {list && list.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <p>Cart Items is empty!</p>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <div className="flex-type-1 p-4">
              <AiOutlineHeart size={25} />
              <h5 className="pl-2 text-[20px] font-[500]">
                {list && list.length} items
              </h5>
            </div>

            <div className="w-full border-t flex-1">
              {list &&
                list.map((c, index) => (
                  <WishlistItem
                    key={c.id}
                    data={{
                      id: c.id,
                      name: c.name,
                      img: c.image_Url[0].url,
                      description: c.description,
                      price: c.price || 0,
                      discount_price: c.discount_price || 0,
                    }}
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(Wishlist);
