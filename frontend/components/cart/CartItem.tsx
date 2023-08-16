import { HiPlus, HiOutlineMinus } from 'react-icons/hi';
import { RxCross1 } from 'react-icons/rx';

type ItemType = {
  id: number;
  name: string;
  img: string;
  description: string;
  price: number;
  quantity: number;
  discount_price: number;
};

type CartItemProps = {
  data: ItemType;
};

const CartItem = ({ data }: CartItemProps) => {
  return (
    <article className="border-b p-4">
      <div className="w-full flex items-center relative">
        <div>
          <div
            className={`flex-type-1 bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] justify-center cursor-pointer`}
          >
            <HiPlus size={18} color="#fff" />
          </div>

          <span className="pl-[10px] text-center">{data.quantity}</span>

          <div className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer">
            <HiOutlineMinus size={16} color="#7d879c" />
          </div>
        </div>

        <div className="flex-type-1 flex-1">
          <img
            src={`${data.img}`}
            alt=""
            className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
          />

          <div className="pl-[5px]">
            <label className="block">{data.name}</label>

            <output className="mr-2 font-[400] text-[15px] text-[#00000082]">
              ${data.discount_price}
              <span>&#215;</span>
              {data.quantity}
            </output>

            <output className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
              US${(data.discount_price || data.price || 1) * data.quantity}
            </output>
          </div>
        </div>

        <div className="cursor-pointer ml-5">
          <RxCross1 className="p-1 rounded-full bg-[#0002]" size={25} />
        </div>
      </div>
    </article>
  );
};

export default CartItem;
